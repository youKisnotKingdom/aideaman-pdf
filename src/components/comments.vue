<template>
    <div v-if="query">
        <button label="コメントを追加"></button>
    </div>
<!-- drawer init and toggle -->
<div class="text-center">
    <button @click="showDrawer" ref="tooltipButton"  class="fixed bottom-20 right-20 inline-flex items-center justify-center p-0.5 overflow-hidden group bg-gradient-to-br from-green-400 to-blue-600 rounded-full group-hover:from-green-400 group-hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800" type="button"><!-- data-drawer-target="drawer-right-example" data-drawer-body-scrolling="true" data-drawer-backdrop="true" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example"> -->
    <span class="relative p-3 transition-all ease-in duration-75 bg-white rounded-full dark:bg-gray-900 group-hover:bg-opacity-0">
        <svg class="w-10 h-10 hover:fill-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M80-80v-740q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H240L80-80Zm134-220h606v-520H140v600l74-80Zm-74 0v-520 520Z"/></svg>
    </span>
    </button>
    <div ref="tooltipContent" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            ハイライト部分に
        <br/>コメントを追加する
        <div class="tooltip-arrow" data-popper-arrow>
        </div>
        <span id="badge-dismiss-default" class="absolute -top-1 -right-4 inline-flex items-center mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
            <button type="button" @click="removeHighlightText" class="inline-flex items-center p-2 text-sm text-blue-400 bg-transparent rounded-full hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300" aria-label="Remove">
                <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Remove badge</span>
            </button>
        </span>
    </div>
</div>

<!-- drawer component -->
<div ref="drawer" class="bg-opacity-90 fixed right-0 z-40 h-screen p-4 overflow-y-none transition-transform translate-x-full bg-slate-50 w-1/3 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
    <div class="fixed z-50 w-1/3">
        <h5 id="drawer" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
        Comments
        </h5>
        <button type="button" @click="hideDrawer" aria-controls="drawer-right-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute right-10 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close menu</span>
        </button>
    </div>
    <div class="block mt-10 h-screen overflow-y-none">
        <ol class="relative overflow-y-auto h-2/3">
            <li class="mb-10 ml-4 cursor-pointer" v-for="content, key of comments" @click="replyComment(key)">
                <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-0.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <div class="items-start p-2 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col dark:bg-gray-700 dark:border-gray-600">
                    <div class="mb-1 text-xs font-normal text-gray-400">
                        {{ content[0].userName }}
                        <time>{{ content[0].time}}</time>
                    </div>
                    <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                        <blockquote v-if="content[0].quote" @click.stop="serachQuote(content[0].quote)" class="relative p-4 m-2 border-l-4 border-gray-500 bg-gray-300 dark:border-gray-500 dark:bg-gray-800 rounded-md">
                            <p class="text-sm italic leading-relaxed text-gray-900 dark:text-white">{{ content[0].quote }}</p>
                        </blockquote>
                        <div class="font-normal pl-2">
                            {{ content[0].comment }}
                        </div>
                    </div>
                    <div v-if="content.length > 1">
                        <template v-if="showComments">
                            <div v-for="comment of content.slice(1)" class="flex-col items-start ml-3 mt-2 text-sm font-normal text-gray-500 dark:text-gray-300">
                                <div class="mb-2 ml-2 text-xs font-normal text-gray-400">
                                    {{ comment.userName }}
                                    <time>{{ comment.time}}</time>
                                </div>
                                <blockquote v-if="comment.quote" @click.stop="serachQuote(comment.quote)" class="relative p-4 m-2 border-l-4 border-gray-500 bg-gray-300 dark:border-gray-500 dark:bg-gray-800 rounded-md">
                                    <p class="text-sm italic leading-relaxed text-gray-900 dark:text-white">{{ comment.quote }}</p>
                                </blockquote>
                                <div class="font-normal pl-4">
                                    {{ comment.comment }}
                                </div>
                            </div>
                        </template>
                        <button
                            @click.stop="showComments = !showComments"
                            class="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none text-sm"
                            >
                            {{ showComments ? 'Hide comments' : 'Read More...' }}
                        </button>
                </div>
                </div>
                <!-- <time class="mb-1 text-sm font-normal leading-none text-gray-600 dark:text-gray-500">{{ content.time }}</time>
                <blockquote v-if="content.quote" class="relative p-4 m-1 border-l-4 border-gray-500 bg-gray-300 dark:border-gray-500 dark:bg-gray-800 rounded-md">
                    <p class="text-sm italic leading-relaxed text-gray-900 dark:text-white">{{ content.quote }}</p>
                </blockquote>
                <h3 class="text-lg font-semibold text-white-900 dark:text-white">{{content.userName}}さんのコメント</h3>
                <p class="text-base font-normal text-gray-700 dark:text-gray-400">{{ content.comment }}</p> -->
            </li>
        </ol>
    </div>
            <!-- <div class="relative">
                <input v-model="inputComment" type="text" class="block w-full p-4 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="コメントする…" required>
                <button type="button" @click="addComment" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
            </div> -->
            <div class="fixed -bottom-4 right-0 w-1/3 p-3">
            <form>
                <blockquote v-if="query || replyTo" class="relative p-4 m-1 border-l-4 border-gray-500 bg-gray-300 dark:border-gray-500 dark:bg-gray-800 rounded-md">
                    <span id="badge-dismiss-default" class="absolute -top-1 -right-3 inline-flex items-center mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <button type="button" @click="removeHighlightText" class="inline-flex items-center p-2 text-sm text-blue-400 bg-transparent rounded-full hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300" aria-label="Remove">
                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Remove badge</span>
                        </button>
                    </span>
                    <p class="text-sm italic leading-relaxed text-gray-900 dark:text-white">{{ query? query: `${comments[replyTo][0].userName}に返信` }}</p>
                </blockquote>
            <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label for="comment" class="sr-only">Your comment</label>
                    <textarea id="comment" v-model="inputComment" rows="4" style="outline: none;" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                </div>
                <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <div class="flex pl-0 space-x-1 sm:pl-2">
                    </div>
                    <button @click="addComment" type="button" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        送信
                    </button>
                </div>
            </div>
            </form>
            </div>
</div>
</template>

<script>
import { initFlowbite, Drawer, Tooltip } from 'flowbite'

import { query, getDocs, Timestamp, addDoc, collection, where, orderBy } from 'firebase/firestore'
import { firestore } from "../firebase/firestore"

import { auth } from '../firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

import { useStore } from '@nanostores/vue'
import { filePath } from '../store/filePath'

export default {
    data() {
        return {
            //comments: [],
            comments: ["この論文は、LLMについてのもので…", "この計算式の意味ってわかりますか？", "この部分は結構重要ポイントだと思います。"],
            pushable: true,
            inputComment:"",
            drawer: null,
            tooltip: null,
            showComments: false,
            replyTo: "",
            userName: ""
        }
    },
    created() {
        console.log(useStore(filePath).value)
        //this.getComments()
    },
    mounted() {
        onAuthStateChanged(auth, (user) => {
            if (!user) window.location.href = "/login"
            else {
                console.log(user)
                this.$store.commit('setUser', user)
                this.getUserName(user)
            }
        })
        console.log(this.userName)
        initFlowbite(),
        this.getComments()
        this.initDrawer()
        this.initTooltip()
    },
    computed: {
        query() {
            return this.$store.state.query
        }
    },
    watch: {
        query(newQuery) {
            if (newQuery != "") this.tooltip.show()
        }
    },
    methods: {
        async getComments() {
            const fileName = useStore(filePath).value;
            if (fileName) {
                const collectionRef = await collection(firestore, "comments", "paper", useStore(filePath).value)
                const q = query(collectionRef, orderBy("time", "asc"))
                const qs = await getDocs(q)
                this.comments = {}
                qs.docs.forEach((item) => {
                    const data = item.data()
                    data.time = data.time.toDate().toLocaleDateString("ja-JP")
                    if (!data.parentComment) {
                        this.comments[item.id] = [data]
                    } else {
                        this.comments[data.parentComment].push(data)
                    }
                })
            }
            
        },
        async getUserName(user) {
            const q = query(collection(firestore, "users"), where("email", "==", user.email))
            const qs = await getDocs(q)
            this.userName = qs.docs[0].data().name
            console.log(this.userName)
        },
        async addComment() {
            if (this.inputComment != "") {
                const nowTime = Timestamp.now()
                const  userName = "userName"
                const data = {
                    time: nowTime,
                    userName: this.userName,
                    comment: this.inputComment,
                    quote: this.query,
                    parentComment: this.replyTo
                }
                const docRef = await addDoc((collection(firestore, "comments", "paper", useStore(filePath).value)), data)
                console.log("sent")
                data.time = data.time.toDate().toLocaleDateString()
                if (!data.parentComment) {
                    this.comments[docRef.id] = [data]
                } else {
                    this.comments[data.parentComment].push(data)
                }
            }
            this.$store.commit("setQuery", "")
            this.replyTo = ""
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
                    //console.log('drawer is hidden');
                },
                onShow: () => {
                    //console.log('drawer is shown');
                },
                onToggle: () => {
                    //console.log('drawer has been toggled');
                }
            };
            this.drawer = new Drawer($targetEl, options)
        },
        showDrawer() {
            this.drawer.show()
        },
        hideDrawer() {
            this.drawer.hide()
        },
        initTooltip() {
            const $targetEl = this.$refs.tooltipContent

            // set the element that trigger the tooltip using hover or click
            const $triggerEl = this.$refs.tooltipButton

            const options = {
                placement: 'top',
                triggerType: 'none',
                onHide: () => {
                    console.log('tooltip is shown');
                },
                onShow: () => {
                    if (this.query == "") {
                        console.log("none")
                        this.tooltip.hide()
                    }
                },
                onToggle: () => {
                    console.log('tooltip is toggled');
                }
            }

            this.tooltip = new Tooltip($targetEl, $triggerEl, options);
        },
        removeHighlightText() {
            this.$store.commit("setQuery", "")
            this.$store.dispatch("activateSearchInIframe")
            this.tooltip.hide()
            this.replyTo = ""
        },
        serachQuote(quote) {
            this.$store.commit("setQuery", quote)
            this.$store.dispatch("activateSearchInIframe")
            this.tooltip.hide()
            this.hideDrawer()
        },
        replyComment(key) {
            this.replyTo = key
        }
    }

}
</script>