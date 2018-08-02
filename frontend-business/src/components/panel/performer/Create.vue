
<template lang="pug">
performer-form(:performer="performer", v-on:submitData="createPerformer")
</template>

<script>
import Form from './Form.vue'
import * as R from 'ramda'

export default {
    components: {
        'performer-form': Form
    },
    data() {
        return {
            performer: {
                name: '',
                description: '',
                phone: '',
                services: []
            }  
        }
    },
    methods: {
        createPerformer(data) {
            data = R.omit(['photo'], data)
            if(R.hasIn('newPhoto', data)) {
                data.photo = data.newPhoto
                data = R.omit(['newPhoto'], data)
            }
            return this.$store.state.axios.post('/performer', data)
                .then(() => {
                    return this.$store.dispatch('fetchBusiness')
                })
                .then(() => this.$router.push('/panel/performer'))
        }
    }
}
</script>
