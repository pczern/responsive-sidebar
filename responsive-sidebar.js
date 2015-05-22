var objects = 0; // counts number of created objects to create unique @keyframes rules for CSS with the properly width
function Sidebar(sidebar, buttons, options){


  objects = objects + 1; // adds 1 for every created object
  var id = objects; // unique id for this object

  // Assign variables 
  var sidebar = document.querySelectorAll(sidebar)[0];
  var buttons = document.querySelectorAll(buttons);
  var sidebar =  sidebar;
  var buttons = buttons;
  var isOpen = false; // Declares state of sidebar
  var time = 1000;
  var width = '80%';
  var overlayStyles = {};
  var animationTimingFunction = 'ease-in';
  if(options !== undefined){
    if(options.time !== undefined){
      time = options.time;
    }
    if(options.width !== undefined){
      width = options.width;
    }
    if(options.overlayStyles !== undefined){
      overlayStyles = options.overlayStyles;
    }
    if(options.animationTimingFunction !== undefined){
      animationTimingFunction = options.animationTimingFunction;
    }
  }


  // Creates overlay
  var bodyHeight = document.getElementsByTagName('body')[0].offsetHeight + 'px';
  var bodyWidth = document.getElementsByTagName('body')[0].offsetWidth + 'px';
  var overlayParent = document.createElement('div');
  overlayParent.setAttribute('class', 'overlay');

  addStyles(overlayParent,overlayStyles); // Sets customized styles
  // Sets absolute necessary styles to make sure everything works well
  addStyles(
    overlayParent, 
    {
      display: 'none', 
      position: 'absolute', 
      top: '0px', 
      left: '0px', 
      height: bodyHeight, 
      width: bodyWidth
    }
  );

  // Check if animations are supported in the calling browser to provide a fallback if not
  var animation  = false,
    animationstring  = 'animation',
    browserPrefix = '',
    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
    pfx  = '';

  if(sidebar.style.animationName !== undefined )
    {
      animation = true; 
    }
  if( animation === false ) {
    for( var i = 0; i < domPrefixes.length; i++ ) {
      if( sidebar.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
        pfx = domPrefixes[i];
        animationstring = pfx + 'Animation';
        browserPrefix = '-' + pfx.toLowerCase() + '-';
        animation = true;
        break;
      }
    }
  }
  // Adds @Keyframes rules to styles
  var openSidebarKeyframes = '@' + browserPrefix + 'keyframes openSidebar' + id + ' { '+
                    'from {' + browserPrefix + 'transform:translateX( 0px ) }'+
                    'to {' + browserPrefix + 'transform:translateX( ' + width + ' ) }'+
                  '}';
  var closeSidebarKeyframes = '@' + browserPrefix + 'keyframes closeSidebar' + id + ' { '+
                    'from {' + browserPrefix + 'transform:translateX( 0px ) }'+
                    'to {' + browserPrefix + 'transform:translateX( ' + width + ' ) }'+
                  '}';


  var opacity = 0;
  if(overlayStyles.opacity !== undefined){
    opacity = overlayStyles.opacity;
    overlayParent.style[browserPrefix + 'filter'] = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + opacity * 100 + ")"; // Support for IE 8
    
  }
  var fadeInKeyframes = '@' + browserPrefix + 'keyframes fadeInOverlay' + id + ' { '+
                    'from {' + browserPrefix + 'opacity: 0 }'+
                    'to {' + browserPrefix + 'opacity: ' + opacity + '}'+
                  '}'; 
  var fadeOutKeyframes = '@' + browserPrefix + 'keyframes fadeOutOverlay' + id + ' { '+
                    'from {' + browserPrefix + 'opacity: 0 }'+
                    'to {' + browserPrefix + 'opacity: ' + opacity + ' }'+
                  '}';
  if(animation){
    var s = document.createElement( 'style' );
    s.innerHTML = openSidebarKeyframes + ' ' + closeSidebarKeyframes + ' ' + fadeInKeyframes + ' ' + fadeOutKeyframes;
    document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
}


  // Adds overlay
  var body = document.getElementsByTagName('body')[0];
  var overlay = body.appendChild(overlayParent);



  // Method to close the sidebar
  var closeSidebar = function(){
    if(isOpen){ // if sidebar is already closed then don't close it again
      isOpen = false;
      if(animation){  // if animations are supported run @Keyframes
        overlay.style[animationstring] = 'fadeOutOverlay' + id + ' ' + time  + 'ms ' + animationTimingFunction + ' 1 reverse both';
        body.style[animationstring] = 'closeSidebar' + id + ' ' + time + 'ms ' + animationTimingFunction + ' 1 reverse both';
        setTimeout(function(){

          overlay.style.display = 'none';
          addStyles(
            sidebar,
            { 
              marginLeft: '',
              position: '',
              top: '',
              left: '',
              width: '',
              height: '',
              display: ''
            }
          );
        },time)
      }
      else{
        overlay.style.display = 'none';
        sidebar.style.marginLeft = '';
        body.style.marginLeft = '';
        addStyles(
            sidebar,
            { 
              marginLeft: '',
              position: '',
              top: '',
              left: '',
              width: '',
              height: '',
              display: ''
            }
        );
      }
    }
  }


  var openSidebar = function(){
    if(!(isOpen)){
      isOpen = true;
     
      if(animation){
        overlay.style[animationstring] = 'fadeInOverlay' + id + ' ' + time + 'ms ' + animationTimingFunction + ' 1 forwards';
        sidebar.style.marginLeft = '-' + width;
        

        body.style[animationstring] = 'openSidebar' + id + ' ' + time + 'ms ' + animationTimingFunction + ' 1 forwards';

        overlay.style.display = 'block';
         



      
      }else{
        sidebar.style.marginLeft = '0px';
        body.style.marginLeft = width;
        overlay.style.marginLeft = width;
      }
      addStyles(
          sidebar,
          {
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: width,
            height: bodyHeight
          }
      );  
      sidebar.style.display = 'block';
      overlay.style.display = 'block';

    }
  }

  // Assign click listener to overlay that closes the sidebar
  addEventListener(overlay, 'click', closeSidebar);

  var disposeListeners = function(){
    removeEventListener(overlay, 'click', closeSidebar);
    forEach(
      buttons, 
      function(item, i){
        removeEventListener(item, 'click', toggleSidebar);
      }
    );
  }

  var toggleSidebar = function(){
    if (isOpen){
      closeSidebar();
    }else{
      openSidebar();
    }
  }

  // Sets listener that closes and opens sidebar for every button
  forEach(
    buttons, 
    function(item, i){
      addEventListener(item, 'click', toggleSidebar);
    }
  );

  // Add class to identify sidebars
  addClass(sidebar, 'my-sidebar');
  
  this.close = closeSidebar;
  this.open = openSidebar;
  this.dispose = disposeListeners;
  
}


// addClass function
function addClass(element, className){
   if (element.classList)
    element.classList.add(className);
  else
    element.className += ' ' + className;
}


// event listener methods that adds support for old browsers
function addEventListener(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
  } else if(el.attachEvent){
    el.attachEvent('on' + eventName, function(){
      handler.call(el);
    });
  }
}
function removeEventListener(el, eventName, handler) {
  if (el.removeEventListener)
    el.removeEventListener(eventName, handler);
  else if (el.detachEvent)
    el.detachEvent('on' + eventName, handler);
}


// forEach loop function to support old browsers
function forEach(array, fn) {
  for (i = 0; i < array.length; i++)
    fn(array[i], i);
}

// function to add styles fast and easy with object literal
function addStyles(element, styles){
  for (var i in styles) {
    if (styles.hasOwnProperty(i)) {
      element.style[i] = styles[i];
    }
  }
}
