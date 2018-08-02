<template lang="pug">
div
    .ui.relaxed.divided.list
        .item(v-for="service in $store.getters.services")
            .right.floated.middle.aligned.content
                .ui.button(v-on:click="deleteService(service.id)") Delete
            .content
                router-link.header(:to="`/panel/service/${service.id}`")
                    | {{service.name}}
                .description {{service.description}}
                .description {{service.price}}$
    router-link.ui.button(to="/panel/service/create") Create service
</template>


<script>
export default {
    methods: {
        deleteService(id) {
            this.$store.state.axios.delete('/service/' + id)
                .then(() => {
                    return this.$store.dispatch('fetchBusiness')
                })
        }
    }
}
</script>
