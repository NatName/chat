const logoutBtm = document.getElementById("logout");

logoutBtm.addEventListener("click", logout, false);

async function logout (e) {
    e.preventDefault();
    try {
        await fetch('/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          });
        window.location.reload();
    } catch(e) {
        console.log(e);
        
    }

}