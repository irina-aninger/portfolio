// ***** Show work items *****
let workItem = document.querySelectorAll('.work_item'),
    loadItem = document.querySelector('#more_items');

let activeItem = () => {
    for (let i = 0; i < 9; i++) {
        workItem[i].className += ' visible';
    }
};

activeItem();

let showItem = () => {
    for (let i = 9; i < workItem.length; i++) {
        workItem[i].classList.toggle('visible');
    }
    loadItem.classList.toggle('open');
};

loadItem.addEventListener('click', showItem);

//***** Pop-Up *****
let createPopUp = () => {
    let popUp = document.createElement('div');
    popUp.setAttribute('id', 'work_item__pop-up');
    popUp.innerHTML = `
    <div class="pop-up__wrapper">
        <div class="close"></div>
        <div class="img_col"><img src="" alt=""></div>
          <div class="info_col">
            <div class="top_link"><a href="" target="_blank"></a></div>
            <div class="desc">
              <p></p>
              <div class="tags">
                <ul>
                </ul>
              </div>
          </div>
        </div>
      </div>`;

    document.querySelector('footer').appendChild(popUp);
};

createPopUp();

let moreBtn = document.querySelectorAll('.work_item .more'),
    popUp = document.querySelector('#work_item__pop-up'),
    popUpTitle = document.querySelector('#work_item__pop-up .top_link a'),
    popUpTitle2 = document.querySelectorAll('#work_item__pop-up .top_link a'),
    popUpDesc = document.querySelectorAll('#work_item__pop-up .desc p'),
    popUpTags = document.querySelector('#work_item__pop-up .tags ul'),
    popUpImg = document.querySelectorAll('#work_item__pop-up img');

moreBtn.forEach(item => {
    item.addEventListener('click', function (e) {

        e.preventDefault();

        popUpTags.innerHTML = '';

        openPopUp();

        let attrItem = item.closest('.work_item').getAttribute('data-name'),
            a = dataItem[attrItem];

        console.log(popUpTitle2);

        popUpTitle.innerHTML = a.title;
        popUpTitle.attributes[0].nodeValue = a.link;
        popUpDesc[0].innerHTML = a.desc;
        popUpImg[0].attributes[0].nodeValue = a.image;

        for (let i = 0; i < a.tags.length; i++) {
            let tagsItem = document.createElement('li');
            tagsItem.innerHTML = a.tags[i];
            popUpTags.appendChild(tagsItem);
        }

        closePopUp();

    })
});

let openPopUp = () => {
    popUp.className = 'open';
    document.querySelector('body').className = 'open_pop-up';
};

let closePopUp = (closeBtn) => {
    closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', function () {
        popUp.className = '';
        document.querySelector('body').className = '';
    })
};

//***** Contact Form *****
// let input = document.querySelectorAll('input'),
//     textarea = document.querySelectorAll('textarea'),
//     submitBtn = document.querySelector('#submit');
//
// let focusInput = item => {
//     item.addEventListener('focus', function () {
//         item.parentElement.className = 'active';
//     });
//
//     item.addEventListener('focusout', function () {
//         if (item.value === '') item.parentElement.className = '';
//     });
// };
//
// input.forEach(focusInput);
// textarea.forEach(focusInput);
//
// let validate = item => {
//     (item.value === '') ? item.parentElement.className = 'error' : submitBtn.className = '';
// };
//
// submitBtn.addEventListener('click', function () {
//     input.forEach(validate);
//     textarea.forEach(validate);
// });

//***** Animation with scroll *****
let title       = document.querySelectorAll('h2'),
    moreButton       = document.querySelectorAll('#more_items'),
    progressBar = document.querySelectorAll('.bar'),
    experienceDesc = document.querySelectorAll('.experience_item .desc'),
    section     = document.querySelectorAll('section');

section[0].classList.add('active');


document.addEventListener('scroll', () => {

    section.forEach(item => {
        if (item.getBoundingClientRect().top > 0 && item.getBoundingClientRect().top <= window.innerHeight/1.2) {
            item.classList.add('active');
        }
    });

    let animate = item => {
        if (item.getBoundingClientRect().top > 0 && item.getBoundingClientRect().top <= window.innerHeight/1.2) {
            item.classList.add('active');
        }
    };

    title.forEach(animate);
    moreButton.forEach(animate);
    experienceDesc.forEach(animate);
    progressBar.forEach(animate);

    let header = document.querySelector('header'),
        footer = document.querySelector('footer');

    if (window.pageYOffset >= footer.clientHeight/4) {
        // header.classList.add('active');
        // footer.classList.add('active');
    } else {
        // header.classList.remove('active');
        // footer.classList.remove('active');
    }
    console.log(window.pageYOffset);
});

window.onload = setTimeout(() => {
    let textBanner = document.querySelector('.txt_block');
    textBanner.classList.add('active')
}, 1500);















