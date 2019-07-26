// ***** Scroll to anchor *****


// ***** End scroll to anchor *****

//***** Pop-Up *****

let moreBtn = document.querySelectorAll('.work_item .more'),
    popUp   = document.querySelector('#work_item__pop-up');

moreBtn.forEach(function getInfo(item) {
    item.addEventListener('click', function () {

        openPopUp();

        let popUpTitle = document.querySelector('#work_item__pop-up .top_link a'),
            popUpDesc  = document.querySelector('#work_item__pop-up .desc'),
            popUpImg   = document.querySelector('.img_col'),
            popUp      = document.querySelectorAll('#work_item__pop-up');

        popUpTitle.innerHTML = item.closest('.hidden_desc').children[0].innerHTML;
        popUpDesc.innerHTML  = item.closest('.hidden_desc').children[1].innerHTML + item.closest('.hidden_desc').children[2].outerHTML;
        popUpImg.innerHTML = item.closest('.work_item').children[0].outerHTML;
        popUp[0].children[0].children[2].children[0].childNodes[0].attributes[0].nodeValue = item.closest('.hidden_desc').children[3].children[1].attributes[0].nodeValue;

        closePopUp();

    })
});

function openPopUp() {
    popUp.classList.add('open');
    document.querySelector('body').classList.add('open_pop-up');
}

function closePopUp() {
    let closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', function () {
        popUp.classList.remove('open');
        document.querySelector('body').classList.remove('open_pop-up');
    })
}

//***** End Pop-Up *****



function move() {
    let widthBar = 0;
    let loadBar = setInterval(photoshop,  20);
    function photoshop() {
        widthBar >= 70 ? clearInterval(loadBar) : (widthBar++) + (document.querySelector('#photoshop .bar').style.width = widthBar + '%');
        widthBar >= 10 ? clearInterval(loadBar) : (widthBar++) + (document.querySelector('#illustrator .bar').style.width = widthBar + '%');
    }
}

move();





