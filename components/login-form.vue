<template>
    <form @submit.prevent="submit" class="auth-form form-dark-theme" :class="{'auth-form--page': mode === 'page'}">
        <div class="auth-form__header auth-form__header--login">Sign in to your account</div>
        <div class="auth-form__error-message" v-if="errorMessage" v-html="errorMessage"/>
        <div class="form-group auth-form__email">
            <label class="auth-form__label" :for="`email_${uuid}`">Email</label>
            <input type="email" :id="`email_${uuid}`" v-model="email" autofocus required autocomplete="off" tabindex="1"
                   class="form-control">
        </div>
        <div class="form-group form-row">
            <div class="col-6">
                <label class="auth-form__label" :for="`password_${uuid}`">Password</label>
            </div>
            <div class="col-6 auth-form__col--right">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="togglePasswordFieldType"
                           :id="`showpassword_${uuid}`">
                    <label class="form-check-label auth-form__checkbox auth-form__checkbox--showpassword"
                           :for="`showpassword_${uuid}`">
                        Show password
                    </label>
                </div>
            </div>
            <div class="col-12">
                <input :type="passwordFieldType" :id="`password_${uuid}`" v-model="password" required tabindex="2"
                       class="form-control">
            </div>
        </div>
        <div class="form-group">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="rememberMe" :id="`remember_${uuid}`">
                <label class="form-check-label auth-form__checkbox" :for="`remember_${uuid}`">
                    Remember me on this computer (not recommended on public or shared computers)
                </label>
            </div>
        </div>
        <div class="form-group form-row auth-form__row auth-form__row--nomargin">
            <div class="col-md-6 col-sm-12">
                <span @click="forgotPasswordClick" class="form-link">Forgot password?</span>
            </div>
            <div class="col-md-6 col-sm-12 auth-form__col--right">
                <app-button :disabled="isLoading"
                        child-class="btn--md btn--secondary auth-form__submit">Sign in
                </app-button>
            </div>
        </div>
    </form>
</template>

<script>
    import AppButton from 'components/button';

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
                password: '',
                togglePasswordFieldType: false,
                rememberMe: false,
                isLoading: false,
                errorMessage: ''
            };
        },
        computed: {
            passwordFieldType() {
                return this.togglePasswordFieldType ? 'text' : 'password';
            }
        },
        methods: {
            forgotPasswordClick() {
                if (this.mode === 'popup') {
                    this.$emit('toggle', 'forgot-password');
                } else {
                    this.$router.push(this.$routes.forgotPassword());
                }
            },
            submit() {
                if (this.isLoading) {
                    return;
                }

                this.isLoading = true;

                this.$store.dispatch('auth/login', {
                    email: this.email,
                    password: this.password
                }).then(res => {
                    this.isLoading = false;
                    this.redirectAfterLogin();
                }).catch(error => {
                    console.error(error.response.data);
                    if (error.response.status === 404) {
                        this.errorMessage = 'Email not found.<br>Please try again or contact support.';
                    }
                    this.isLoading = false;
                });
            },
            redirectAfterLogin() {
                if (this.$route.query.to) {
                    this.$router.push(this.$route.query.to);
                } else {
                    this.$router.push(this.$routes.home());
                }
            }
        },
        components: {
            AppButton
        }
    };
</script>
