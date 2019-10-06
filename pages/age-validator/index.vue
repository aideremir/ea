<template>
    <age-validator-selector
            :yoti-application-id="$appConfig.AGE_VALIDATION.YOTI.APPLICATION_ID"
            :yoti-scenario-id="$appConfig.AGE_VALIDATION.YOTI.SCENARIO_ID"/>
</template>

<script>
    import AgeValidatorSelector from 'node_modules/ea-components/services/age-validators/selector';

    export default {
        layout: 'no-signup-banner',
        components: {AgeValidatorSelector},
        auth: false,
        ageValidate: false,
        head() {
            return {
                script: [{src: 'https://sdk.yoti.com/clients/browser.2.1.0.js'}],
                title: 'Age validation',
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'Age validation'
                    }
                ]
            };
        }
    };
</script>
