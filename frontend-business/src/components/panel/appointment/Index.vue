<template lang="pug">
div
    datepicker
    router-link.ui.button(to="/panel/appointment/create") Create Appointment
    .ui.divided.items
        .item(v-for="appointment in $store.state.appointment.loaded")
            // .right.floated.middle.aligned.content
                .ui.button(v-on:click="deleteService(performer.id)") Delete
            .content
                .ui.grid.middle.aligned
                    // router-link.header(:to="`/panel/performer/${performer.id}`")
                        | {{performer.name}}
                    .thirteen.wide.column
                        .meta {{appointment.date.format('HH:mm')}}
                        .description {{appointment.notes || 'No notes here...'}}
                        .extra 
                            router-link.ui.label(
                                :to="`/panel/performer/${appointment.performer.id}`")
                                | {{appointment.performer.name}}
                            router-link.ui.label(
                                :to="`/panel/service/${appointment.service.id}`")
                                | {{appointment.service.name}}
                    .three.wide.column
                        .ui.vertical.buttons
                            router-link.ui.button(
                                :to="`/panel/appointment/${appointment.id}`") Edit
                            .ui.button(
                                v-on:click="deleteAppointment(appointment.id)") Delete
</template>

<script>
import Datepicker from '../../Datepicker.vue'

export default {
    components: {
        Datepicker
    },
    mounted() {
        console.log('mounted')
        this.$store.dispatch('fetchAppointments')
    },
    watch: {
        '$store.state.appointment.selectedDate': function() {
            this.$store.dispatch('fetchAppointments')
        }
    },
    methods: {
        deleteAppointment(id) {
            this.$store.state.axios.delete('/appointment/' + id)
                .then(() => {
                    return this.$store.dispatch('fetchAppointments')
                })
        }
    }
}
</script>

<style lang="sass" scoped>
.grid
    width: 100%
</style>
