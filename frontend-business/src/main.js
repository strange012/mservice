import Vue from 'vue'
import App from './components/App.vue'
import 'semantic-ui-css/semantic.min.css'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Signup from './components/Signup.vue'
import Signin from './components/Signin.vue'
import Panel from './components/Panel.vue'
import Init from './components/Init.vue'
import ServiceIndex from './components/panel/service/Index.vue'
import ServiceCreate from './components/panel/service/Create.vue'
import ServiceEdit from './components/panel/service/Edit.vue'
import PerformerIndex from './components/panel/performer/Index.vue'
import PerformerCreate from './components/panel/performer/Create.vue'
import PerformerEdit from './components/panel/performer/Edit.vue'
import AppointmentIndex from './components/panel/appointment/Index.vue'
import AppointmentCreate from './components/panel/appointment/Create.vue'
import AppointmentEdit from './components/panel/appointment/Edit.vue'
import store from './store.js'


Vue.use(VueRouter)

console.log(AppointmentIndex)

const routes = [
    {path: '/', component: Home},
    {path: '/signup', component: Signup},
    {path: '/signin', component: Signin},
    {
        path: '/panel', 
        component: Panel, 
        redirect: '/panel/appointment',
        children:[
            {path: 'service', component: ServiceIndex },
            {path: 'service/create', component: ServiceCreate },
            {path: 'service/:id', component: ServiceEdit },
            {path: 'performer', component: PerformerIndex },
            {path: 'performer/create', component: PerformerCreate },
            {path: 'performer/:id', component: PerformerEdit },
            {path: 'appointment', component: AppointmentIndex},
            {path: 'appointment/create', component: AppointmentCreate},
            {path: 'appointment/:id', component: AppointmentEdit}
        ]
    },
    {path: '/init', component: Init, beforeEnter: (to, from, next) => {
        if(store.state.business) {
            next('/panel')
        }
        else {
            next()
        }
    }} 
]

export const router = new VueRouter({
    routes
})

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    created() {
        return this.$store.dispatch('init')
    }
})
