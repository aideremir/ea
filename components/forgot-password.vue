<template>
    <form @submit.prevent="submit" class="auth-form form-dark-theme" :class="{'auth-form--page': mode === 'page'}">
        <div class="auth-form__header">
            Forgot your password?
            <span>We'll email you instructions on how to reset it.</span>
        </div>

        <div class="auth-form__error-message" v-if="errorMessage" v-html="errorMessage"/>
        <div class="form-group form-group--margin-big">
            <label class="auth-form__label" :for="`recovery-email_${uuid}`">Email</label>
            <input type="email" :id="`recovery-email_${uuid}`" v-model="email" autofocus required autocomplete="off"
                   tabindex="1"
                   class="form-control">
        </div>
        <div class="form-group form-group--margin-none form-row auth-form__row">
            <div class="col-md-6 col-sm-12">
                <span @click="loginClick" class="form-link">Return to sign in</span>
            </div>
            <div class="col-md-6 col-sm-12 auth-form__col--right">
                <app-button :disabled="isLoading"
                        child-class="btn--md btn--secondary auth-form__submit">Reset password
                </app-button>
            </div>
        </div>
    </form>
</template>

<script>
    import AppButton from 'components/button';
    import api from 'api/dispatcher';

    let uuid = 0;

    export default {
        beforeCreate() {
            this.uuid = uuid.toString();
            uuid += 1;
        },
        props: {
            mode: {
                type: String,
                default: 'popup',
                validator: function (value) {
                    return ['page', 'popup'].indexOf(value) !== -1;
                }
            }
        },
        data() {
            return {
                email: '',
                isLoading: false,
                errorMessage: ''
            };
        },
        methods: {
            loginClick() {
                if (this.mode === 'popup') {
                    this.$emit('toggle', 'login');
                } else {
                    this.$router.push(this.$routes.login());
                }
            },
            submit() {
                if (this.isLoading) {
                    return;
                }

                this.isLoading = true;

                api.forgotPassword(this.email).then(() => {

                    // todo: show message

                    this.isLoading = false;
                    this.$router.push(this.$routes.home());
                }).catch(error => {
                    if (error.response.status === 404) {
                        this.errorMessage = 'Email not found.<br>Please try again or contact support.';
                    }

                    this.isLoading = false;
                });
            },
        },
        components: {
            AppButton
        }
    };
</script>
