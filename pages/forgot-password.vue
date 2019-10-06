<template>
    <div>
        <forgot-password-form mode="page"/>
    </div>
</template>

<script>
    import ForgotPasswordForm from '../components/forgot-password';

    export default {
        auth: false,
        components: {
            ForgotPasswordForm
        }
    };
</script>
