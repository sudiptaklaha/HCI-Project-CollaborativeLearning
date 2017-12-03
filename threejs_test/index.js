var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

rotateVert = 0;
rotateHor  = 0;
scale = 0;

function init() {

    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.set(0, 6, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    var light = new THREE.AmbientLight( 0xffffff );
    scene.add(light);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    document.body.appendChild( renderer.domElement );

    var loader = new THREE.JSONLoader();
    loader.load('./models/pocky/pocky.json', 
        function(geometry, materials) {
            mesh = new THREE.Mesh(geometry, materials);
            mesh.position.set(0, 0, 0);
            scene.add(mesh);
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

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera);

    
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
}

function zoom(direction){
    switch(direction)
    {
        case "in":
            scale = 1.0;
            break;

        case "out":
            scale = -1.0;
            break;

        case "stop":
            scale = 0;
            break;
    }
}

function animate() {

    requestAnimationFrame( animate );

    
    if (mesh) {
	    //rotate
        mesh.rotation.x += 0.03 * rotateVert;
	    mesh.rotation.z += 0.03 * rotateHor;

        //zoom
        mesh.position.y += 0.03 * scale;
	}
    

    renderer.render( scene, camera );
    controls.update();
}


