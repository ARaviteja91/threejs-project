import './style.css' 
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//Important things needed
// 1.Scene
// 2.Camera
// 3.Render

import * as THREE from 'three'

// 1.Scene
const scene = new THREE.Scene()

// 2.Camera -> cameratype( visible-angle, aspect-ratio, view frustrum )
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight,0.1,1000 )

// 3.Render
const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(30)

// renderer.render(scene,camera)




//Creating an object

// 1.Geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

// 2.Material
const material = new THREE.MeshStandardMaterial({color:0xFFF})

// 3.Geometry+Material
const torus = new THREE.Mesh(geometry,material)
scene.add(torus)

//4.Lighting
const pointlight = new THREE.PointLight(0xffffff)
pointlight.position.set(20,10,10)

const ambidentLight = new THREE.AmbientLight(0xffffff)

const lightHelper = new THREE.PointLightHelper(pointlight)

const gridHelper = new THREE.GridHelper(200,50)

const controls = new OrbitControls(camera,renderer.domElement)

scene.add(pointlight,ambidentLight,lightHelper,gridHelper)

function addStars() {
  const sphere = new THREE.SphereGeometry(0.5,24,24)
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(sphere,material)

  const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z)

  scene.add(star)
}

Array(200).fill().forEach(addStars)

//5.Background
const spaceBg = new THREE.TextureLoader().load('img/space.jpg')
scene.background = spaceBg


//Texture
// const boxtextute = new THREE.TextureLoader().load()
const box = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({color:0xffffff})
)

scene.add(box)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.002;
  camera.position.y = t * -0.002;
}
document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update()

  renderer.render(scene,camera)
}

animate()