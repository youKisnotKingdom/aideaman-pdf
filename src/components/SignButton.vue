<template>
    <button v-if="isLoggin" @click="signOutUser" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log out</button>
    <button v-else class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log in</button>
</template>

<script>
import { auth } from '../firebase/firestore'
import { signOut } from 'firebase/auth'

export default {
    data() {
        return {
            isLoggin: false
        }
    },
    mounted() {
        document.addEventListener("userAuth", (event) => {
            if (event.detail) this.isLoggin = true
        })
    },
    methods: {
        async signOutUser() {
            try {
                await signOut(auth)
            } catch(err) {
                console.log(err)
            }
        }
    }
}
</script>