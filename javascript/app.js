document.querySelectorAll('.draggable').forEach(el => makeDraggable(el));

function makeDraggable(elmnt) {
  const img = elmnt.querySelector('img'); // handle the image directly
  const link = elmnt.querySelector('a');

  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let isDragging = false;
  let clickStarted = false;

  //  Default open cursor
  img.style.cursor = 'url("../assets/cursors/opencursor.png") 8 8, grab';

  img.addEventListener('mousedown', (e) => {
    e.preventDefault();
    clickStarted = true;
    isDragging = false;

    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    //  When pressing down → closed hand
    img.style.cursor = 'url("../assets/cursors/closecursor.png") 8 8, grabbing';
  });

  function elementDrag(e) {
    e.preventDefault();
    isDragging = true;

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;

    //  Return to pointer if still hovering link, otherwise open hand
    if (img.matches(':hover') && link && link.matches(':hover')) {
      img.style.cursor = 'url("../assets/cursors/pointercursor.png") 4 4, pointer';
    } else {
      img.style.cursor = 'url("../assets/cursors/opencursor.png") 8 8, grab';
    }

    clickStarted = false;
  }

  //  Hover states
  img.addEventListener('mouseenter', () => {
    if (!isDragging) {
      img.style.cursor = 'url("../assets/cursors/pointercursor.png") 4 4, pointer';
    }
  });

  img.addEventListener('mouseleave', () => {
    if (!isDragging) {
      img.style.cursor = 'url("../assets/cursors/opencursor.png") 8 8, grab';
    }
  });

  //  Prevent accidental click when dragging
  if (link) {
    link.addEventListener('click', (e) => {
      if (isDragging) e.preventDefault();
    });
  }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new THREE.GLTFLoader();
loader.load('path/to/your/model.glb', function(gltf) {
  scene.add(gltf.scene);
});

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();



function openPage(pageName, elmnt) {
  // Hide all tab content
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove "active" class from all tab links
  const tablinks = document.getElementsByClassName("tablink");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the selected tab
  document.getElementById(pageName).style.display = "block";

  // Add the "active" class to the clicked button
  elmnt.classList.add("active");
}
