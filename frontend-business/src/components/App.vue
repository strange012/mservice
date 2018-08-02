<template lang="pug">
div
    .ui.inverted.vertical.masthead.center.aligned.segment
        .ui.container
            .ui.large.secondary.inverted.pointing.menu
                router-link.active.item(to="/") Home
                a.item Work
                a.item Company
                a.item Careers
                .right.item
                    template(v-if="$store.state.user")
                        router-link.ui.inverted.button(to="/panel") Panel
                        .ui.inverted.button(v-on:click="logout") Logout
                    template(v-else)
                        router-link.ui.inverted.button(to="/signin") Sign In
                        router-link.ui.inverted.button(to="/signup") Sign Up
    router-view
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    methods: {
        logout() {
            this.$store.commit('logout')
            this.$router.push('/')
        }
    }
}
</script>

<style>
</style>
