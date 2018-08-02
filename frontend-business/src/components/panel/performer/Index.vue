<template lang="pug">
div
    .ui.relaxed.divided.list
        .item(v-for="performer in $store.getters.performers")
            .right.floated.middle.aligned.content
                .ui.button(v-on:click="deletePerformer(performer.id)") Delete
            .content
                router-link.header(:to="`/panel/performer/${performer.id}`")
                    | {{performer.name}}
                .description {{performer.description}}
    router-link.ui.button(to="/panel/performer/create") Create performer
</template>


<script>
export default {
    methods: {
        deletePerformer(id) {
            this.$store.state.axios.delete('/performer/' + id)
                .then(() => {
                    return this.$store.dispatch('fetchBusiness')
                })
        }
    }
}
</script>
