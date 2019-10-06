#!groovy

REPO_HOST = '548355647590.dkr.ecr.us-west-2.amazonaws.com'
REPO_NAME = 'ea-ssr'
IMAGE_TAG = "${params.environment}-${BUILD_NUMBER}"

node {
    String jenkinsCredentialsId = '3026c256-cd0d-4748-8311-b421427fd33a'
    String appDir = "evilangel.com/main"
    def slackHelper

    try {
        stage ('Load Libraries') {
            String SHARED_DEVOPS_PATH = '/var/lib/jenkins/shared/devops'
            dir(SHARED_DEVOPS_PATH) {
                git branch: 'master',
                    credentialsId: jenkinsCredentialsId,
                    url: 'git@github.com:adamgrayson31/devops.git'
            }

            slackHelper = load "${SHARED_DEVOPS_PATH}/jenkins/slack/notification.groovy"
        }

        stage ('Notify Started') {
            slackHelper.sendBuildStatus('STARTED')
        }

        stage ('Checkout Application Code') {
            git branch: "${params.branch}",
                credentialsId: jenkinsCredentialsId,
                url: 'git@github.com:adamgrayson31/frontend-components.git'
        }

        stage ('Configure Application') {
            sh "cp ${appDir}/config/app.config.${params.environment}.js ${appDir}/config/app.config.js"
        }

        stage ('Build Image') {
            def customImage = docker.build("${REPO_NAME}:${IMAGE_TAG}", "--no-cache=true -f ${WORKSPACE}/${appDir}/Dockerfile .")
            
            sh "mkdir -p ${WORKSPACE}/upload_to_cdn"
            customImage.inside("-v ${WORKSPACE}/upload_to_cdn:/output -u root") {
                sh "cp -rp /app/${appDir}/.nuxt/dist/. /output/"
            }
            sh "sudo chown -R jenkins:jenkins ${WORKSPACE}/upload_to_cdn"
        }

        stage ('Upload Statics') {
            sh "aws s3 sync upload_to_cdn/ s3://statics.evilangel.com/${params.environment}"
        }

        stage ('Push Image') {
            docker.withRegistry("https://${REPO_HOST}") {
                docker.image("${REPO_NAME}:${IMAGE_TAG}").push("${IMAGE_TAG}")
            }
        }

        stage('Create Artifacts') {
            sh "echo TAG=${IMAGE_TAG} > build.properties"
            sh "echo BUILD_NUMBER=${BUILD_NUMBER} >> build.properties"
            archiveArtifacts 'build.properties'
        }

        stage ('Notify Success') {
            slackHelper.sendBuildStatus('SUCCESS')
        }

    } catch (e) {
        slackHelper.sendBuildStatus('FAILURE')

        currentBuild.result = "FAILED"
        throw e as Throwable
    } finally {
        cleanUp()
    }
}

def cleanUp() {
    sh "docker rmi -f ${REPO_NAME}:${IMAGE_TAG} || true"
    sh "docker rmi -f ${REPO_HOST}/${REPO_NAME}:${IMAGE_TAG} || true"
    sh "docker container prune -f || true"
    
    sh "rm -rf ${WORKSPACE}/upload_to_cdn"
}