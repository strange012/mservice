<template lang="pug">
form.ui.form.container(v-on:submit.prevent="submitData")
    .ui.header.centered Edit 
    .field
        label Name
        .ui.input
            input(v-model="service.name", 
                type='text',
                name='name',
                placeholder='Service name')
    .field
        label Description
        .ui.textarea
            textarea(v-model="service.description", 
                name='description',
                placeholder='Description')
    .field
        label Price
        .ui.input
            input(v-model="service.price", 
                type='number',
                step="0.01",
                name='price',
                placeholder='Price')
    .field
        label Duration
        .ui.input
            input(v-model="service.duration", 
                type='number',
                step="0.01",
                name='duration',
                placeholder='Duration (m)')
    .field
        label Performers
        select.ui.fluid.dropdown(
            name="performers",multiple="",v-model="service.performers")
            option(v-for="performer in $store.getters.performers",
                :value="performer.id") {{performer.name}}
    button.ui.fluid.large.teal.submit.button(type="submit") Submit
</template>

<script>
import * as moment from 'moment'

export default {
    props: ['service'],
    methods: {
        submitData() {
            this.service.duration = moment(0).minutes(this.service.duration)
            this.$emit('submitData', this.service) 
        }
    },
    mounted() {
        $(".ui.fluid.dropdown").dropdown()
    }
}
</script>
