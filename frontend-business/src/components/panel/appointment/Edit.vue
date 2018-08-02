<template lang="pug">
div
    appointment-form(:initial-appointment="appointment",v-on:submitData="submitData")
</template>

<script>
import Form from './Form.vue'

export default {
    components: {
        'appointment-form': Form
    },
    computed: {
        appointment() {
            return this.$store.getters.appointment(this.$route.params.id)
        }
    },
    methods: {
        submitData(data) {
            return this.$store.state.axios.put('/appointment/' + data.id, data)
                .then(() => {
                    this.$router.push('/panel/appointment')
                })
        }
    }
}
</script>
