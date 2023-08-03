    <template>
    <div v-if="!nonePDF">
      <canvas v-for="(canvas, index) in canvases" class="mb-10 ml-3" :key="index" :ref="canvas.ref" v-if="pdfLoaded" :style="{width:`${canvasStyleWidth}px`, height:`${canvasStyleHeight}px`}"></canvas>
    </div>
    <div v-else>
      <h1>PDFファイルを選択してください。
      </h1>
    </div>
  </template>
  
  <script>
  import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
  GlobalWorkerOptions.workerSrc = new URL('pdf.worker', import.meta.url);

  import { toRaw } from 'vue'

  import { firestorage } from '../firebase/firestore'
  import { ref, getDownloadURL } from 'firebase/storage'

  import { useStore } from '@nanostores/vue'
  import { filePath } from '../store/filePath';

  export default {
    data() {
      return {
        pdf: null,
        pdfFile:null,
        nonePDF:false,
        canvases: [],
        pdfLoaded: false,
        canvasStyleHeight:false,
        canvasStyleWidth:false,
      };
    },
    watch: {
      pdfFile(loadedPDF) {
        if (loadedPDF != null) {
          this.setDocument(loadedPDF)
        }
      }
    },
    mounted() {
      this.getPDF()
    },
    methods: {
      async getPDF() {
        try {
          const pdfPath = `${import.meta.env.PUBLIC_FOLDER_PATH}/archive/${useStore(filePath).value}`
          const gsReference = ref(firestorage, pdfPath)
          this.pdfFile = await getDownloadURL(gsReference)
        } catch(err) {
          this.nonePDF = true
          console.log(err)
        }
       
      },
      setDocument() {
        getDocument(this.pdfFile).promise.then((pdf) => {
          this.pdf = pdf;
    
          for (let i = 1; i <= pdf.numPages; i++) {
            this.canvases.push({
              ref: `pdfCanvas${i}`,
            });
    
            this.renderPage(i);
          }
          this.pdfLoaded = true
        });
      },
      renderPage(num) {
        toRaw(this.pdf).getPage(num).then((page) => {
          const scale = 2.0
          const scaledViewport = page.getViewport({scale: scale})
          const canvas = this.$refs[`pdfCanvas${num}`][0];
          const context = canvas.getContext('2d');
          canvas.height = scaledViewport.height * 2
          canvas.width = scaledViewport.width * 2
          this.canvasStyleHeight = scaledViewport.height
          this.canvasStyleWidth = scaledViewport.width
  
          const renderContext = {
            canvasContext: context,
            viewport: scaledViewport,
            transform: [scale, 0, 0, scale, 0, 0]
          };
  
          page.render(renderContext);
        });
      },
    },
  };
  </script>
  