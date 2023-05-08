const sliderActive = document.querySelector('.slider-active');

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
}
// const progressBar = document.querySelector('.prog-bar-inner');

let sliderGrabbed = false;

sliderActive.parentElement.addEventListener('scroll', (e) => {
    // progressBar.style.width  = `${getScrollPercentage()}%`
    console.log(getScrollPercentage());
})

sliderActive.addEventListener('mousedown', (e) => {
    sliderGrabbed = true;
    sliderActive.style.cursor = 'grabbing';
})

sliderActive.addEventListener('mouseup', (e) => {
    sliderGrabbed = false;
    sliderActive.style.cursor = 'grab';
})

sliderActive.addEventListener('mouseleave', (e) => {
    sliderGrabbed = false;
})

sliderActive.addEventListener('mousemove', (e) => {
    if(sliderGrabbed){
        sliderActive.parentElement.scrollLeft -= e.movementX;
    }
})

sliderActive.addEventListener('wheel', (e) =>{
    e.preventDefault()
    sliderActive.parentElement.scrollLeft += e.deltaY;
})

function getScrollPercentage(){
   return ((sliderActive.parentElement.scrollLeft / (sliderActive.parentElement.scrollWidth - sliderActive.parentElement.clientWidth) ) * 100);
}