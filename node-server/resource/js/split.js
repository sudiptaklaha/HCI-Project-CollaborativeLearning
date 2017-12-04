var camera, scene, renderer;
var geometry, material, mesh;
var mesh_top, mesh_bottom, mesh_left, mesh_right;
var scale_top = new THREE.Vector3(0, 0, -1); 
var scale_bottom = new THREE.Vector3(0, 0, 1); 
var scale_left = new THREE.Vector3(-1, 0, 0);
var scale_right = new THREE.Vector3(1, 0, 0);
var models=['ant', '12oz', 'eyeball', 'pocky'];
var model_no = 0;
var rotateVert = 0;
var rotateHor  = 0;
var zoomScale = 0;
var originalScale = 0;

//demo
var rotationSwitch = false;

var rotObjectMatrix;
var xAxis = new THREE.Vector3(1,0,0);
var yAxis = new THREE.Vector3(0,1,0);
var zAxis = new THREE.Vector3(0,0,1);

init();
load_model(1);
animate();
setInterval(function() {
    $.ajax({url: '/get3D', success: function(result){
        console.log("model_no", result);
        if(model_no!=result) {
            model_no=result;

            // Remove previous model
            if (mesh) {
                scene.remove(mesh_top);
                scene.remove(mesh_bottom);
                scene.remove(mesh_left);
                scene.remove(mesh_right);
            }

            // Load the new model
            load_model(result);
        }
    }});
}, 2000);

function init() {

    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.set(0, 10, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );

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
            mesh.position.set(8, 8, 8);
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
            mesh_bottom.rotation.y = Math.PI;
            scene.add(mesh_bottom);

            mesh_left = mesh.clone();
            mesh_left.position.set(
                mesh.position.x * scale_left.x, 
                mesh.position.y * scale_left.y, 
                mesh.position.z * scale_left.z
            ); 

            rotateOnObjectAxis(mesh_left, yAxis, Math.PI/2);
            scene.add(mesh_left);

            mesh_right = mesh.clone();
            mesh_right.position.set(
                mesh.position.x * scale_right.x, 
                mesh.position.y * scale_right.y, 
                mesh.position.z * scale_right.z
            );
            
            rotateOnObjectAxis(mesh_right, yAxis, -Math.PI/2);
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

function rotate(direction){

    switch(direction)
    {
        case "right":
            rotateHor = -1.0;
            rotateVert = 0;
            break;

        case "left":
            rotateHor = 1.0;
            rotateVert = 0;
            break;

        case "up":
            rotateVert = -1.0;
            rotateHor = 0;
            break;

        case "down":
            rotateVert = 1.0;
            rotateHor = 0;
            break;
        case "stop":
            rotateVert = 0;
            rotateHor = 0;
            break;
    }

    //demo
    rotationSwitch=true;
}

function zoom(direction){
    //demo
    if(rotationSwitch ==true)
    {
        switch(direction)
        {
        case "in":
            zoomScale = 1.0;
            break;

        case "out":
            zoomScale = -1.0;
            break;

        case "stop":
            zoomScale = 0;
            break;
        }
    }       
}
function animate() {

    requestAnimationFrame( animate );

    var rotationalVector = new THREE.Vector3(0.01, 0.01, 0.01);
    if(originalScale = 0)
        originalScale = mesh_top.scale.x;

    if (mesh) {
        mesh_top.rotation.x += rotationalVector.x * rotateVert;
        mesh_top.rotation.z += rotationalVector.z * rotateHor;

        mesh_bottom.rotation.x -= rotationalVector.x * rotateVert;
        mesh_bottom.rotation.z += rotationalVector.z * rotateHor;

    
        rotateOnObjectAxis(mesh_left, xAxis, rotationalVector.x * rotateVert);
        rotateOnObjectAxis(mesh_left, zAxis, rotationalVector.z * rotateHor);
        rotateOnObjectAxis(mesh_right, xAxis, rotationalVector.x * rotateVert);
        rotateOnObjectAxis(mesh_right, zAxis, rotationalVector.z * rotateHor);
        //mesh_left.rotation.x += rotationalVector.x * rotateHor;
        //mesh_left.rotation.z += rotationalVector.z * rotateVert;
        //mesh_right.rotation.x += rotationalVector.x * rotateHor;
        //mesh_right.rotation.z += rotationalVector.z * rotateVert;

        console.log(mesh_top.scale.x);
        if(mesh_top.scale.x >=1)
        {
            if(mesh_top.scale.x +0.01 * zoomScale >=1)
            {
                mesh_top.scale.set(mesh_top.scale.x +0.01 * zoomScale, mesh_top.scale.y +0.01 * zoomScale, mesh_top.scale.z +0.01 * zoomScale);
                mesh_bottom.scale.set(mesh_bottom.scale.x +0.01 * zoomScale, mesh_bottom.scale.y +0.01 * zoomScale, mesh_bottom.scale.z +0.01 * zoomScale);
                mesh_left.scale.set(mesh_left.scale.x +0.01 * zoomScale, mesh_left.scale.y +0.01 * zoomScale, mesh_left.scale.z +0.01 * zoomScale);
                mesh_right.scale.set(mesh_right.scale.x +0.01 * zoomScale, mesh_right.scale.y +0.01 * zoomScale, mesh_right.scale.z +0.01 * zoomScale);
            }
        }

    }

    renderer.render( scene, camera );
    //controls.update();
}

function rotateOnObjectAxis(object, axis, radians) {
    objectMatrix = new THREE.Matrix4();
    objectMatrix.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(objectMatrix);
    object.rotation.setFromRotationMatrix(object.matrix);
}
