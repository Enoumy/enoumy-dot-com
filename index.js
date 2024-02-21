import {
  BoxGeometry,
  BufferGeometry,
  Color,
  DataTexture,
  Line,
  LineBasicMaterial,
  LuminanceFormat,
  Mesh,
  MeshBasicMaterial,
  MeshToonMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';


const run = (f) => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new WebGLRenderer();
  scene.background = new Color(0xbbbbbbb);
  const set_size = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  set_size();
  window.addEventListener('resize', set_size);
  document.getElementById('threejsbox').appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enableDamping = true;
  let { update } = f(scene, camera);
  const effect = new OutlineEffect(renderer);
  const animate = () => {
    requestAnimationFrame(animate);
    update();
    controls.update();
    renderer.render(scene, camera);
    effect.render(scene, camera);
  };
  animate();
};

const basic_cube = (scene, camera) => {
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({
    color: 'tomato',
  });
  console.log(material);
  console.log('created material...');
  [0, 1, 2, 3, 4].forEach((i) => {
    const cube = new Mesh(geometry, material);
    cube.position.set(i, 0, i);
    scene.add(cube);
  });
  camera.position.z = 5;
  return {
    update: () => {},
  };
};

const colors = ['#000000', '#000000', '#6d482f', '#7eed56', '#9c6926', '#ff99aa', '#ffa800', '#ffd635', '#ffffff']
const image = "001000000000000131100010000000167101311000001661001671000001111016610000122221411110011444444444210122244248142111442242455441144422424421101144242424100001111111110000";
const width = 14;
const height = 12;


const capybara = (scene, camera) => {
  const material = (i) => new MeshBasicMaterial({
    color: colors[i],
  });
  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      let i = h * width + w;

      if (image[i] === '0') {
        continue;
      }
      const geometry = new BoxGeometry(1, 1, 1);
      const cube = new Mesh(geometry, material(parseInt(image[i])));
      let x = w - 20;
      let y = w - h; 
      let z = -h - 20;
      cube.position.set(y, -x, -z);
      scene.add(cube);
    }
  }

  var angle = 0;
  var radius = 50; 

  return {
    update: () => {
      camera.position.x = radius * Math.cos( angle );  
      camera.position.y = radius * Math.tan( angle );
      camera.position.z = radius * Math.tan( angle );
      angle += 0.01;
    },
  };
};


run(capybara);
