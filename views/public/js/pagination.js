const buttons = document.getElementsByClassName('page');
console.log(buttons[0].innerText);

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', changePage, false);
}


async function changePage() {
    await fetch('/list/:' + page, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
    });
}