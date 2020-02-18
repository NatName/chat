const sign = document.getElementById("signIn"),
      create = document.getElementById("create");

sign.addEventListener("click", chooseSignIn, false);
create.addEventListener("click", chooseSignIn, false);

function chooseSignIn (e) {
    e.preventDefault();
    const login = document.getElementById('formLogin'),
          register = document.getElementById('formRegister');
    if(register.style.display === 'none') {    
        login.style.display = 'none';
        register.style.display = 'block';
    } else {
        login.style.display = 'block';
        register.style.display = 'none';
    }
    
}

const register = document.getElementById("register");
const login = document.getElementById("login");

register.addEventListener("click", signIn, false);
login.addEventListener("click", signIn, false);

async function signIn (e) {
    e.preventDefault();
    const inputs = document.getElementsByTagName('input');
    let user = {},
        value = e.target.className;

    if(value === 'register') {
      user = {
        email : inputs[0].value,
        username: inputs[1].value,
        password : inputs[2].value
      }
    } else {
      user = {
        username: inputs[3].value,
        password : inputs[4].value
      }
    }
    
    try {

      const response = await fetch('/' + value, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        const json = await response.json();

        
        throw new Error(json.message);
      }

      window.location.reload();
    } catch (e) {
      const  error  = value === 'register' 
      ? document.getElementById("registerError") 
       : document.getElementById("loginError") 
      error.innerHTML = e;
      console.log(e);
    }


}

