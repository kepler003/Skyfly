




// Breakpoints
const sm = 576;
const md = 768;
const lg = 992;
const xl = 1200;

// Duration
const duration_1 = 100;
const duration_2 = 150;
const duration_3 = 200;
const duration_4 = 250;
const duration_5 = 400;
const duration_6 = 600;
const duration_7 = 800;
const duration_8 = 1000;
const duration = duration_3;

// Window width, height
let windowWidth = 0;
let windowHeight = 0;

function updateWindowSize(){
  windowWidth = $(window).width();
  windowHeight = $(window).height();
};

// Update window width, height
$(window).on('scroll resize orientationchange', function(){
  updateWindowSize();
});

// Breakpoint functions
function   up(width, callback){ if($(window).width() >= width) callback(); };
function down(width, callback){ if($(window).width() <  width) callback(); };





//##################################################################################
//##################################################################################
//##################################################################################


////////////////////////////////////////////////////////////// Main functions

// Perform tasks when page loads
$(document).ready(function(){
});

// Perform tasks when click on page
$(document).click(function(event){
});

// Perform tasks on resize, orientationchange, load
$(window).on('load resize orientationchange', function(){
});

// perform tasks on scroll
$(window).on('scroll', function(){
});



// Toggle element's state /* elem, callback */
function toggleState(data){

  // Get elem's state
  const state = $(data.elem).attr('data-state');

  // Change state to oposite
  if(state == 'active'){
    $(data.elem).attr('data-state', 'inactive');

  } else if(state == 'inactive'){
    $(data.elem).attr('data-state', 'active');
  };

  // Callback
  if(data.callback){
    data.callback();
  };
};
  
// Set element's state /* elem, state, callback */
function changeState(data){

  // Set state
  $(data.elem).attr('data-state', data.state);

  // Callback
  if(data.callback){
    data.callback();
  };
};


// Hide element /* elem, callback */
function hideElement(data){

  // Hide element
  $(data.elem).hide();

  // Callback
  if(data.callback){
    data.callback();
  };
};

// Show element /* elem, callback */
function showElement(data){

  // Show element
  $(data.elem).show();

  // Callback
  if(data.callback){
    data.callback();
  };
};

// Toggle element /* elem, animType, callback */
function changeElement(data){

  // Get state
  const state = $(data.elem).attr('data-state');
  const animType = data.animType ? data.animType : 'slide'

  // Toggle element
  if(state == 'active'){

    switch(animType){
      case 'slide':
        $(data.elem).slideDown(duration);
        break;
      case 'fade':
        $(data.elem).fadeIn(duration);
        break;
      case 'immediate':
        $(data.elem).show();
        break;
      default:
        $(data.elem).slideDown(duration);
    };
      
  } else if(state == 'inactive'){
    
    switch(animType){
      case 'slide':
        $(data.elem).slideUp(duration);
        break;
      case 'fade':
        $(data.elem).fadeOut(duration);
        break;
      case 'immediate':
        $(data.elem).hide();
        break;
      default:
        $(data.elem).slideUp(duration);
    };
  };

  // Callback
  if(data.callback){
    data.callback();
  };
};


// Focus on element /* elem */
function focusOnElement(data){
  $(data.elem).focus();
};


// Hide element when clicked outside outside /* event, elem, toggler, animType */
function changeOutside(data){

  if(!data.elem.is(data.event.target) && data.elem.has(data.event.target).length === 0 && 
     !data.toggler.is(data.event.target) && data.toggler.has(data.event.target).length === 0) { 

    changeState({
      elem: data.elem,
      state: 'inactive',
      callback: function(){
        changeElement({
          elem: data.elem,
          animType: data.animType
        });
      }
    })
  };
};




////////////////////////////////////////////////////////////// Header











