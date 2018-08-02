<template lang="pug">
.ui.middle.aligned.center.aligned.grid
    .column
        form.ui.large.form(v-on:submit.prevent="onSubmit")
          .ui.stacked.segment
            .field
              .ui.left.icon.input
                i.user.icon
                input(v-model="email", 
                    type='text',
                    name='email',
                    placeholder='E-mail address')
            .field
              .ui.left.icon.input
                i.lock.icon
                input(v-model="password",
                type='password',
                name='password',
                placeholder='Password')
            .field
              .ui.left.icon.input
                i.lock.icon
                input(v-model="confirmPassword",
                type='password',
                name='password',
                placeholder='Confirm password')
            button.ui.fluid.large.teal.submit.button(type="submit") Sign Up
            .ui.visible.error.message(v-if="errorMessage") {{errorMessage}}
        .ui.message
          | Already have an account? 
          router-link(to="/signin") Sign In
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            errorMessage: ''
        }
    },
    methods: {
        onSubmit() {
            this.$store.state.axios
                .post('/register', {
                    email: this.email,
                    password: this.password,
                    role: 'business'
                })
                .then(() => this.$router.push('signin'))
                .catch(() => this.errorMessage = 'Something went wrong')
        }
    }
}
</script>


<style lang="sass" scoped>
.grid 
    margin-top: 50px !important

.column 
    max-width: 450px
</style>
