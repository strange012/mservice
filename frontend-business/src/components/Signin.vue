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
            button.ui.fluid.large.teal.submit.button(type="submit") Sign In
            .ui.error.message.visible(v-if='errorMessage') {{errorMessage}}
        .ui.message
          | New to us? 
          router-link(to='/signup') Sign Up
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        onSubmit() {
            this.$store.state.axios
                .post('/login', {
                    email: this.email,
                    password: this.password
                })
                .then(res => {
                    this.$store.commit('setUser', res.data.access_token)
                    return this.$store.dispatch('fetchBusiness')
                })
                .then(() => {
                    this.$router.push('panel')
                })
                .catch(err => {
                    if(err.response.status == 404) {
                        this.$router.push('init')
                        return
                    }
                    const res = err.response
                    this.errorMessage = res.data.msg
                })
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
