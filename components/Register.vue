<template>
    <div class="text-center text-[28px] mb-4 font-bold">Sign up</div>

    <!-- <div class="px-6 pb-1.5 text-[15px]">Email address</div> -->

    <div class="px-6 pb-2">
        <TextInput
            placeholder="Full name "
            v-model:input="name"
            inputType="true"
            :autoFocus="true"
            :error="errors && errors.name ? errors.name[0] : ''"
        />
    </div>
    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Email address"
            v-model:input="email"
            inputType="email"
            :error="errors && errors.email ? errors.email[0] : ''"
        />

    </div>

   
        <div class="px-6 pb-2">
        <TextInput 
            placeholder="password"
            v-model:input="password"
            inputType="password"
            :error="errors && errors.password ? errors.password[0] : ''"
        />

        </div>
    
    <div class="px-6 pb-2">
        <TextInput 
            placeholder="Confirm password"
            v-model:input="confirmpassword"
            inputType="password"
            :error="errors && errors.confirmpassword ? errors.confirmpassword[0] : ''"
        />

    
    </div>


    <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>
    
    <div class="px-6 pb-2 mt-6">
        <button 
            :disabled="(!name || !email|| !password|| !confirmpassword)"
            :class="(!name || !password|| !password|| !confirmpassword) ? 'bg-gray-200' : 'bg-[#f02c56]'"
            @click=" register()"
            class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
        >
            Sing up
        </button>
    </div>
</template>

<script setup>
const { $userStore, $generalStore } = useNuxtApp()

let email = ref(null)
let password = ref(null)
let name = ref(null)
let confirmpassword = ref(null)
let errors = ref(null)


const register = async () => {
    errors.value = null
    console.log("测试")
   
    try {
        console.log("执行 getTokens");
        await $userStore.getTokens()
        console.log("执行 register");
        await $userStore.register(
            name.value, 
            email.value, 
            password.value, 
            confirmpassword.value
        )
        console.log("执行 getUser");
        await $userStore.getUser()
        // await $generalStore.getRandomUsers('suggested')
        // await $generalStore.getRandomUsers('following')
        $generalStore.isLoginOpen = false
        console.log("注册逻辑完成");
    } catch (error) {
        console.log(error)
        console.log(error.response)  // 检查是否有 response 属性
        errors.value = error.response.data.errors
        console.log(error)
        console.log(errors.value)
        
    }
}
</script>
