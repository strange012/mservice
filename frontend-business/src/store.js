import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {router} from './main.js'
import * as moment from 'moment'

Vue.use(Vuex)

const baseURL = 'http://localhost:5000/'

const sortById = (left, right) => left.id > right.id

const store = new Vuex.Store({
    state: {
        baseURL,
        user: null,
        axios: axios.create({
            baseURL
        }),
        business: null,
        appointment: {
            selectedDate: moment().utc().startOf('day'),
            loaded: [],
            availableTime: []
        }
    },
    getters: {
        service: state => id => state.business && 
            state.business.services.find(it => it.id == id),
        performer: state => id => state.business && 
            state.business.performers.find(it => it.id == id),
        appointment: state => id => state.appointment && 
            state.appointment.loaded.find(it => it.id == id),
        services: state => state.business &&
            state.business.services.sort(sortById),
        performers: state => state.business &&
            state.business.performers.sort(sortById),
    },
    mutations: {
        setUser(state, token) {
            let userId = jwtDecode(token).user_claims.id
            state.user = userId
            state.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            window.localStorage.setItem('token', token)
            return state
        },
        logout(state) {
            state.user = null
            state.business = null
            window.localStorage.removeItem('token')
            delete state.axios.defaults.headers.common['Authorization']
            return state
        },
        setBusiness(state, business) {
            business.services = business.services.map(it => {
                let dur = moment(it.duration, 'H:mm:ss')
                it.duration = dur.minutes() + dur.hours()*60
                return it
            })
            state.business = business
            
            return state
        },
        selectDate(state, date) {
            state.appointment.selectedDate = moment(date).utc().startOf('day')
            console.log(state.appointment.selectedDate.local().toDate())
            return state
        },
        setLoadedAppointments(state, appointments) {
            state.appointment.loaded = appointments
                .map(it => {
                    it.date = moment(it.date)
                    return it
                })
                .map(it => {
                    it.service = store.getters.service(it.service_id)
                    it.performer = store.getters.performer(it.performer_id)
                    return it
                })
                .sort((left, right) => left.date > right.date )
            return state
        }
    },
    actions: {
        init({commit, state}) {
            let token = window.localStorage.getItem('token')
            if(token) {
                commit('setUser', token)
            }
            return store.dispatch('fetchBusiness').catch(() => {
                router.push('/init')
            })
        },
        fetchBusiness({commit, state}) {
            return state.axios
                .get('/business')
                .then(resp => {
                    commit('setBusiness', resp.data) 
                })
        },
        fetchAppointments({commit, state, getters}){
            return state.axios
                .get('/appointment', {
                    params: {
                        date: state.appointment.selectedDate.toDate()
                    }
                })
                .then(resp => {
                    commit('setLoadedAppointments', resp.data)
                })
        },
    }
})


export default store
