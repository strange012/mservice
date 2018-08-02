<template lang="pug">
performer-form(v-if="performer",:performer="performer", v-on:submitData="editPerformer")
</template>

<script>
import Form from './Form.vue'
import * as R from 'ramda'

export default {
    components: {
        'performer-form': Form
    },
    methods: {
        editPerformer(data) {
            data = R.omit(['photo'], data)
            if(R.hasIn('newPhoto', data)) {
                data.photo = data.newPhoto
                data = R.omit(['newPhoto'], data)
            }
            return this.$store.state.axios.put('/performer/' +
                this.$route.params.id, data)
                .then(() => {
                    return this.$store.dispatch('fetchBusiness')
                })
                .then(() => {
                    this.$router.push('/panel/performer')
                })
        }
    },
    computed: {
        performer() {
            return this.$store.getters.performer(this.$route.params.id)
        }
    }
}
</script>
