const previousPage = document.getElementById('previousPage'),
    nextPage = document.getElementById('nextPage'),
    plusOne = document.getElementById('plusOne'),
    minusOne = document.getElementById('minusOne'),
    page = document.getElementById('currentPage').innerHTML;

previousPage.addEventListener('click', previous, false);
nextPage.addEventListener('click', next, false);
plusOne.addEventListener('click', next, false);
minusOne.addEventListener('click', previous, false);

if((page - 1) === 0) {
    previousPage.disabled = true;
    minusOne.disabled = true;
}

function previous() {
    currentPage(-1);
}

function next() {
    currentPage(1);
}

function currentPage (page) {
    let currentPage = document.getElementById('currentPage').innerHTML;
    currentPage = Number(currentPage) - 1;    
    page += currentPage
    window.location.href = '/list/' + page;
}

const idBtm = document.getElementById("id");
const id = document.getElementById("searchId");


idBtm.addEventListener("click", search, false);

async function search () {
    try {

        const response = await fetch('/single/' + id.value, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        });
        if (!response.ok) {
          const json = await response.json();
  
          
          throw new Error(json.message);
        }
  
        window.location.href = '/single/' + id.value;
      } catch (e) {
        const  error  = document.getElementById("searchError") 
        error.innerHTML = e;
        console.log(e);
      }
    
}