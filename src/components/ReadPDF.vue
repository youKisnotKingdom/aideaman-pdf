    <template>
    <div>
      <canvas v-for="(canvas, index) in canvases" :key="index" :ref="canvas.ref" v-if="pdfLoaded"></canvas>
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
          const viewport = page.getViewport({ scale: 1.0 });
          const canvas = this.$refs[`pdfCanvas${num}`][0];
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
  
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
  
          page.render(renderContext);
        });
      },
    },
  };
  </script>
  