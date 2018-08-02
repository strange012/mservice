<template lang="pug">
.ui.grid
    .five.wide.column
        .ui.secondary.vertical.pointing.menu.fluid
            router-link.teal.item(
                v-for="link in links",
                :class="{active: isActive(link)}"
                :to="link.path") {{link.title}}
    .eleven.wide.column.ui.segment
        router-view
</template>


<script>
export default {
    data() {
        return {
            links: [
                {path: '/panel/appointment', title: 'Appointments'},
                {path: '/panel/service', title: 'Services'},
                {path: '/panel/performer', title: 'Performers'},
            ]
        }
    },
    methods: {
        isActive(link) {
            return this.$route.path.startsWith(link.path) 
        }
    }
}
</script>
