const principalTextarea = document.getElementById("principal__textarea");
const btnCriptografar = document.getElementById("btn__criptografar");
const btnDescriptografar = document.getElementById("btn__descriptografar");
const sectionResultado = document.getElementById("resultado");
const themeSwitch = document.getElementById("switch");
let themeDarck = localStorage.getItem("theme");

sectionResultado.appendChild(criarMensagemNaoEncontrado());

themeSwitch.addEventListener("change",(event)=>{
    if(themeDarck){
        liteTheme();
    }else{
        darkTheme();
    }
});

btnCriptografar.addEventListener("click", () => {
    const texto = principalTextarea.value;

    if (texto === "") {
        mostrarMensagemVazio();
    } else {
        mostrarMensagemCriptografado();
    }
});

btnDescriptografar.addEventListener("click", () => {
    const texto = principalTextarea.value;

    if (texto === "") {
        mostrarMensagemVazio();
    } else {
        mostrarMensagemDescriptografado();
    }
});

function mostrarMensagemVazio() {
    const resultadoText = document.getElementById("resultado__textarea");
    const resultadoEmpty = document.getElementById("resultado__mensagem__empty");
    const btnCopiar = document.getElementById("btn__copiar");
    if (resultadoText) {
        sectionResultado.removeChild(resultadoText);
        sectionResultado.removeChild(btnCopiar);
    }
    if (!resultadoEmpty) {
        sectionResultado.appendChild(criarMensagemNaoEncontrado());
    }
}

function mostrarMensagemCriptografado() {
    const resultadoEmpty = document.getElementById("resultado__mensagem__empty");
    const resultadoText = document.getElementById("resultado__textarea");
    const texto = principalTextarea.value;
    const textoCriptografado = criptografarTexto(texto);
    if (resultadoEmpty) {
        sectionResultado.removeChild(resultadoEmpty);
    }
    if (!resultadoText) {
        sectionResultado.appendChild(criarMensagemResultado(textoCriptografado));
        sectionResultado.appendChild(criarButtonCopiar());
    } else {
        resultadoText.textContent = textoCriptografado;
    }
    principalTextarea.value = "";
}

function mostrarMensagemDescriptografado() {
    const resultadoEmpty = document.getElementById("resultado__mensagem__empty");
    const resultadoText = document.getElementById("resultado__textarea");
    const texto = principalTextarea.value;
    const textoDescriptografado = descriptografar(texto);
    if (resultadoEmpty) {
        sectionResultado.removeChild(resultadoEmpty);
    }
    if (!resultadoText) {
        sectionResultado.appendChild(criarMensagemResultado(textoDescriptografado));
        sectionResultado.appendChild(criarButtonCopiar());
    } else {
        resultadoText.textContent = textoDescriptografado;
    }
    principalTextarea.value = "";
}

function criarButtonCopiar() {
    const btnCopiar = document.createElement("button");
    btnCopiar.setAttribute("type", "button");
    btnCopiar.setAttribute("id", "btn__copiar");
    btnCopiar.innerText = "Copiar";
    btnCopiar.addEventListener("click", () => {
        copiarParaAreaDeTranferencia();
    });

    return btnCopiar;
}

function criarMensagemResultado(textoCriptografado) {
    const resultadoText = document.createElement("textarea");
    resultadoText.setAttribute("id", "resultado__textarea");
    resultadoText.disabled = true;
    resultadoText.textContent = textoCriptografado;

    return resultadoText;
}

function criarMensagemNaoEncontrado() {
    const resultadoEmpty = document.createElement("div");
    resultadoEmpty.setAttribute("id", "resultado__mensagem__empty");

    const img = document.createElement("img");
    if(themeDarck){
        themeSwitch.checked = true;
        darkTheme();
        img.setAttribute("src", "./assets/img/empty-dark.svg");
    }else{
        themeSwitch.checked = false;
        liteTheme();
        img.setAttribute("src", "./assets/img/empty-lite.svg");
    }
    img.setAttribute("alt", "Imagem de não encontrado");

    const h2 = document.createElement("h2");
    h2.textContent = "Nenhuma mensagem encontrada";

    const p = document.createElement("p");
    p.innerText = "Digite um texto que você deseja criptografar ou descriptografar.";

    resultadoEmpty.appendChild(img);
    resultadoEmpty.appendChild(h2);
    resultadoEmpty.appendChild(p);

    return resultadoEmpty;
}

function criptografarTexto(texto) {

    const textoCriptografado = texto
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
    return textoCriptografado;
}

function descriptografar(texto) {

    const textoDescriptografado = texto
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
    return textoDescriptografado;
}

function copiarParaAreaDeTranferencia() {
    const texto = document.getElementById("resultado__textarea").value;
    const mensagem = document.getElementById("mensagem_area_de_tranferencia");
    navigator.clipboard.writeText(texto).then(function () {
        mensagem.innerText = "Copiado para a área de transferência.";
        mensagem.style.opacity = 1;
        setTimeout(() => { mensagem.style.opacity = 0 }, 1000);
    }).catch(function (erro) {
        mensagem.innerText = "Erro ao copiar para a área de transferência.";
        mensagem.style.opacity = 1;
        setTimeout(() => { mensagem.style.opacity = 0 }, 1000);
    });
}

function darkTheme() {
    localStorage.setItem("theme", "themeDarck");
    themeDarck = true;
    const img = document.querySelector("#resultado__mensagem__empty > img");
    if(img){
        img.setAttribute("src", "./assets/img/empty-dark.svg");
    }

    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--primary-color', '#20200F');
    rootStyle.setProperty('--text-primary-color',' #FFFFFF');
    rootStyle.setProperty('--secondary-color', '#939F93');
    rootStyle.setProperty('--tertiary-color', '#4F4C4C');
    rootStyle.setProperty('--button-secondary-color', '#C2CFC2');
    rootStyle.setProperty('--button-primary-hover-color', '#9F9393');
    rootStyle.setProperty('--text-resultado-color', '#fff');
    rootStyle.setProperty('--text-secondary-color', '#fff');
}

function liteTheme(){
    localStorage.removeItem("theme","themeDarck");
    themeDarck = false;
    const img = document.querySelector("#resultado__mensagem__empty > img");
    if(img){
        img.setAttribute("src", "./assets/img/empty-lite.svg");
    }
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--primary-color', '#0A3871');
    rootStyle.setProperty('--text-primary-color',' #FFFFFF');
    rootStyle.setProperty('--secondary-color', '#F3F5FC');
    rootStyle.setProperty('--tertiary-color', '#FFFFFF');
    rootStyle.setProperty('--button-secondary-color', '#D8DFE8');
    rootStyle.setProperty('--button-primary-hover-color', '#2a578b');
    rootStyle.setProperty('--text-resultado-color', '#495057');
    rootStyle.setProperty('--text-secondary-color', '#000000');
}