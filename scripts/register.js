const form = document.querySelector('.form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

form.addEventListener('submit', (event)=>{
    if(validarInput()){
        event.preventDefault();
    }
})


function validarInput(){
    const valorUsername = username.value.trim();
    const valorEmail = email.value.trim();
    const valorSenha = password.value.trim();
    const valorSenha2 = password2.value.trim();
    let errors = 0;

    if(valorUsername === ''){
        setError(username,"O nome de usuário é obrigatório");
        errors += 1;
    } else {
        setCorrect(username);
    }

    if(valorEmail ===''){
        setError(email,"O email é obrigatório");
        errors += 1;
    }else if (!validarEmail(valorEmail)){
        setError(email,"Email inválido");
        errors += 1;
    } else {
        setCorrect(email);
    }

    if(valorSenha === ''){
        setError(password,"A senha é obrigatória");
        errors += 1;
    }else if(!validarSenha(valorSenha)){
        setError(password,'regex');
        errors += 1;
    }else {
        setCorrect(password);
    }

    if(valorSenha2 === ''){
        setError(password2,"Por favor, confirme sua senha");
        errors += 1;
    } else if(valorSenha2 != valorSenha){
        setError(password2,'as senhas não coincidem')
        errors += 1;
    } else {
        setCorrect(password2)
    }

    if (errors > 0) {
        return true
    }
}

function setError(element,errorMessage){
    const formLine = element.parentElement;
    const formLabel = formLine.querySelector('.form-label');
    const formInput = formLine.querySelector('.form-input')
    const errorDisplay = formLine.querySelector('.error-message');

    if(element.id =="password" || errorMessage === 'regex'){
        errorDisplay.innerHTML = "Sua senha precisa conter: <ol><li>- De 8 à 15 caracteres</li><li>- Uma letra minuscula e maiuscula</li><li>- Um numero.</li></ol>";
        errorDisplay.classList.add('error');
    }else{
        errorDisplay.innerText = errorMessage;
        errorDisplay.classList.add('error');
    }

    formInput.classList.remove('correct');
    formInput.classList.add('error');
    formLabel.classList.remove('correct');
    formLabel.classList.add('error');
}

function setCorrect(element){
    const formLine = element.parentElement;
    const formLabel = formLine.querySelector('.form-label');
    const formInput = formLine.querySelector('.form-input')
    const errorDisplay = formLine.querySelector('.error-message');
    errorDisplay.innerText = '';
    formInput.classList.remove('error');
    formInput.classList.add('correct');
    formLabel.classList.remove('error');
    formLabel.classList.add('correct');
}

function validarEmail(email){
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

function validarSenha(senha){
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
    return regex.test(String(senha));
}