<template>
    <div
        id="canvas"
        ref="canvas"></div>
</template>

<script setup>
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Reflector } from 'three/examples/jsm/objects/Reflector'

const { $THREE } = useNuxtApp()

let scene, camera, renderer
const canvas = ref()

// function animateObject() {
// requestAnimationFrame(animate)
// renderer.render(scene, camera)
// }

function renderLoop() {
    requestAnimationFrame(renderLoop)
    renderer.render(scene, camera)
    // animateObject()
}

function createLamppost() {
    const lamppost = new $THREE.Group()
    const lpMaterial = new $THREE.MeshPhongMaterial({
        color: '#262B45'
    })

    lamppost.position.y = 2.5
    lamppost.position.x = -4
    lamppost.position.z = 3
    scene.add(lamppost)

    const lpY = new $THREE.Mesh(new $THREE.BoxGeometry(0.2, 5, 0.2), lpMaterial)
    lamppost.add(lpY)

    const lpPlatform1 = new $THREE.Mesh(new $THREE.BoxGeometry(0.5, 0.1, 0.5), lpMaterial)
    const lpPlatform2 = new $THREE.Mesh(new $THREE.BoxGeometry(1, 0.1, 1), lpMaterial)
    lpPlatform1.position.y = -2.4
    lpPlatform1.position.x = 0
    lpPlatform2.position.y = -2.5
    lpPlatform2.position.x = 0
    lamppost.add(lpPlatform1)
    lamppost.add(lpPlatform2)

    const lpDecor = new $THREE.Mesh(new $THREE.BoxGeometry(0.3, 2, 0.3), lpMaterial)
    const lpDecor2 = new $THREE.Mesh(new $THREE.BoxGeometry(0.3, 0, 0.3), lpMaterial)
    lpDecor.position.y = -1.3
    lpDecor.position.x = 0
    lamppost.add(lpDecor)
    lpDecor2.position.y = 2.5
    lamppost.add(lpDecor2)

    const crossbar = new $THREE.Mesh(new $THREE.BoxGeometry(2, 0.1, 0.1), lpMaterial)
    crossbar.position.y = 2
    lamppost.add(crossbar)

    const crossbarEl1 = new $THREE.Mesh(new $THREE.BoxGeometry(0.1, 0.3, 0.1), lpMaterial)
    const crossbarEl2 = new $THREE.Mesh(new $THREE.BoxGeometry(0.1, 0.3, 0.1), lpMaterial)
    const crossbarEl3 = new $THREE.Mesh(new $THREE.BoxGeometry(0.2, 0.1, 0.2), lpMaterial)
    const crossbarEl4 = new $THREE.Mesh(new $THREE.BoxGeometry(0.2, 0.1, 0.2), lpMaterial)
    crossbarEl1.position.x = -0.8
    crossbarEl1.position.y = -0.2
    crossbarEl2.position.x = 0.8
    crossbarEl2.position.y = -0.2
    crossbarEl3.position.y = 0
    crossbarEl3.position.x = 1
    crossbarEl4.position.y = 0
    crossbarEl4.position.x = -1
    crossbar.add(crossbarEl1)
    crossbar.add(crossbarEl2)
    crossbar.add(crossbarEl3)
    crossbar.add(crossbarEl4)

    // Create two sphere lamps
    const lampGeometry = new $THREE.SphereGeometry(0.3, 32, 32)
    const lampMaterial = new $THREE.MeshPhongMaterial({
        color: '#fff', // Adjust the color as needed
        emissive: '#FF8AFF' // Adjust the emissive color as needed
    })
    const lamp1 = new $THREE.Mesh(lampGeometry, lampMaterial)
    const lamp2 = new $THREE.Mesh(lampGeometry, lampMaterial)

    lamp1.position.x = -0.8
    lamp1.position.y = -0.5
    lamp2.position.x = 0.8
    lamp2.position.y = -0.5
    crossbar.add(lamp1)
    crossbar.add(lamp2)

    // lights
    const lightLamp1 = new $THREE.PointLight('#FF8AFF', 6, 10, 1)
    const lightLamp2 = new $THREE.PointLight('#FF8AFF', 6, 10, 1)
    lamp1.add(lightLamp1)
    lamp2.add(lightLamp2)
}

function setupScene() {
    scene = new $THREE.Scene()
    // scene.background = new $THREE.Color('#b9d5ff')

    const textureLoader = new $THREE.TextureLoader()

    camera = new $THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 100)
    camera.position.set(0, 7, 10) // far
    // camera.position.set(-6, 5, 4)

    // ambient light
    const ambientLight = new $THREE.AmbientLight('#bababa', 0.9)
    scene.add(ambientLight)

    // moonlight effect
    const moonLight = new $THREE.DirectionalLight('#b9d5ff', 0.9)
    moonLight.position.set(4, 5, -2)
    scene.add(moonLight)

    // Fog
    const fog = new $THREE.Fog('#332941', 1, 20)
    scene.fog = fog

    // Ghost
    const ghost = new $THREE.PointLight('#f3f3f3', 2, 3)
    scene.add(ghost)

    // House
    const house = new $THREE.Group()
    scene.add(house)

    // Walls
    const wallsMaterial = new $THREE.MeshStandardMaterial({ color: 'white' })
    const walls = new $THREE.Mesh(new $THREE.BoxGeometry(4, 5, 4), wallsMaterial)
    walls.set
    walls.position.y = 2.5
    house.add(walls)

    // textureLoader.load('/', function (map) {
    //     map.wrapS = $THREE.RepeatWrapping
    //     map.wrapT = $THREE.RepeatWrapping
    //     map.anisotropy = 4
    //     map.repeat.set(1, 2)
    //     map.colorSpace = $THREE.SRGBColorSpace
    //     wallsMaterial.map = map
    //     wallsMaterial.needsUpdate = true
    // })

    // Roof
    const roof = new $THREE.Mesh(
        new $THREE.ConeGeometry(3.5, 1, 4),
        new $THREE.MeshStandardMaterial({ color: 'gray' })
    )
    roof.rotation.y = Math.PI * 0.25
    roof.position.y = 5 + 0.5 // walls height + roof height/2
    house.add(roof)

    // Door
    const door = new $THREE.Mesh(
        new $THREE.PlaneGeometry(1, 2),
        new $THREE.MeshStandardMaterial({ color: '#aa7b7b' })
    )

    door.position.y = 1 // height is 2 / 2
    door.position.z = 2 + 0.01 // walls depth 4/2 + 0.01 to avoid z-fighting
    house.add(door)

    // Floor
    const floorMaterial = new $THREE.MeshStandardMaterial()
    floorMaterial.color = new $THREE.Color('#333E55')
    floorMaterial.transparent = true
    const floor = new $THREE.Mesh(new $THREE.PlaneGeometry(40, 40), floorMaterial)
    floorMaterial.opacity = 0.7

    floor.position.y = 0
    floor.rotation.x = -Math.PI * 0.5
    scene.add(floor)

    const lightSpot = new $THREE.SpotLight('#FF0065', 1, 8, Math.PI, 0.5, -1) // distance angle penumbra decay
    lightSpot.position.set(5, 3, 9)
    scene.add(lightSpot)

    // LAMPPOST
    createLamppost()

    const groundMirrorGeometry = new $THREE.PlaneGeometry(40, 40)
    const groundMirror = new Reflector(groundMirrorGeometry, {
        clipBias: 0.0003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x889999,
        recursion: 1
    })
    groundMirror.position.y = -0.0001
    groundMirror.rotateX(-Math.PI * 0.5)
    scene.add(groundMirror)

    // const hemiLight = new $THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02)
    // scene.add(hemiLight)

    // Renderer
    renderer = new $THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor('#332941')
    canvas.value.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    // How far you can orbit vertically, upper and lower limits.
    controls.minPolarAngle = 0
    controls.maxPolarAngle = Math.PI * 0.45
    // How far you can orbit horizontally, upper and lower limits.
    // controls.minAzimuthAngle = -Infinity
    // controls.maxAzimuthAngle = Infinity
    controls.enableDamping = true

    requestAnimationFrame(renderLoop)
}

onMounted(() => {
    if (canvas) {
        setupScene()
    }
})
</script>

<style>
body {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
}
</style>
