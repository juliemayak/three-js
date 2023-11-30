// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    build: {
        transpile: ['three']
    },
    plugins: ['~/plugins/threejs.client.js']
    // css: ['./styles/']
    // vite: {
    //     css: {
    //         preprocessorOptions: {
    //             scss: {
    //                 includePaths: ['./styles/']
    //             }
    //         }
    //     }
    // }
})
