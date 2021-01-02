import '../layout/theme.js'

if(window.location.hash == "#recover"){
    document.querySelector("#sign-in").classList.add('hidden');
    document.querySelector("#recover").classList.remove('hidden');
}

document.querySelector(".recover-link").addEventListener('click', (e) => {
    document.querySelector("#sign-in").classList.add('hidden');
    document.querySelector("#recover").classList.remove('hidden');
})