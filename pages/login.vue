<template>
    <div>
        <login-form mode="page"/>
    </div>
</template>

<script>
    import LoginForm from '../components/login-form';

    export default {
        auth: false,
        components: {
            LoginForm
        }
    };
</script>
