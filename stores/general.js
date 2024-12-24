import { defineStore } from "pinia"

export const useGeneralStore = defineStore('general', {
    state: () => ({   
        isLoginOpen: false,isEditProfileOpen: false,selectedPost: null,ids: null,
        isBackUrl:"/",posts: null,suggested: null,following: null
      }),
        
    actions: {
      // async getAllUsersAndPosts() {
      //   let res = await $axios.get('/api/home')
      //   this.posts = res.data
      // }
    },
    persist:true
  })