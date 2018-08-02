<template lang="pug">
    datepicker(:value="$store.state.appointment.selectedDate.toDate()",
        :inline="true", 
        v-on:input="dateChanged")
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
    components: {
        Datepicker
    },
    methods: {
        dateChanged(newDate) {
            this.$store.commit('selectDate', newDate)
        },
    }
}
</script>


