// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    build: {
        transpile: ['three']
    },
    plugins: ['~/plugins/threejs.client.js'],
    app: {
        baseURL: '/three-js/', // baseURL: '/<repository>/'
        buildAssetsDir: 'assets' // don't use "_" at the beginning of the folder name to avoid nojekyll conflict
    }
})
