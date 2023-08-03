<template>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    File name
                </th>
                <th scope="col" class="px-6 py-3">
                    uploadedBy
                </th>
                <th scope="col" class="px-6 py-3">
                    uploadTime
                </th>
                <th scope="col" class="px-6 py-3">
                    <span>Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
                <tr v-for="file of files" @click="openFile(file)" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ file.fileName }}
                    </th>
                    <td class="px-6 py-4">
                        {{ file.uploadedBy }}
                    </td>
                    <td class="px-6 py-4">
                        {{ file.uploadTime }}
                    </td>
                    <td class="px-6 py-4">
                        Edit
                    </td>
                </tr>
        </tbody>
    </table>
</div>

</template>

<script>
import { filePath } from '../store/filePath'
 
export default {
    data() {
        return {
            files: [
                {fileName: "idea.pdf", uploadTime:"2023/07/31", uploadedBy: "user1"},
                {fileName: "isana.pdf", uploadTime:"2023/08/01", uploadedBy: "user1"},
                {fileName: "Discharge summary hospital course summarisation of in patient Electronic Health Record text with.pdf", uploadTime:"2023/08/03", uploadedBy: "user13"},
                {fileName: "Retentive Network.pdf", uploadTime:"2023/08/03", uploadedBy: "user2"},
            ]
        }
    },
    created() {
        //this.getFolder()
    },
    methods: {
        async getFolder() {
            const q = query(collection(firestore, "folder"), orderBy("uploadTime"))
            const qs = await getDocs(q)
            this.files = qs.docs.map((item) => {
                const file = item.data();
                file.uploadTime = file.uploadTime.toDate().localeDateString('ja-JP')
                return file
            })
        },
        async openFile(file) {
            await filePath.set(file.fileName)
            location.href="/"
        }

    }
}
</script>