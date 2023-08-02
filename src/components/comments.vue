<template>
<!-- drawer init and toggle -->
<div class="text-center">
    <button @click="showDrawer" class="fixed bottom-20 right-20 inline-flex items-center justify-center p-0.5 overflow-hidden group bg-gradient-to-br from-green-400 to-blue-600 rounded-full group-hover:from-green-400 group-hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800" type="button"><!-- data-drawer-target="drawer-right-example" data-drawer-body-scrolling="true" data-drawer-backdrop="true" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example"> -->
    <span class="relative p-3 transition-all ease-in duration-75 bg-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0">
        <svg class="w-10 h-10 hover:fill-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M80-80v-740q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H240L80-80Zm134-220h606v-520H140v600l74-80Zm-74 0v-520 520Z"/></svg>
    </span>
    </button>
</div>

<!-- drawer component -->
<div ref="drawer" class="bg-opacity-90 fixed right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-slate-50 w-1/3 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
    <h5 id="drawer" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
        Comments
    </h5>
   <button type="button" @click="hideDrawer" aria-controls="drawer-right-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
      <span class="sr-only">Close menu</span>
   </button>
   <!-- <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> -->
        <ol class="relative border-l border-gray-200 dark:border-gray-700">
            <li class="mb-10 ml-4" v-for="content of comments">
                <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time class="mb-1 text-sm font-normal leading-none text-gray-600 dark:text-gray-500">March 2022</time>
                <h3 class="text-lg font-semibold text-white-900 dark:text-white">〇〇さんのコメント</h3>
                <p class="text-base font-normal text-gray-700 dark:text-gray-400">{{ content }}</p>
            </li>
        </ol>
            <div class="relative">
                <input v-model="inputComment" type="text" class="block w-full p-4 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="コメントする…" required>
                <button type="button" @click="addComment" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
            </div>
    <!-- </div> -->
</div>
</template>

<script>
import { initFlowbite, Drawer } from 'flowbite'

export default {
    data() {
        return {
            //comments: [],
            comments: ["この論文は、LLMについてのもので…", "この計算式の意味ってわかりますか？", "この部分は結構重要ポイントだと思います。"],
            inputComment:"",
            drawer: null,
        }
    },
    mounted() {
        initFlowbite(),
        this.initDrawer()
    },
    methods: {
        addComment() {
            if (this.inputComment != "") this.comments.push(this.inputComment)
            this.inputComment = ""
        },
        initDrawer() {
                        // set the drawer menu element
                const $targetEl = this.$refs.drawer

                // options with default values
                const options = {
                placement: 'right',
                backdrop: true,
                bodyScrolling: true,
                edge: false,
                edgeOffset: '',
                backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
                onHide: () => {
                    console.log('drawer is hidden');
                },
                onShow: () => {
                    console.log('drawer is shown');
                },
                onToggle: () => {
                    console.log('drawer has been toggled');
                }
            };
            this.drawer = new Drawer($targetEl, options)
        },
        showDrawer() {
            this.drawer.show()
        },
        hideDrawer() {
            this.drawer.hide()
        }
    }

}
</script>