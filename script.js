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
    // console.log(getScrollPercentage()); 
    const scrollPercentage = getScrollPercentage();
    if(scrollPercentage <= 20) {
        sliderStatus = -1;
    } else if(scrollPercentage >= 80) {
        sliderStatus = 1;
    } else {
        sliderStatus = 0;
    } 
    console.log(sliderStatus);
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
        setTimeout(setScrollLeft, 100);
    } else {
        setScrollLeft();
    }
}

function previousSlide() {
    if(currentMainSlider > 0) {
        sliderFullWidth.style.left = '-' + oneMainSliderPositions[--currentMainSlider] + 'px';
        setTimeout(setScrollLeft, 100);
    } else {
        setScrollLeft();
    }
}

function sliderControl() {
    if(sliderStatus === -1) {
        previousSlide();
        sliderStatus = 0;
    } else if(sliderStatus === 1) {
        nextSlide();
        sliderStatus = 0;
    } else if(sliderStatus === 0){
        sliderStatus = 0;
        setScrollLeft();
    }
}

function setScrollLeft() {
    sliderActive.parentElement.scrollTo({
        left: (sliderActive.parentElement.scrollWidth - sliderActive.parentElement.clientWidth) / 2,
        behavior: 'smooth'
      });
}
