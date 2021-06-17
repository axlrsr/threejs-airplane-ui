import './style.css'
// import './animation.js'
import * as THREE from 'three'
// import waterVertexShader from './shaders/water/vertex.glsl'
// import waterFragmentShader from './shaders/water/fragment.glsl'
import gsap from 'gsap'
import terrainVertexShader from './shaders/terrain/vertex.glsl'
import terrainFragmentShader from './shaders/terrain/fragment.glsl'

/**
 * Animations
 */
// Intro
gsap.timeline().to("body>div", {
    scaleX: 1,
    duration: 1,
    stagger: 0.1
}).to("body>div>*", {
    opacity: 1,
    duration: 1,
    // delay: -0.6,
    stagger: 0.1
}).to('.overlay', {
    background: 'transparent',
    duration: 1
})

// Music
gsap.timeline({
    repeat: -1
}).to(".general__music__line", {
    scaleY: 1,
    duration: 0.5,
    stagger: 0.1
}).to(".general__music__line", {
    scaleY: 0.1,
    duration: 0.5,
    stagger: 0.1
})

// Stabilizer
gsap.timeline({
    repeat: -1,
    repeatDelay: 5
}).to(".interface__icon", {
    rotate: 18,
    duration: 2
}).to(".interface__icon", {
    delay: 3,
    rotate: -6,
    duration: 1
}).to(".interface__icon", {
    delay: 1,
    rotate: 0,
    duration: 0.5
}).to(".interface__icon", {
    delay: 3,
    rotate: -8,
    duration: 1
}).to(".interface__icon", {
    delay: 3,
    rotate: 0,
    duration: 1
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.PlaneGeometry(1, 1, 128, 128)
geometry.rotateX(- 1.3)

const material = new THREE.ShaderMaterial({
    vertexShader: terrainVertexShader,
    fragmentShader: terrainFragmentShader,
    uniforms: {
        uTime: { value: 0 }
    }
})

const mesh = new THREE.Mesh(geometry, material)
mesh.position.y = - 0.35
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    // controls.update()

    // Update material
    material.uniforms.uTime.value = elapsedTime

    // Update clock
    const d = new Date()

    const hh = ('0' + d.getHours()).slice(-2)
    const hours = document.querySelector('.general__hour__hh')
    hours.innerHTML = hh

    const mm = ('0' + d.getMinutes()).slice(-2)
    const minutes = document.querySelector('.general__hour__mm')
    minutes.innerHTML = mm

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()