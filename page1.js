function start(){
    var scene = new THREE.Scene();
    // scene.fog = new THREE.FogExp2('#ffffff', 0.2 );
    window.Scene = scene; 
    console.log(scene);

    var cam = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    cam.position.x = 1; cam.position.y = 2; cam.position.z = 5;
    cam.lookAt(new THREE.Vector3(0,0,0));
    
    var mesh = box(0.8, 0.8, 0.8); mesh.position.y = mesh.geometry.parameters.height/2; scene.add( mesh );

    var plane = field(20); plane.name = 'plane-1'; plane.rotation.x = Math.PI/2; scene.add( plane ); 

    var height = window.innerHeight - 16; var width = window.innerWidth - 15;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height); renderer.setClearColor("rgb(120,120,120)");
    document.getElementById('webgl').appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(cam, renderer.domElement);
    update(renderer, scene, cam, controls);
};

function box(x, y, z){
    var geometry = new THREE.BoxGeometry(x, y, z);

    var mat = new THREE.MeshPhongMaterial({
        color: "rgb(120,120,120)"
        
    });

    var mesh = new THREE.Mesh(geometry, mat);

    return mesh;
};

function field(size){
    var geometry = new THREE.PlaneGeometry(size, size);

    var mat = new THREE.MeshPhongMaterial({
        color: "rgb(120,120,120)",
        side: THREE.DoubleSide,
    });

    var mesh = new THREE.Mesh(geometry, mat);

    return mesh;
};

function update(renderer, scene, camera, control){
    renderer.render(scene, camera);

    // var plane = scene.getObjectByName('plane-1');
    // plane.rotation.y += 0.01; plane.rotation.z += 0.01;

    control.update();

    requestAnimationFrame(()=>{
        update(renderer, scene, camera, control);
    })
};

start();