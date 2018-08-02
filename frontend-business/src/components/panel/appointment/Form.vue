<template lang="pug">
div
    h2.ui.header.centered Create appointment
    datepicker
    form.ui.form.container(v-on:submit.prevent="submitData")
        .field
            label Notes
            .ui.textarea
                textarea(v-model="appointment.notes", 
                    name='notes',
                    placeholder='Notes')
        .field
            label Service
            select.ui.fluid.dropdown(
                name="service",v-model="appointment.service_id")
                option(v-for="service in $store.getters.services",
                    :value="service.id") {{service.name}}
        .field(v-bind:class='{disabled: !appointment.service_id}')
            label Performer
            select.ui.fluid.dropdown(
                name="performer",
                v-model="appointment.performer_id",
                )
                option(v-for="performer in allowedPerformers",
                    :value="performer.id") {{performer.name}}
        .field(:class='{disabled: !appointment.performer_id}')
            label Time interval
            select.ui.fluid.dropdown(
                v-model="chosenInterval" 
                )
                option(v-for="interval in availableTime", :value="interval")
                    | {{interval[0].format('H:mm')}} - {{interval[1].format('H.mm')}}
        .field(:class='{disabled: !chosenInterval}')
            label Precise time
            select.ui.fluid.dropdown(
                v-model="chosenTime" 
                )
                option(v-for="value in availableTimeValues", :value="value")
                    | {{value.format('H:mm')}}
        
        button.ui.fluid.large.teal.submit.button(:class='{disabled: !chosenTime}', type="submit") Submit
</template>

<script>
import Datepicker from '../../Datepicker.vue'
import * as moment from 'moment'

export default {
    props: ['initial-appointment'],
    data() {
        return {
            appointment: this.initialAppointment,
            availableTime: [],
            chosenInterval: null,
            chosenTime: null
        }
    },
    components: {
        Datepicker
    },
    mounted() {
        $(".ui.fluid.dropdown").dropdown()
        this.$store.dispatch('fetchAppointments')
        if(this.appointment.performer_id) {
            this.fetchAvailableTime()
        }
    },
    computed: {
        allowedPerformers() {
            //performers who can perform selected service
            console.log(this.appointment)
            return this.appointment.service_id &&
                this.$store.getters.performers.filter(it => {
                    return it.services.includes(this.appointment.service_id)
                })
        },
        availableTimeValues() {
            if(!this.chosenInterval) return
            let values = []
            let curr = this.chosenInterval[0]
            while(curr < this.chosenInterval[1]){
                values.push(curr)
                curr = moment(curr)
                curr.add(10, 'm')
            }
            values.push(this.chosenInterval[1])
            return values
        }
    },
    methods: {
        submitData() {
            // todo: there can be a bug related to this
            let selectedDate = this.$store.state.appointment.selectedDate
            let time = this.chosenTime.year(selectedDate.year())
                .month(selectedDate.month()).date(selectedDate.date())
            let data = Object.assign(this.appointment, {
                    date: time.toDate()
                })
            this.$emit('submitData', data)
        },
        fetchAvailableTime() {
            return this.$store.state.axios.get(`/performer/${
                this.appointment.performer_id}/available_time`, {
                    params: {
                        service_id: this.appointment.service_id,
                        date: this.$store.state.appointment.selectedDate.toDate(),
                        coordx: 0,
                        coordy: 0
                    }
                })
                .then(resp => {
                    this.availableTime = resp.data
                       .map(it => {
                           it[0] = moment(it[0], "H:mm:ss").year(0).month(0).date(0)
                           it[1] = moment(it[1], "H:mm:ss").year(0).month(0).date(0)
                           return it
                        })
                })
        }
    },
    watch: {
        'appointment.performer_id':function (){
            return this.fetchAvailableTime()
        }
    }
}
</script>
