// ***** Scroll to anchor *****
// ***** End scroll to anchor *****


//***** Pop-Up *****
let moreBtn = document.querySelectorAll('.work_item .more'),
    popUp = document.querySelector('#work_item__pop-up');

moreBtn.forEach(item => {
    item.addEventListener('click', function () {

        openPopUp();

        let popUpTitle = document.querySelector('#work_item__pop-up .top_link a'),
            popUpDesc = document.querySelector('#work_item__pop-up .desc'),
            popUpImg = document.querySelector('.img_col'),
            popUp = document.querySelectorAll('#work_item__pop-up');

        popUpTitle.innerHTML = item.closest('.hidden_desc').children[0].innerHTML;
        popUpDesc.innerHTML = item.closest('.hidden_desc').children[1].innerHTML + item.closest('.hidden_desc').children[2].outerHTML;
        popUpImg.innerHTML = item.closest('.work_item').children[0].outerHTML;
        popUp[0].children[0].children[2].children[0].childNodes[0].attributes[0].nodeValue = item.closest('.hidden_desc').children[3].children[1].attributes[0].nodeValue;

        closePopUp();

    })
});

const openPopUp = () => {
    popUp.className = 'open';
    document.querySelector('body').className = 'open_pop-up';
};

const closePopUp = (closeBtn) => {
    closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', function () {
        popUp.className = '';
        document.querySelector('body').className = '';
    })
};
//***** End Pop-Up *****


//***** Progress Bar *****
const progressBar = (width) => {
    width = 0;

    let movePhotoshop = setInterval(() => {
        width >= 50 ? clearInterval(movePhotoshop) : width++ + (document.querySelector('#photoshop .bar').style.width = width + '%');
    }, 20);

    let moveIllustrator = setInterval(() => {
        width >= 25 ? clearInterval(moveIllustrator) : width++ + (document.querySelector('#illustrator .bar').style.width = width + '%');
    }, 20);

    let moveHtml = setInterval(() => {
        width >= 70 ? clearInterval(moveHtml) : width++ + (document.querySelector('#html .bar').style.width = width + '%');
    }, 20);

    let moveCss = setInterval(() => {
        width >= 70 ? clearInterval(moveCss) : width++ + (document.querySelector('#css .bar').style.width = width + '%');
    }, 20);

};
//***** End Progress Bar *****


//***** Animation Title *****
const animTitle = (margin) => {
    margin = -60;

    let titleRight = document.querySelectorAll('h2.right'),
        titleLeft = document.querySelectorAll('h2.left');


    titleRight.forEach(function (item) {
        let titleRightMove = (setInterval(function () {
            margin >= 0 ? clearInterval(titleRightMove) : margin++ + (item.style.marginRight = margin + 'px');
        }, 10));
    });
    titleLeft.forEach(function (item) {
        let titleLeftMove = (setInterval(function () {
            margin >= 0 ? clearInterval(titleLeftMove) : margin++ + (item.style.marginLeft = margin + 'px');
        }, 10));
    });

};
//***** End Animation Title *****


//***** Visible Element *****
//***** End Visible Element *****

//***** Contact Form *****
let input = document.querySelectorAll('input'),
    textarea = document.querySelectorAll('textarea'),
    submitBtn = document.querySelector('#submit');

const focusInput = item => {
    item.addEventListener('focus', function () {
        item.parentElement.className = 'active';
    });
    item.addEventListener('focusout', function () {
        if (item.value === '') item.parentElement.className = '';
    });
};

input.forEach(focusInput);
textarea.forEach(focusInput);

const validate = item => {
    (item.value === '') ? item.parentElement.className = 'error' : submitBtn.className = '';
};

submitBtn.addEventListener('mouseover', function () {
    input.forEach(validate);
    textarea.forEach(validate);
});
//***** Contact Form *****


setTimeout(animTitle, 2000);
setTimeout(progressBar, 2000);


