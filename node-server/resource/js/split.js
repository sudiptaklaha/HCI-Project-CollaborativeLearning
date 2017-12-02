var camera, scene, renderer;
var geometry, material, mesh;
var mesh_top, mesh_bottom, mesh_left, mesh_right;
var scale_top = new THREE.Vector3(0, 0, -1); 
var scale_bottom = new THREE.Vector3(0, 0, 1); 
var scale_left = new THREE.Vector3(-1, 0, 0);
var scale_right = new THREE.Vector3(1, 0, 0);
var models=['ant', '12oz', 'eyeball', 'pocky'];
var model_no = 0;

init();
load_model(0);
animate();
setInterval(function() {
    $.ajax({url: '/get3D', success: function(result){
        console.log("model_no", result);
        if(model_no!=result) {
            model_no=result;

            // Remove previous model
            scene.remove(mesh_top);
            scene.remove(mesh_bottom);
            scene.remove(mesh_left);
            scene.remove(mesh_right);

            // Load the new model
            load_model(result);
        }
    }});
}, 2000);

function init() {

    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.set(0, 10, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xdddddd );

    var light = new THREE.AmbientLight( 0xffffff ); // soft white light
    scene.add(light);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild(renderer.domElement);

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera);
}

function load_model(model) {
    var loader = new THREE.JSONLoader();
    loader.load('../models/'+models[model]+'/'+models[model]+'.json', 

        function(geometry, materials) {
            mesh = new THREE.Mesh(geometry, materials);
            mesh.position.set(3, 3, 3);
            //scene.add(mesh);

            mesh_top = mesh.clone();
            mesh_top.position.set(
                mesh.position.x * scale_top.x, 
                mesh.position.y * scale_top.y, 
                mesh.position.z * scale_top.z
            );
            scene.add(mesh_top);

            mesh_bottom = mesh.clone();
            mesh_bottom.position.set(
                mesh.position.x * scale_bottom.x, 
                mesh.position.y * scale_bottom.y, 
                mesh.position.z * scale_bottom.z
            );
            mesh_bottom.scale.x = -1;
            scene.add(mesh_bottom);

            mesh_left = mesh.clone();
            mesh_left.position.set(
                mesh.position.x * scale_left.x, 
                mesh.position.y * scale_left.y, 
                mesh.position.z * scale_left.z
            ); 
            mesh_left.rotation.y = Math.PI / 2;
            scene.add(mesh_left);

            mesh_right = mesh.clone();
            mesh_right.position.set(
                mesh.position.x * scale_right.x, 
                mesh.position.y * scale_right.y, 
                mesh.position.z * scale_right.z
            );
            mesh_right.rotation.y = - Math.PI / 2;
            scene.add(mesh_right);
        },

        // Function called when download progresses
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },

        // Function called when download errors
        function ( xhr ) {
            console.error( 'An error happened' );
        }
    );
}

function animate() {

    requestAnimationFrame( animate );

    var rotationalVector = new THREE.Vector3(0.01, 0.01, 0.01);

    if (mesh) {
	    mesh_top.rotation.x += rotationalVector.x * scale_top.x;
	    mesh_top.rotation.y += rotationalVector.y * scale_top.y;
	    mesh_top.rotation.z += rotationalVector.z * scale_top.z;

        mesh_bottom.rotation.x += rotationalVector.x * scale_bottom.x;
        mesh_bottom.rotation.y += rotationalVector.y * scale_bottom.y;
        mesh_bottom.rotation.z += rotationalVector.z * scale_bottom.z;

        mesh_left.rotation.x += rotationalVector.x * scale_left.x;
        mesh_left.rotation.y += rotationalVector.y * scale_left.y;
        mesh_left.rotation.z += rotationalVector.z * scale_left.z;

        mesh_right.rotation.x += rotationalVector.x * scale_right.x;
        mesh_right.rotation.y += rotationalVector.y * scale_right.y;
        mesh_right.rotation.z += rotationalVector.z * scale_right.z;
	}

    renderer.render( scene, camera );
    controls.update();
}