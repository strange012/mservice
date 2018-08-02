<template lang="pug">
div
    appointment-form(:initial-appointment="{}", v-on:submitData="submitData")
</template>

<script>
import Form from './Form.vue'

export default {
    components: {
        'appointment-form': Form
    },
    methods: {
        submitData(data) {
            return this.$store.state.axios.post('/appointment', data)
                .then(() => {
                    this.$router.push('/panel/appointment')
                })
        }
    }
}
</script>
