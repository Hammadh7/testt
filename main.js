import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('/space.jpg');
scene.background = spaceTexture;

// Avatar

const faceTextures = [
  new THREE.TextureLoader().load('/face/front-face.jpeg'),  // Front face
  new THREE.TextureLoader().load('/face/back-face.jpeg'),   // Back face
  new THREE.TextureLoader().load('/face/top-face.jpeg'),    // Top face
  new THREE.TextureLoader().load('/face/bottom-face.jpeg'), // Bottom face
  new THREE.TextureLoader().load('/face/right-face.jpeg'),  // Right face
  new THREE.TextureLoader().load('/face/left-face.jpeg')    // Left face
];

const materials = faceTextures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3), // Box dimensions
  materials
);

scene.add(jeff);

jeff.position.z = -5;
jeff.position.x = 2;


// Moon

const moonTexture = new THREE.TextureLoader().load('/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 20;
moon.position.setX(-10);



// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

// Initialize Typed.js on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed", {
      strings: [
          "Software Developer",
          // "Blender Artist",
          "Finance Enthusiast",
          "Linux Lover",
          "Meme Artist",
          "Junior (Pre-Final Year) Student",
      ],
      typeSpeed: 50, // Typing speed in milliseconds
      backSpeed: 30, // Backspace speed in milliseconds
      backDelay: 1500, // Delay before typing the next string
      loop: true, // Loop through the strings
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const sliderImages = document.querySelector(".slider-images");
  const images = document.querySelectorAll(".slider-images img");
  const prevButton = document.querySelector(".slider-controls .prev");
  const nextButton = document.querySelector(".slider-controls .next");

  let currentIndex = 0;

  const updateSlider = () => {
    const offset = -currentIndex * slider.offsetWidth;
    sliderImages.style.transform = `translateX(${offset}px)`;
  };

  const showNextSlide = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
  };

  const showPrevSlide = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
  };

  nextButton.addEventListener("click", showNextSlide);
  prevButton.addEventListener("click", showPrevSlide);

  // Optional: Auto-slide every 5 seconds
  setInterval(showNextSlide, 5000);

  // Handle window resize to maintain responsiveness
  window.addEventListener("resize", updateSlider);
});

