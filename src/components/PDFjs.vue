<template>
    <div class="h-910">
        {{ selectedText }}
      <iframe
        ref="pdfIframe"
        class="w-full h-910"
        :src="viewerPath"
      ></iframe>
    </div>
</template>
  
<script>
import { firestorage } from '../firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'

import { auth } from '../firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'


import { useStore } from '@nanostores/vue'
import { filePath } from '../store/filePath';
export default {
    data() {
      return {
        viewerPath:"/pdfjs-dist/web/viewer.html",
        pdfSrc:"",
        selectedText:"",
      }
    },
    created() {
        this.getPDF()
    },
    mounted() {
        this.$refs.pdfIframe.addEventListener('load', this.handleIframeLoad());
        onAuthStateChanged(auth, (user) => {
            if (!user) window.location.href = "/login"
            else {
                this.$store.commit('setUser', user)
            }
        })
       // document.addEventListener('mouseup', this.getSelectedText);
    },
    unmounted() {
        this.$refs.pdfIframe.removeEventListener('load', this.handleIframeLoad());
       // document.removeEventListener('mouseup', this.getSelectedText);
    },
    computed: {
        query() {
            return this.$store.state.query
        },
        triggerForSearchInIframe() {
            return this.$store.state.triggerSearchInIframe;
        }
    },
    watch: {
        triggerForSearchInIframe() {
            this.searchInIframe()
        }
    },
    methods: {
        async getPDF() {
            const fileName = useStore(filePath).value;
            if (fileName) {
            try {
                const pdfPath = `${import.meta.env.PUBLIC_FOLDER_PATH}/archive/${fileName}`
                const gsReference = ref(firestorage, pdfPath)
                this.pdfSrc = await getDownloadURL(gsReference)
                this.loadPDF()
            } catch(err) {
                this.nonePDF = true
                console.log(err)
            }
            } else {
            
            }
        },
        loadPDF() {
            const iframe = this.$refs.pdfIframe;
            if (iframe && iframe.contentWindow) {
            iframe.contentWindow.PDFViewerApplication.open({url: this.pdfSrc});
            }
        },
        handleIframeLoad() {
            const viewerWindow = this.$refs.pdfIframe.contentWindow;
            viewerWindow.addEventListener('mouseup', async () => {
                let text = viewerWindow.getSelection().anchorNode.data
                let addAnchor = false
                if (viewerWindow.getSelection().type == "Range") addAnchor = true
                if (text !== void(0)) {
                    if (text.slice(-1) == '-') {
                        text = text.slice(0, -1)
                    } else if (addAnchor) {
                        text = text + "..."
                    }
                    await this.$store.commit("setQuery", text)
                    this.searchInIframe()
                } 
            })
        },
        searchInIframe() {
            // iframeのcontentWindowからPDFFindBarのインスタンスを取得
            const pdfFindBarInstance = this.$refs.pdfIframe.contentWindow.PDFViewerApplication

            //console.log(pdfFindBarInstance)
            pdfFindBarInstance.findBar.findField.value = this.query
            pdfFindBarInstance.findBar.dispatchEvent("")
        },
    }
  }
  </script>
  