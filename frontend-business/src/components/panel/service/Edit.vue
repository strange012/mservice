<template lang="pug">
service-form(v-if="service",:service="service", v-on:submitData="editService")
</template>

<script>
import Form from './Form.vue'

export default {
    components: {
        'service-form': Form
    },
    methods: {
        editService(data) {
            return this.$store.state.axios.put('/service/' +
                this.$route.params.id, data)
                .then(() => {
                    return this.$store.dispatch('fetchBusiness')
                })
                .then(() => {
                    this.$router.push('/panel/service')
                })
        }
    },
    computed: {
        service() {
            return this.$store.getters.service(this.$route.params.id)
        }
    }
}
</script>
