    <template>
    <div>
      <canvas v-for="(canvas, index) in canvases" class="mb-10 ml-3" :key="index" :ref="canvas.ref" v-if="pdfLoaded" :style="{width:`${canvasStyleWidth}px`, height:`${canvasStyleHeight}px`}"></canvas>
    </div>
  </template>
  
  <script>
  import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
  GlobalWorkerOptions.workerSrc = new URL('pdf.worker', import.meta.url);

  import { toRaw } from 'vue'

  import { firestorage } from '../firebase/firestore'
  import { ref, getDownloadURL, listAll } from 'firebase/storage'

  const listRef = ref(firestorage,`${import.meta.env.PUBLIC_FOLDER_PATH}/archive`)

  const pdfPath = `${import.meta.env.PUBLIC_FOLDER_PATH}/archive/Retentive Network.pdf`
  console.log(pdfPath)
  const gsReference = ref(firestorage, pdfPath)

  export default {
    data() {
      return {
        pdf: null,
        pdfFile:null,
        canvases: [],
        pdfLoaded: false,
        canvasStyleHeight:false,
        canvasStyleWidth:false,
      };
    },
    created() {
      this.getPDF()
    },
    watch: {
      pdfFile(loadedPDF) {
        if (loadedPDF != null) {
          this.setDocument(loadedPDF)
        }
      }
    },
    async mounted() {
      //const pdfName = this.pdfFile ? this.pdfFile : 'test.pdf'
      console.log(this.pdfFile)
      this.getList()
    },
    methods: {
      async getPDF() {
        try {
          this.pdfFile = await getDownloadURL(gsReference)
          console.log("file", this.pdfFile)
        } catch(err) {
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
      getList() {
        listAll(listRef)
          .then((res) => {
            res.prefixes.forEach((folderRef) => {
              // All the prefixes under listRef.
              // You may call listAll() recursively on them.
              console.log(folderRef)
            });
            res.items.forEach((itemRef) => {
              // All the items under listRef.
              console.log(itemRef._location.path_)
            });
          }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error)
          });
        }
    },
  };
  </script>
  