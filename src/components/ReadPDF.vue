    <template>
    <div>
      <canvas v-for="(canvas, index) in canvases" class="mb-10" :key="index" :ref="canvas.ref" v-if="pdfLoaded" :style="{width:`${canvasStyleWidth}px`, height:`${canvasStyleHeight}px`}"></canvas>
    </div>
  </template>
  
  <script>
  import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
  GlobalWorkerOptions.workerSrc = new URL('pdf.worker', import.meta.url);

  import { toRaw } from 'vue'
  
  export default {
    data() {
      return {
        pdf: null,
        canvases: [],
        pdfLoaded: false,
        canvasStyleHeight:false,
        canvasStyleWidth:false,
      };
    },
    mounted() {
      getDocument('test.pdf').promise.then((pdf) => {
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
    methods: {
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
  