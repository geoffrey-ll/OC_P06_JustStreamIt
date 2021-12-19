var locationCarrousel = {};

function initializeLocationTrackingCarrousel (numberCategories) {
    for (let i = 0; i < numberCategories; i ++) {
        locationCarrousel[i] = 0;
    }
}

function moveCarrouselLeft(idButton) {
    let countCategory = idButton.substring(21);
    let carrouselToMove = 
        document.getElementById(`js-carrousel-${countCategory}`);
    if (locationCarrousel[countCategory] < 7 && 
        locationCarrousel[countCategory] > 0) {
        locationCarrousel[countCategory] -= 1;
        let shift = 155 * locationCarrousel[countCategory];
        carrouselToMove.style.right = `${shift}px`;
    }
    opacityArrow(countCategory, locationCarrousel[countCategory]);
}

function moveCarrouselRight(idButton) {
    let countCategory = idButton.substring(22);
    let carrouselToMove = 
        document.getElementById(`js-carrousel-${countCategory}`);
    if (locationCarrousel[countCategory] < 6 ) {
        locationCarrousel[countCategory] += 1;
        let shift = 155 * locationCarrousel[countCategory];
        carrouselToMove.style.right = `${shift}px`;
    }
    opacityArrow(countCategory, locationCarrousel[countCategory]);
}

function opacityArrow(countCategory, locationCarrousel) {
    arrowLeft = 
        document.getElementById(`shift-left-carrousel-${countCategory}`);
    arrowRight = 
        document.getElementById(`shift-right-carrousel-${countCategory}`);
    if (locationCarrousel != 0 && locationCarrousel != 7) {
        arrowLeft.style.opacity = 1;
        arrowRight.style.opacity = 1;
    }
    if (locationCarrousel === 0) {
        arrowLeft.style.opacity = 0.6;
    }
    if (locationCarrousel === 6) {
        arrowRight.style.opacity = 0.6;
    }
}

