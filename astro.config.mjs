import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
    integrations: [vue()],
    vite: {
        resolve: {
            alias: {
                'pdf.worker': 'pdfjs-dist/build/pdf.worker.js',
            }
        }
    }
});
