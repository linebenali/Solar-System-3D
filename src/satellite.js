import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';

// Importer les textures pour le background
import bgTexture1 from '/images/1.jpg';
import bgTexture2 from '/images/2.jpg';
import bgTexture3 from '/images/3.jpg';
import bgTexture4 from '/images/4.jpg';

const scene = new THREE.Scene();

// ****** Charger le background avec CubeTextureLoader ******

// Créer une instance de CubeTextureLoader
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
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 15);  // Déplacer la caméra un peu plus loin pour voir le satellite entier

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(ambientLight, directionalLight);

const loader = new GLTFLoader();
loader.load('/models/satellite.glb', (gltf) => {
  const satellite = gltf.scene;
  
  // Réduire l'échelle du satellite pour qu'il soit visible
  satellite.scale.set(0.1, 0.1, 0.1);  // Réduire la taille du satellite
  
  // Positionner le satellite un peu plus loin sur l'axe Z pour éviter tout conflit
  satellite.position.set(0, 0, -5);  // Positionner légèrement plus loin pour mieux le voir

  scene.add(satellite);
}, undefined, (error) => {
  console.error('Failed to load model:', error);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
