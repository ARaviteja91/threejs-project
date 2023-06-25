import './style.css' 

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
const material = new THREE.MeshBasicMaterial({color:0xFFF,wireframe:true})

// 3.Geometry+Material
const torus = new THREE.Mesh(geometry,material)

scene.add(torus)

function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;


  renderer.render(scene,camera)
}

animate()