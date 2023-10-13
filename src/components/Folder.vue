<template>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <label for="table-search" class="sr-only">Search</label>
    <div class="relative mb-4">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" v-model="serchFile" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for file">
    </div>
    <table style="height:40vh" class="w-full text-sm text-gray-500 dark:text-gray-400 rounded-lg">
        <thead class="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-lg">
            <tr>
                <th scope="col" class="px-6 py-3 rounded-tl-lg">
                    File name
                </th>
                <th scope="col" class="px-6 py-3">
                    uploadedBy
                </th>
                <th scope="col" class="px-6 py-3">
                    uploadTime
                </th>
                <th scope="col" class="px-6 py-3 rounded-tr-lg">
                    <span>Edit</span>
                </th>
            </tr>
        </thead>
        <template v-if="files[0].length > 0">
            <tbody>
                    <tr v-for="file of files[page]" @click="openFile(file)" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left dark:text-white">
                            {{ file.fileName }}
                        </th>
                        <td class="px-6 py-4">
                            {{ file.uploadedBy }}
                        </td>
                        <td class="px-6 py-4">
                            {{ file.uploadTime }}
                        </td>
                        <td class="px-6 py-4">
                            <button @click.stop="setDeleteFile(file.fileName)"><svg class="w-6 h-6 z-top fill-gray-500 hover:fill-red-500" width="20" height="20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"/></svg> </button> 
                        </td>
                    </tr>
            </tbody>
        </template>
        <template v-else>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="px-6 py-4 whitespace-nowrap text-left dark:text-white">
                        No file found...
                    </td>
                    <td v-for="i in 3" class="px-6 py-4">
                    </td>
                </tr>
            </tbody>
        </template>
    </table>
    <nav class="flex items-center bg-white justify-between py-2 px-4 ronded-lg" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-white-400">Showing <span class="font-semibold text-gray-900 dark:text-white">{{ bundles }}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ sumLength }}</span></span>
        <ul class="inline-flex -space-x-px text-sm h-8">
            <li>
                <button @click="page -= 1" :disabled="page == 0" class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
            </li>
            <li v-for="index in files.length">
                <button @click="page = index - 1" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ index }}</button>
            </li>
            <li>
                <button @click="page += 1" :disabled="page + 1 == files.length" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
            </li>
        </ul>
    </nav>
</div>

<div ref="targetModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Terms of Service
                </h3>
                <button type="button" @click="modal.hide()" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <input type="text" v-model="deleteFileInput" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center justify-end p-6 space-x-2 rounded-b dark:border-gray-600">
                <button @click="doDeleteFile" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { filePath } from '../store/filePath'

import { getDocs, query, collection, orderBy } from 'firebase/firestore'
import { firestore } from '../firebase/firestore'

import { Modal } from 'flowbite';

import { auth } from '../firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

 
export default {
    data() {
        return {
            files: [
                {fileName: "idea.pdf", uploadTime:"2023/07/31", uploadedBy: "user1"},
                {fileName: "isana.pdf", uploadTime:"2023/08/01", uploadedBy: "user1"},
                {fileName: "Discharge summary hospital course summarisation of in patient Electronic Health Record text with.pdf", uploadTime:"2023/08/03", uploadedBy: "user13"},
                {fileName: "Retentive Network.pdf", uploadTime:"2023/08/03", uploadedBy: "user2"},
                {fileName: "idea.pdf", uploadTime:"2023/07/31", uploadedBy: "user1"},
                {fileName: "isana.pdf", uploadTime:"2023/08/01", uploadedBy: "user1"},
                {fileName: "Discharge summary hospital course summarisation of in patient Electronic Health Record text with.pdf", uploadTime:"2023/08/03", uploadedBy: "user13"},
                {fileName: "Retentive Network.pdf", uploadTime:"2023/08/03", uploadedBy: "user2"},
                {fileName: "idea.pdf", uploadTime:"2023/07/31", uploadedBy: "user1"},
                {fileName: "isana.pdf", uploadTime:"2023/08/01", uploadedBy: "user1"},
                {fileName: "Discharge summary hospital course summarisation of in patient Electronic Health Record text with.pdf", uploadTime:"2023/08/03", uploadedBy: "user13"},
                {fileName: "Retentive Network.pdf", uploadTime:"2023/08/03", uploadedBy: "user2"},
            ],
            status: false,
            length: 0,
            bundles: "",
            page: 0,
            serchFile: "",
            foundedFile: [],
            escapeList: [],
            modal: null,
            deleteFileInput: "",
            deleteFile: "",
        }
    },
    async created() {
        await this.getFolder()
        this.setPagenation()
    },
    mounted() {
        onAuthStateChanged(auth, (user) => {
            if (!user) window.location.href = "/login"
            else {
                this.$store.commit('setUser', user)
            }
        })
        this.initModal()
    },
    computed: {
        sumLength() {
            let sum = 0
            this.files.forEach((file) => {
                sum += file.length
            })
            return sum
        },
    },
    watch: {
        serchFile(newValue) {
            if (newValue == "") {
                this.files = this.escapeList
            } else {
                this.files = this.escapeList
                this.files = this.files.map((list) => {
                    return list.filter((file) => {
                        return file.fileName.toUpperCase()
                        .includes(this.serchFile.toUpperCase())
                    })
                })
            }
            this.setPagenation()
        }
    },
    methods: {
        async getFolder() {
            const q = query(collection(firestore, "folder"), orderBy("uploadTime"))
            const qs = await getDocs(q)
            this.files = qs.docs.map((item) => {
                const file = item.data();
                file.docID = item.id
                file.uploadTime = file.uploadTime.toDate().toLocaleDateString('ja-JP')
                return file
            })
            this.$store.commit('setFileName', this.files)
            this.sliceFiles(this.files, 10)
            this.escapeList = this.files
        },
        async openFile(file) {
            await filePath.set(file.fileName)
            location.href="/pdf"
        },
        setPagenation() {
            this.length = this.files[0].length
            if (this.length > 10) {
                this.bandles = "1-10"
            } else {
                this.bundles = this.length
            }
        },
        doDeleteFile() {
            console.log(this.deleteFile)
            if (this.deleteFileInput == this.deleteFile) {
                console.log("delete")
            } else {
                console.log("not delete")
            }
        },
        sliceFiles(array, number) {
            const length = Math.ceil(array.length / number)
            this.files = new Array(length).fill().map((_, i) => {
                const start = i * number
                return array.slice(start, start + number)
            })
        },
        setDeleteFile(file) {
            this.deleteFile = file
            this.modal.show()

        },
        initModal() {
            const $targetModal = this.$refs.targetModal;
            this.modal = new Modal($targetModal);
        }

    }
}
</script>