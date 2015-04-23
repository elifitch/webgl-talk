var renderer;
var $canvas;

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

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 2000);

    scene.add(camera);
    camera.position.set(0, 0, -100);
    camera.lookAt(scene.position);

    // controls = new THREE.OrbitControls(camera);


    // THREEx.WindowResize(renderer, camera);
  }

  function createObjects() {

    var hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x8FDDE8, 1);

    // var ambientLight = new THREE.AmbientLight(0x070707);

    var shapeCount = 50;
    // var shapeMat = new THREE.MeshLambertMaterial({color: 0xBEF03E});
    var shapeMat = new THREE.MeshLambertMaterial({color: 0x999999});
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
      shape.rotationFactor = Math.random() * 0.03 - 0.015;
      console.log(pX)

      cloud.add(shape);
    }

    
    window.cloud = cloud
    scene.add(cloud);
    // scene.add(ambientLight);
    scene.add(hemiLight);
  }

  function animate() {

    requestAnimationFrame(animate);

    cloud.rotation.y += 0.0005;
    cloud.rotation.x += 0.0005;
    cloud.rotation.z += 0.0005;
    cloud.children.forEach(function(child, index, children) {
      child.rotation.x += child.rotationFactor;
      child.rotation.y += child.rotationFactor;
      child.rotation.z += child.rotationFactor;
    })
    // controls.update();

    renderer.render(scene, camera);
  }
}

webGlBg();

function gui() {
    // add the control panel
    var gui = new dat.GUI();
    var text = {
      textColor: '#000000',
      font: ['adelle sans', 'sharpie', 'bambi']
    }
    // add the backgroundColor control and wait for a change
    gui.addColor(text, 'textColor').onChange(function(){
        // when a change occurs, navigate the DOM to 'body' and update the CSS for the background color
        $(".gui-text").css('color', text.textColor)
    });
    gui.add(text, 'font', ['adelle sans', 'sharpie', 'bambi bold']).onChange(function(){
      $(".gui-text").css('font-family', text.font);
    })
};

Reveal.addEventListener('ready', function(event) {
  $('.backgrounds').after(renderer.domElement);
  $canvas = $('canvas');

  gui();
});

Reveal.addEventListener('slidechanged', function(event) {
  console.log(event);
  var $current = $(event.currentSlide);

  if( $current.is('[data-background]') ) {
    $canvas.addClass('out');
  } else if( $canvas.hasClass('out') ) {
    $canvas.removeClass('out')
  }

  if($current.is('[data-append-iframe]') && window.location.pathname.indexOf('notes') === -1) {
    console.log(window.location.pathname.indexOf('notes'))
    // $('iframe.embed').remove();
    if(!$current.find('iframe').length) {
      $current.css('top', 0);
      $current.append( '<iframe class="embed" src='+ $current.attr('data-append-iframe') +' frameborder="0"></iframe>' );
    }
  }
  if($current.is('[data-kill-iframe]')) {
    // $('iframe.embed').remove();
    // if(!$current.find('iframe').length) {
    //   $current.css('top', 0);
    //   $current.append( '<iframe class="embed" src='+ $current.attr('data-append-iframe') +' frameborder="0"></iframe>' );
    // }
    $('iframe[src="'+ $current.attr('data-kill-iframe') +'"]').remove();
  }

  // for end 
  if($current.is('[data-final-slide]')) {
    $('canvas').addClass('force-visible');
  }

  //for video backgrounds
  if($current.is('[data-background-video]')) {
    $canvas.addClass('out');
    $('.backgrounds video').parent().addClass('video-bg');
  }

  if($current.is('[data-gui-slide]')) {
    $('.dg.ac').addClass('show');
  } else {
    $('.dg.ac').removeClass('show');
  }
  
});

