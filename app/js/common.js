//  Pop-Up

let moreBtn = document.querySelectorAll('.work_item .more'),
    popUp = document.querySelector('#work_item__pop-up');

console.log(moreBtn);


moreBtn.forEach(getInfo);

function getInfo(item) {
    item.addEventListener('click', function () {

        console.log(popUp);
        popUp.style.display = 'block'

        let workTitle = item.closest('div.hidden_desc').children[0].innerHTML;
        console.log(workTitle);

        let popUpTitle = document.querySelectorAll('.top_link a');
        popUpTitle[0].innerHTML = workTitle;

    })
}


//  End Pop-Up

