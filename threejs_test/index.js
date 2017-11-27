var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.set(0, 6, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcccccc );

    // Create a light, set its position, and add it to the scene.
    var light = new THREE.AmbientLight( 0xffffff ); // soft white light
    scene.add(light);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    document.body.appendChild( renderer.domElement );

    var loader = new THREE.JSONLoader();
    loader.load('./eyeball.json', 

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

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x -= 0.01;
    mesh.rotation.y -= 0.01;
    mesh.rotation.z += 0.01;

    renderer.render( scene, camera );
    controls.update();
}