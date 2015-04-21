var renderer;

function webGlBg() {
  var containter;
  var scene;
  var camera;
  var controls;
  var cloud;

  init();

  createObjects();

  animate();

  function init() {

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setPixelRatio( 1 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.setClearColorHex(0xFAFAFA, 1);

    // document.body.appendChild(renderer.domElement);
    // document.body.insertBefore(renderer.domElement, document.body.firstChild);
    // setTimeout(function(){$('.backgrounds')[0].insertBefore(renderer.domElement, $('.backgrounds')[0])}, 2000);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);

    scene.add(camera);
    camera.position.set(0, 0, -100);
    camera.lookAt(scene.position);

    // controls = new THREE.OrbitControls(camera);


    // THREEx.WindowResize(renderer, camera);
  }

  function createObjects() {

    var hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x32D3E8, 1);

    var ambientLight = new THREE.AmbientLight(0x171717);

    // var worldGeo = new THREE.SphereGeometry(10, 32, 32);
    // var worldTexture = THREE.ImageUtils.loadTexture('img/earth-8k.jpg');
    // var worldMat = new THREE.MeshLambertMaterial({map: worldTexture});
    // world = new THREE.Mesh(worldGeo, worldMat);

    var shapeCount = 50;
    var shapeMat = new THREE.MeshLambertMaterial({color: 0xBEF03E});
    shapeMat.shading = THREE.FlatShading;
    cloud = new THREE.Object3D();

    for( var i = 0; i < shapeCount; i++ ) {
      var shape = new THREE.Mesh(
        // new THREE.SphereGeometry(1, 4, 4),
        new THREE.IcosahedronGeometry(5),
        shapeMat
      );
      var pX = Math.random() * 100 - 50;
      var pY = Math.random() * 100 - 50;
      var pZ = Math.random() * 100 - 50;
      shape.position = new THREE.Vector3();
      shape.position.set(pX, pY, pZ);
      shape.position.normalize();
      // shape.position.multiplyScalar(Math.random() * 300 - 150);
      // var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      shape.position.multiplyScalar(
        Math.floor(Math.random() * (200 - 50 + 1)) + 50
      );
      shape.rotationFactor = Math.random() * 0.02 - 0.01;
      console.log(pX)

      cloud.add(shape);
    }

    
    window.cloud = cloud
    scene.add(cloud);
    scene.add(ambientLight);
    scene.add(hemiLight);
  }

  function animate() {

    requestAnimationFrame(animate);

    cloud.rotation.y += 0.0005;
    cloud.rotation.x += 0.0005;
    cloud.rotation.z += 0.0005;
    cloud.children.forEach(function(child, index, children) {
      child.rotation.x += child.rotationFactor;
    })
    // controls.update();

    renderer.render(scene, camera);
  }
}

webGlBg();

Reveal.addEventListener('ready', function(event) {
  // $('.backgrounds')[0].insertBefore(renderer.domElement, $('.backgrounds')[0]);
  // $('.backgrounds')[0].appendChild(renderer.domElement);
  $('.backgrounds').after(renderer.domElement);
  // $('canvas').addClass('force-visible');
});

Reveal.addEventListener('slidechanged', function(event) {
  console.log(event.currentSlide)
  if( !$(event.currentSlide).is('[data-background]') ) {
    console.log( 'asdf' )
    console.log( $(event.currentSlide).attr('data-background') )
    // $('canvas').addClass('force-visible');
  }
});

Reveal.addEventListener( 'fragmentshown', function( event ) {
    if( event.fragment.classList.contains('isl-arrow') ) {
      var arrow = document.getElementsByClassName('isl-arrow__arrow')[0]
      arrow.classList.add('draw-arrow')
    }

    if( event.fragment.classList.contains('js-build-left') ) {
      buildLeft();
    }
    if( event.fragment.classList.contains('js-destroy-left') ) {
      destroyLeft();
    }
    if( event.fragment.classList.contains('js-build-trans') ) {
      buildTrans();
    }
    if( event.fragment.classList.contains('js-destroy-trans') ) {
      destroyTrans();
    }

    if( event.fragment.classList.contains('js-show-gradient') ) {
      animGrad();
    }
    if( event.fragment.classList.contains('js-remove-gradient') ) {
      killAnimGrad();
    }

    if( event.fragment.classList.contains('js-ind-trans-trigger') ){
      indTrans();
    }
    if( event.fragment.classList.contains('js-boing-trigger') ){
      boing();
    }
    if( event.fragment.classList.contains('js-anim-curve-trigger') ){
      curve();
    }
    if( event.fragment.classList.contains('js-random-anim') ){
      randomAnim();
    }
    if( event.fragment.classList.contains('js-thanks') ){
      thanksAnim();
    }
    
} );

