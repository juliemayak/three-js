import * as THREE from 'three'

export default defineNuxtPlugin(async (nuxtApp) => {
    return {
        provide: {
            THREE
        }
    }
})
