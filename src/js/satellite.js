

// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import des contrôles

// // Importer les textures pour le background
// import bgTexture1 from '/images/1.jpg';
// import bgTexture2 from '/images/2.jpg';
// import bgTexture3 from '/images/3.jpg';
// import bgTexture4 from '/images/4.jpg';

// const scene = new THREE.Scene();

// // ****** Charger le background avec CubeTextureLoader ******
// const cubeTextureLoader = new THREE.CubeTextureLoader();

// // BACKGROUND (Charger les textures de fond)
// scene.background = cubeTextureLoader.load([
//   bgTexture3,
//   bgTexture1, 
//   bgTexture2, 
//   bgTexture2,
//   bgTexture4, 
//   bgTexture2  
// ]);

// // Mouse movement
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// function onMouseMove(event) {
//     event.preventDefault();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
// }

// console.log("Create a perspective projection camera");
// var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 0, 15);  // Déplacer la caméra un peu plus loin pour voir le satellite entier

// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(1, 1, 1);
// scene.add(ambientLight, directionalLight);

// // Charger le modèle 3D du satellite
// const loader = new GLTFLoader();
// loader.load('/models/satellite.glb', (gltf) => {
//   const satellite = gltf.scene;
  
//   // Réduire l'échelle du satellite pour qu'il soit visible
//   satellite.scale.set(0.1, 0.1, 0.1);  // Réduire la taille du satellite
  
//   // Positionner le satellite un peu plus loin sur l'axe Z pour éviter tout conflit
//   satellite.position.set(0, 0, -5);  // Positionner légèrement plus loin pour mieux le voir

//   scene.add(satellite);
// }, undefined, (error) => {
//   console.error('Failed to load model:', error);
// });

// // Ajout des contrôles OrbitControls pour la caméra
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;  // Lissage des mouvements de la caméra
// controls.dampingFactor = 0.25;  // Facteur de lissage
// controls.screenSpacePanning = false; // Désactiver le déplacement de la caméra sur le plan de l'écran

// function animate() {
//   requestAnimationFrame(animate);
  
//   // Mise à jour des contrôles à chaque frame
//   controls.update(); // Nécessaire si enableDamping est activé

//   renderer.render(scene, camera);
// }

// animate();




import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import des contrôles

// Importer les textures pour le background
import bgTexture1 from '/images/1.jpg';
import bgTexture2 from '/images/2.jpg';
import bgTexture3 from '/images/3.jpg';
import bgTexture4 from '/images/4.jpg';

const scene = new THREE.Scene();

// ****** Charger le background avec CubeTextureLoader ******
const cubeTextureLoader = new THREE.CubeTextureLoader();

// BACKGROUND (Charger les textures de fond)
scene.background = cubeTextureLoader.load([
  bgTexture3,
  bgTexture1, 
  bgTexture2, 
  bgTexture2,
  bgTexture4, 
  bgTexture2  
]);

// Mouse movement
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

console.log("Create a perspective projection camera");
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 15);  // Déplacer la caméra un peu plus loin pour voir le satellite entier

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(ambientLight, directionalLight);

// Charger le modèle 3D du satellite
const loader = new GLTFLoader();
let satellite;
loader.load('/models/satellite.glb', (gltf) => {
  satellite = gltf.scene;
  
  // Réduire l'échelle du satellite pour qu'il soit visible
  satellite.scale.set(0.1, 0.1, 0.1);  // Réduire la taille du satellite
  
  // Positionner le satellite un peu plus loin sur l'axe Z pour éviter tout conflit
  satellite.position.set(0, 0, -5);  // Positionner légèrement plus loin pour mieux le voir

  scene.add(satellite);
}, undefined, (error) => {
  console.error('Failed to load model:', error);
});

// Ajout des contrôles OrbitControls pour la caméra
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Lissage des mouvements de la caméra
controls.dampingFactor = 0.25;  // Facteur de lissage
controls.screenSpacePanning = false; // Désactiver le déplacement de la caméra sur le plan de l'écran

let angle = 0; // Initialisation de l'angle pour le mouvement circulaire

function animate() {
  requestAnimationFrame(animate);
  
  if (satellite) {
    // Mouvement circulaire
    angle += 0.01; // Contrôle de la vitesse de rotation
    satellite.position.x = 0.2 * Math.cos(angle); // Mouvement sur l'axe X
    satellite.position.z = 0.2 * Math.sin(angle); // Mouvement sur l'axe Z
  }
  
  // Mise à jour des contrôles à chaque frame
  controls.update(); // Nécessaire si enableDamping est activé

  renderer.render(scene, camera);
}

animate();
