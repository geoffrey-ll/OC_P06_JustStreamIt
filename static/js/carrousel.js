var locationCarrousel = {};

function initializeLocationTrackingCarrousel () {
for (let i=0; i < 4; i++) {
    locationCarrousel[i] = 0;
    };
};

function moveCarrouselLeft(idButton) {
    let countCategory = idButton.substring(21);
    let carrouselToMove = 
        document.getElementById(`js-carrousel-${countCategory}`);
    if (locationCarrousel[countCategory] < 7 && 
        locationCarrousel[countCategory] > 0) {
        locationCarrousel[countCategory] -= 1;
        let shift = 155 * locationCarrousel[countCategory];
        carrouselToMove.style.right = `${shift}px`;
    };
};

function moveCarrouselRight(idButton) {
    let countCategory = idButton.substring(22);
    let carrouselToMove = 
        document.getElementById(`js-carrousel-${countCategory}`);
    if (locationCarrousel[countCategory] < 6 ) {
        locationCarrousel[countCategory] += 1;
        let shift = 155 * locationCarrousel[countCategory];
        carrouselToMove.style.right = `${shift}px`;
    };
};
