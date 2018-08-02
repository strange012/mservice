<template lang="pug">
form.dropzone.ui.form.container(v-on:submit.prevent="submitData")
    .ui.header.centered Edit performer
    .field
        label Name
        .ui.input
            input(v-model="performer.name", 
                type='text',
                name='name',
                placeholder='Performer name')
    .field
        label Description
        .ui.textarea
            textarea(v-model="performer.description", 
                name='description',
                placeholder='Description')
    .field
        label Phone
        .ui.input
            input(v-model="performer.phone", 
                type='text',
                name='price',
                placeholder='Phone')
    .field
        label#azaza Photo
        template(v-if="performer.photo")
            img(:src="`${$store.state.baseURL}image/${performer.photo}`")
            .ui.button(v-on:click="deleteImage") Change
            .ui.button(v-on:click="deleteImage") Delete
        picture-input.picture-input(v-else,
            ref="pictureInput", 
            change="onChange", 
            accept="image/jpeg",
            buttonClass="ui button")
    .field
        label Services
        #dropdown
            select.ui.fluid.dropdown(
                name="services",multiple="",v-model="performer.services")
                option(v-for="service in $store.getters.services",
                    :value="service.id") {{service.name}}
    button.ui.fluid.large.teal.submit.button(type="submit") Submit
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
    props: ['performer'],
    methods: {
        submitData() {
            if(this.$refs.pictureInput && this.$refs.pictureInput.image)
            {
                this.performer.newPhoto = this.$refs.pictureInput.image
            }
            this.$emit('submitData', this.performer) 
        },
        deleteImage() {
            this.performer.photo = null
            this.performer.newPhoto = null
        }
    },
    components: {
        PictureInput
    },
    mounted() {
        console.log(this.performer)
        $(".ui.fluid.dropdown").dropdown()
    }
}
</script>

<style lang="sass">
.ui.selection.dropdown.active, .ui.selection.dropdown.visible
    z-index: 10002 !important
</style>
