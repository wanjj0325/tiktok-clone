import { defineStore } from "pinia"
import axios from '../plugins/axios'
import { useGeneralStore } from './general'

const $axios = axios().provide.axios
export const useUserStore = defineStore('user', {
    state: () => ({   
       id:'',
        name:'',
        bio:'',
        image:'' }),
     
    actions: {
            async getTokens(){
                await $axios.get('/sanctum/csrf-cookie')
                
            },
            async login(email, password) {
                await $axios.post('/login', {
                  
                email: email,
                password: password
            }
            // , {
            //   // New in 1.7.1: Per-request CSRF configuration
            //   xsrfHeaderName: 'X-Custom-CSRF-Header',
            //   xsrfCookieName: 'CUSTOM-CSRF-COOKIE'
            // }
          )
            
        },
        async register(name, email, password, confirmPassword) {
            await $axios.post('/register', {
              name: name,
              email: email,
              password: password,
              password_confirmation: confirmPassword
            })
        },
        
    
        async getUser() {
            let res = await $axios.get('/api/logged-in-user')
            
            this.$state.id = res.data[0].id
            this.$state.name = res.data[0].name
            this.$state.bio = res.data[0].bio
            this.$state.image = res.data[0].image
          },
          async logout() {
           
            await $axios.post('/logout')
            this.resetUser()
          },
          resetUser() {      
            this.$state.id = ''
            this.$state.name = ''
            this.$state.email = ''
            this.$state.bio = ''
            this.$state.image = ''
          }
      
    },
    persist:true
  })