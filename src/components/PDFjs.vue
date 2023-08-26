<template>
    <div class="h-screen">
        {{ selectedText }}
      <iframe
        ref="pdfIframe"
        class="w-full"
        height="1000px"
        :src="viewerPath"
        @load="handleIframeLoad"
      ></iframe>
    </div>
</template>
  
<script>
import { firestorage } from '../firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'

import { useStore } from '@nanostores/vue'
import { filePath } from '../store/filePath';
export default {
    data() {
      return {
        // このパスはビルド済みビューワーの場所に応じて調整してください
        viewerPath: '/pdfjs-dist/web/viewer.html',
        pdfSrc:"",
        selectedText:""
      }
    },
    created() {
        this.getPDF()
    },
    mounted() {
       // document.addEventListener('mouseup', this.getSelectedText);
    },
    unmounted() {
       // document.removeEventListener('mouseup', this.getSelectedText);
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
        getSelectedText() {
            this.selectedText = window.getSelection().toString()
            console.log(this.selectedText)
        },
        handleIframeLoad() {
            console.log("loaded")
            const viewerWindow = this.$refs.pdfIframe.contentWindow;

            viewerWindow.document.addEventListener('mouseover', () => {
            const selectedText = viewerWindow.PDFViewerApplication.pdfIframe.currentSelection.getAnchorText();

            if (selectedText) {
            this.selectedText = selectedText;
            console.log(this.selectedText)
            }
        });
        }
    }
  }
  </script>
  