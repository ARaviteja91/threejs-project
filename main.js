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


function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update()

  renderer.render(scene,camera)
}

animate()