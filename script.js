const mainSliderArr = ['1', '2', '3', '4', '5'];

const sliderActive = document.querySelector('.slider-active');

let oneMainSliderWidth;
//podesavanja za mobilni
const sliderContainer = document.querySelector('.slider-container');
const sliderFullWidth = document.querySelector('.slider-container .slider-fullwidth');
const sliderSlide = document.querySelectorAll('.slider-container .slide');
const slidesArr = Array.from(sliderSlide);

if (window.innerWidth < 768) {
    sliderFullWidth.style.paddingLeft = (sliderActive.offsetWidth - window.innerWidth) / 1.33 + 'px';
    sliderFullWidth.style.paddingLeft = (sliderActive.offsetWidth - window.innerWidth) / 1.33 + 'px';

    slidesArr.forEach(element => {
        element.style.width = window.innerWidth + 'px';
    });
    oneMainSliderWidth = window.innerWidth;
} else if(window.innerWidth < 1024) {
    oneMainSliderWidth = 768;
} else if(window.innerWidth < 1280) {
    oneMainSliderWidth = 1024;
} else {
    oneMainSliderWidth = 1280;
}
// console.log(oneMainSliderWidth);

const oneMainSliderPositions = [0];

for(let i = 1; i < 5; i++) {
    oneMainSliderPositions.push(oneMainSliderPositions[i - 1] + oneMainSliderWidth);
}
// console.log(oneMainSliderPositions);

let currentMainSlider = 0;
let sliderGrabbed = false;
let sliderStatus = 0;
sliderContainer.scrollLeft = (sliderActive.parentElement.scrollWidth - sliderActive.parentElement.clientWidth) / 2;

sliderActive.parentElement.addEventListener('scroll', (e) => {
    console.log(getScrollPercentage()); 
    console.log('scroll width' + sliderActive.parentElement.scrollWidth);
    console.log('client width' + sliderActive.parentElement.clientWidth);
    console.log('scroll left' + sliderActive.parentElement.scrollLeft);
    const scrollPercentage = getScrollPercentage();
    if(scrollPercentage == 0) {
        sliderStatus = -1;
    } else if(scrollPercentage == 100) {
        sliderStatus = 1;
    } else {
        sliderStatus = 0;
    } 
});

sliderActive.addEventListener('mousedown', (e) => {
    sliderGrabbed = true;
    sliderActive.style.cursor = 'grabbing';
})

sliderActive.addEventListener('mouseup', (e) => {
    sliderGrabbed = false;
    sliderActive.style.cursor = 'grab';
    sliderControl();
})

sliderActive.addEventListener('mouseleave', (e) => {
    sliderGrabbed = false;
    sliderControl();
})

sliderActive.addEventListener('mousemove', (e) => {
    if(sliderGrabbed){
        sliderActive.parentElement.scrollLeft -= e.movementX;
    }
})

sliderActive.addEventListener('touchstart', (e) => {
    sliderGrabbed = true;
});

sliderActive.addEventListener('touchmove', (e) => {
   
});

sliderActive.addEventListener('touchcancel', (e) => {
    sliderGrabbed = false;
    sliderControl();
});

sliderActive.addEventListener('touchend', (e) => {
    sliderGrabbed = false;
    sliderControl();
});

function getScrollPercentage(){
   return ((sliderActive.parentElement.scrollLeft / (sliderActive.parentElement.scrollWidth - sliderActive.parentElement.clientWidth) ) * 100);
}



function nextSlide() { 
    if(currentMainSlider < 5) {
        sliderFullWidth.style.left = '-' + oneMainSliderPositions[++currentMainSlider] + 'px';
        // setScrollLeft();
    }
}

function previousSlide() {
    if(currentMainSlider > 0) {
        sliderFullWidth.style.left = '-' + oneMainSliderPositions[--currentMainSlider] + 'px';
        // setScrollLeft();
    }
}


function sliderControl() {
    if(sliderStatus === -1) {
        previousSlide();
        setScrollLeft();
        sliderStatus = 0;
    } else if(sliderStatus === 1) {
        nextSlide();
        setScrollLeft();
        // sliderContainer.scrollLeft = (sliderActive.parentElement.scrollWidth - sliderActive.parentElement.clientWidth) / 2;
        sliderStatus = 0;
    } else if(sliderStatus === 0){
        sliderStatus = 0;
        setScrollLeft();
        // sliderContainer.scrollLeft = (sliderActive.parentElement.scrollWidth - sliderActive.parentElement.clientWidth) / 2;
    }
}

function setScrollLeft() {
    sliderActive.parentElement.scrollTo({
        left: (sliderActive.parentElement.scrollWidth - sliderActive.parentElement.clientWidth) / 2,
        behavior: 'smooth'
      });
}

// const element = document.getElementById('yourElementId');
// const scrollAmount = 200; // The amount of scroll in pixels
// const scrollDuration = 1000; // The duration of the scroll animation in milliseconds

// const startPosition = element.scrollLeft;
// const targetPosition = startPosition - scrollAmount;

// const startTime = performance.now();
// function scrollHorizontally(timestamp) {
//   const elapsed = timestamp - startTime;
//   const progress = Math.min(elapsed / scrollDuration, 1);
//   const currentPosition = startPosition - (scrollAmount * progress);

//   element.scrollTo(currentPosition, 0);

//   if (progress < 1) {
//     requestAnimationFrame(scrollHorizontally);
//   }
// }

// requestAnimationFrame(scrollHorizontally);

// function setScrollLeft() {
//     //sliderActive.parentElement.scrollLeft
// }