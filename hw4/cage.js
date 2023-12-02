let imagesLoaded = 0;

//presses should always be between 0 and 3
let carouselPresses = 0;
const carousel = document.querySelector("#carousel");

function onLoad(event) {
    imagesLoaded++;
    if(imagesLoaded === 5) {
        document.querySelector('#carousel').classList.remove('loading')
        const imgs = document.querySelectorAll('img')
        for (let i=0; i<imgs; i++) {
            imgs[i].removeEventListener("load", onLoad)
        }
    }
}

for(let i = 0; i < 5; i++) {
    const img = document.createElement('img');
    img.src = 'https://www.placecage.com/gif/200/200'
    img.addEventListener('load', onLoad)
    //append
    document.querySelector("#carousel").append(img);
}

document.querySelector('#previous').addEventListener('click', function() {
    if (carouselPresses > 0) {
        carouselPresses--;
        calculateTransforms(carouselPresses);
    }
})

document.querySelector('#next').addEventListener('click', function() {
    if (carouselPresses < 4) {
        carouselPresses++;
        calculateTransforms(carouselPresses);
    }
})

const calculateTransforms = (presses) => {
    let value = presses * -200;
    carousel.style.transform = `translateX(${value}px)`;
  };
  