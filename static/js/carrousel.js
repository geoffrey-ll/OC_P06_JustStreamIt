var countClick = 0;

function moveCarrouselLeft(idButton) {
    let countCategory = idButton.substring(13);
    let carrouselToMove = document.getElementById(`carrousel${countCategory}`);
    if (countClick < 7 && countClick > 0) {
        countClick -= 1;
        let shift = 155 * countClick;
        carrouselToMove.style.right = `${shift}px`;
    };
};

function moveCarrouselRight(idButton) {
    let countCategory = idButton.substring(14);
    let carrouselToMove = document.getElementById(`carrousel${countCategory}`);
    if (countClick < 6 ) {
        countClick += 1;
        let shift = 155 * countClick;
        carrouselToMove.style.right = `${shift}px`;
    };
};
