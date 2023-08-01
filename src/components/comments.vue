<template>

<ol class="relative border-l border-gray-200 dark:border-gray-700">
    <li class="mb-10 ml-4" v-for="content of comments">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">March 2022</time>
        <h3 class="text-lg font-semibold text-white-900 dark:text-white">〇〇さんのコメント</h3>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">{{ content }}</p>
    </li>
</ol>

<form>
    <div class="relative">
        <input v-model="inputComment" type="text" class="block w-full p-4 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="コメントする…" required>
        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
    </div>
</form>


    <!-- <ul>
        <li v-for="comment of comments">
             {{  comment  }}
        </li>  
    </ul> -->
</template>

<script>
import { initFlowbite } from 'flowbite'

export default {
    data() {
        return {
            //comments: [],
            comments: ["この論文は、LLMについてのもので…", "この計算式の意味ってわかりますか？", "この部分は結構重要ポイントだと思います。"],
            inputComment:"",
        }
    },
    mounted() {
        initFlowbite()
    }

}
</script>