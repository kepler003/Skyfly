




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




////////////////////////////////////////////////////////////// Carousel

// Perform tasks when page loads
$(document).ready(function(){
  
  // Prepare carousels
  prepareCarousels();
});

// Update carousel when nav btn clicked
$('.carousel__btn').click(function(){
  
  // Update carousel when carousel's nav btn clicked
  updateCarouselOnNav({btn: $(this)});
});

// Update carousel when nav dot clicked
$(document).on('click', '.carousel__dot', function(e){

  updateCarouselOnDot({ dot: $(this) });
});



// Prepare carousels
function prepareCarousels(){
  
  // Get carousels
  let carousels = $('.carousel');
  
  // Stop function if no carousels on page
  if(carousels.length == 0) return;
  
  // Loop through carousels
  for(let i = 0; i < carousels.length; i++){

    // Get singele carousel
    let carousel = carousels[i];
    
    // Get single carousel's items
    let items = $(carousel).children('.carousel__item');

    // Go to next iteration if carousel has no items
    if(items.length == 0) continue;

    // Loop through items
    for(let j = 0; j < items.length; j++){

      // Get single item
      let item = items[j];
        
      // Find carousel dots box
      let dots = $(carousel).find('.carousel__dots');

      // Prepare item
      prepareItem({
        item: item,
        index: j
      });

      // Prepare carousel dots
      prepareDots({
        dots: dots,
        index: j
      });
    };
  };
};

// Update carousel when nav btn clicked
function updateCarouselOnNav(data){

  // Get difference
  const dif = (function(){
    if($(data.btn).hasClass('carousel__btn--right')) return -1;
    if($(data.btn).hasClass('carousel__btn--left')) return 1;
  })();

  // Get carousel items
  let items = $(data.btn).parents('.carousel').children('.carousel__item');

  // Check if items is an empty array
  if(items.length == 0) return;

  // If clicked left check if first item in carousel is active
  if(dif == 1 && $(items[0]).attr('data-index') == 0) return;
  
  // If clicked right check if last item in carousel is active
  if(dif == -1 && $(items[items.length - 1]).attr('data-index') == 0) return;

  // Loop through items
  for(let i = 0; i < items.length; i++){

    // Get single item
    let item = items[i];

    let dot = ($(data.btn).parents('.carousel').find('.carousel__dot'))[i];

    // Update item
    updateItem({
      item: item,
      dif: dif,
      duration: parseInt($(data.btn).parents('.carousel').attr('data-duration'), 10)
    });

    // Update dots
    updateDot({
      dot: dot,
      dif: dif,
      firstIndex: $(items[0]).attr('data-index')
    });
  };
};

// Update carousel when nav dot clicked
function updateCarouselOnDot(data){

  // Stop function if active dot was clicked
  if($(data.dot).hasClass('active')) return;

  // Get data
  const index = parseInt($(data.dot).attr('data-index'), 10);
  const carousel = $(data.dot).parents('.carousel');
  const items = $(carousel).find('.carousel__item');
  const dots = $(carousel).find('.carousel__dot');
  const oldIndex = parseInt(
    $(carousel)
    .find('.carousel__dots')
    .find('.active')
    .attr('data-index')
    , 10);
  const dif = oldIndex - index;
  const duration = $(carousel).attr('data-duration') ? $(carousel).attr('data-duration') : 400;
  
  for(let i = 0; i < items.length; i++){

    let item = items[i];
    let dot = dots[i];

    updateItem({
      item: item,
      dif: dif,
      duration: duration
    });

    updateDot({
      dot: dot,
      dif: dif
    });
  };
};

// Prepare item
function prepareItem(data){

  // Go to next iteration if item has proper index
  if($(data.item).attr('data-index') == data.index) return;
  
  // Give item a proper index
  $(data.item).attr('data-index', data.index);

  // Give item an active class if data-index == 0
  if(data.index == 0) $(data.item).addClass('active');
};

// Prepare dots
function prepareDots(data){

  // Create dot
  let dot = $('<button type="button" class="carousel__dot" data-index="' + data.index + '"></button>');

  // Add carousel dots
  if(data.dots) $(data.dots).append(dot);

  // If index == 0 add active class
  if(data.index == 0) $(dot).addClass('active');
};

// Update item /* item, dif, duration */
function updateItem(data){
  
  // Get data
  const index = parseInt($(data.item).attr('data-index'), 10);
  const width = $(data.item).outerWidth();
  const duration = data.duration ? data.duration : 400;
  const items = $(data.item).parent().children('.carousel__item');
  const newIndex = index + data.dif;

  // Give item proper opacity transition time and easing
  $(data.item).css({
    transition: 'opacity ' + duration + 'ms ease-in-out'
  });

  // Update index
  $(data.item).attr('data-index', index + data.dif);
  
  // Get first item's index
  const firstIndex = parseInt($(items[0]).attr('data-index'), 10);

  // Add/delete active class
  if(newIndex == 0) $(data.item).addClass('active');
  if(newIndex != 0) $(data.item).removeClass('active');

  // Translate item
  $(data.item).animate({
    'left': (firstIndex * width) + 'px'
  }, data.duration ? data.duration : 400);
};

// Update dots /* dot, dif */
function updateDot(data){

  // Get data
  const index = parseInt($(data.dot).attr('data-index'), 10);
  const newIndex = index + data.dif;

  // Give dot a proper opacity transition time and easing
  $(data.dot).css({
    transition: '150ms ease-in-out'
  });

  // Update index
  $(data.dot).attr('data-index', newIndex);

  // Add/delete active class
  if(newIndex == 0) $(data.dot).addClass('active');
  if(newIndex != 0) $(data.dot).removeClass('active');
};













