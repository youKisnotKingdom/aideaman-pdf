<template>
    <div v-if="!fileUploaded" class="flex items-center justify-center w-full">
        <label class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Only PDF supported</p>
            </div>
            <input type="file" @change="onFileUploaded" class="hidden" />
        </label>
    </div>
    <div v-else class="flex items-center justify-center w-full">
        <label class="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-500 dark:bg-blue-700 dark:border-blue-600">
            <svg class="w-8 h-8 mb-4 text-white-500 dark:text-white-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <div class="flex items-center justify-center w-full">
                <div class="w-4/5">
                    <div class="w-full h-70 flex justify-center flex-wrap">
                        <label :class="[labelClass, {'shake-animation': isError}]">ファイル名</label>
                        <input type="text" @change="checkFileName()" v-model="fileName" id="first_name" :class="inputClass">
                        <p :class="[pClass, {'shake-animation': isError}]">{{ errText }}</p>
                    </div>
                    <div class="w-full flex justify-center">
                        <button type="button" @click="fileUpload" :disabled="isError" class="relative z-10 flex items-center px-4 py-2 ml-2 mt-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Upload
                        </button>
                        <button @click="deleteFile()"><svg class="w-6 h-6 z-top fill-gray-500 hover:fill-red-500" width="20" height="20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"/></svg> </button> 
                        <!-- ツールチップ -->
                        <!-- <div v-if="hover"  class="absolute right-0 w-32 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <p class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">アップロード</p>
                            </div>
                        </div> -->
                    </div>
                </div>
                <!-- <div v-else>
                    <label for="error" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">Your name</label>
                    <input type="text" v-model="fileName" id="error" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Error input">
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> Some error message.</p>
                </div> -->
            </div>
            <!-- <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"></p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Only PDF supported</p> -->
        </label>
    </div>
</template>

<script>
import { ref, uploadBytes } from 'firebase/storage'

import { query, where, getDocs, addDoc, collection, Timestamp } from 'firebase/firestore'
import { firestore, firestorage } from '../firebase/firestore'

import { auth } from '../firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'


export default {
    data() {
        return {
            file:null,
            fileName: "",
            fileUploaded: false,
            isError: false,
            errText: "",
            useqrName: "",
            hover: false,
            labelClass: "block mb-2 text-sm flex justify-self-start font-medium text-white dark:text-white",
            inputClass: "bg-gray-50 border border-gray-300 text-sm text-black rounded-lg focus:ring-blue-500 dark:bg-gray-700 focus:border-blue-500 block w-full p-2.5 dark:text-gray-300 dark:border-gray-500",
            validLabelClass: "block mb-2 text-sm text-left font-medium dark:text-white",
            validInputClass: "bg-gray-50 border border-gray-300 text-sm text-black rounded-lg focus:ring-blue-500 dark:bg-gray-700 focus:border-blue-500 block w-full p-2.5 dark:text-gray-300 dark:border-gray-500",
            invalidLabelClass: "block mb-2 text-sm text-left font-medium text-red-700 dark:text-red-500",
            invalidInputClass: "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500",
            pClass: "mt-2 text-sm text-red-600 dark:text-red-500"
        }
    },
    watch: {
        fileName() {
            this.checkFileName()
        }
    },
    mounted() {
        onAuthStateChanged(auth, (user) => {
            if (!user) window.location.href = "/login"
            else {
                this.$store.commit('setUser', user)
                this.getUserName(user)
            }
        })
    },
    methods: {
        onFileUploaded(e) {
            this.file = e.target.files[0]
            if(this.file.type == "application/pdf") {
                this.fileName = this.file.name
                this.fileUploaded = true
            } else {
                alert("Only PDF supported")
            }
        },
        async getUserName(user) {
            const q = query(collection(firestore, "users"), where("email", "==", user.email))
            const qs = await getDocs(q)
            this.userName = qs.docs[0].data().name
            console.log(this.userName)
        },
        async fileUpload() {
            const storageRef = ref(firestorage, `archive/${this.file.name}`)
            try { 
                await uploadBytes(storageRef, this.file) 

                const nowTime = Timestamp.now()
                const uploadData = {
                    fileName: this.file.name,
                    uploadedBy: this.userName,
                    uploadTime: nowTime,
                }
                await addDoc(collection(firestore, "folder"), uploadData)
                this.fileUploaded = false
            } catch(err) {
                console.log(err)
            }
            console.log("Uploaded!!")
        },
        deleteFile() {
            this.file = null
            this.fileName = ""
            this.fileUploaded = false
        },
        checkFileName() {
            const isinvalid = this.$store.state.fileName.some((content) => {
                return content.fileName == this.fileName
            } )
            if (isinvalid) {
                this.labelClass = this.invalidLabelClass
                this.inputClass = this.invalidInputClass
                this.isError = true
                this.errText = "既に同じ名前のファイルが存在します."
            } else {
                this.labelClass = this.validLabelClass
                this.inputClass = this.validInputClass
                this.isError = false
                this.errText = " "
            }
        }
    }
}
</script>
<style scoped>
@keyframes shake {
  10%, 90% {
    transform: translate3d(0px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(1px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-2px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(2px, 0, 0);
  }
}

.shake-animation {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>