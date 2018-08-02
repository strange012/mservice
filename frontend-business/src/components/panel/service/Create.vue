<template lang="pug">
service-form(:service="service", v-on:submitData="createService")
</template>

<script>
import Form from './Form.vue'

export default {
    components: {
        'service-form': Form
    },
    data() {
        return {
            service: {
                name: '',
                description: '',
                price: 0,
                duration: 0,
                performers: []
            }
        }
    },
    methods: {
        createService(data) {
            return this.$store.state.axios.post('/service', data)
                .then(() => {
                    return this.$store.dispatch('fetchBusiness')
                })
                .then(() => this.$router.push('/panel/service'))
        }
    }
}
</script>
