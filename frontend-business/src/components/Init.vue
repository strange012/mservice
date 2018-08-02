<template lang="pug">
    .ui.container.segment.raised.green
        h4.ui.header Init business form
        form.ui.form(v-on:submit.prevent="onSubmit")
            .field
                label Company name
                input(v-model="name",
                    type='text', name='first-name', placeholder='Name')
            .field
                label Address
                input(v-model="address",
                    type='text', name='last-name', placeholder='Address')
            .field
                label Phone
                input(v-model="phone",
                    type='tel', name='last-name', placeholder='Phone')
            button.ui.button(type='submit') Submit
</template>


<script>
export default {
    data() {
        return {
            name: '',
            address: '',
            phone: ''
        }
    },
    methods: {
        onSubmit() {
            this.$store.state.axios
                .post('/business', this._data)
                .then(res => {
                    return this.$store.dispatch('fetchBusiness')
                })
        }
    },
    watch: {
        '$store.state.business'(to, from) {
            if(to) {
                this.$router.push('/panel')
            }
        }
    }
}
</script>
