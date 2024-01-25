const principalTextarea = document.getElementById("principal__textarea");
const btnCriptografar = document.getElementById("btn__criptografar");
const btnDescriptografar = document.getElementById("btn__descriptografar");
const sectionResultado = document.getElementById("resultado");
sectionResultado.appendChild(criarMensagemNaoEncontrado());

btnCriptografar.addEventListener("click", () => {

    if (principalTextarea.value === "") {
        mostrarMensagemVazio();
    } else {
        mostrarMensagemResultado();
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

function mostrarMensagemResultado() {
    const resultadoEmpty = document.getElementById("resultado__mensagem__empty");
    const resultadoText = document.getElementById("resultado__textarea");
    if (resultadoEmpty) {
        sectionResultado.removeChild(resultadoEmpty);
    }
    if (!resultadoText) {
        sectionResultado.appendChild(criarMensagemResultado(principalTextarea.value));
        sectionResultado.appendChild(criarButtonCopiar());
    } else {
        resultadoText.textContent = principalTextarea.value;
    }
}

function criarButtonCopiar() {
    const btnCopiar = document.createElement("button");
    btnCopiar.setAttribute("type", "button");
    btnCopiar.setAttribute("id", "btn__copiar");
    btnCopiar.innerText = "Copiar";

    return btnCopiar;
}

function criarMensagemResultado(texto) {
    const resultadoText = document.createElement("textarea");
    resultadoText.setAttribute("id", "resultado__textarea");
    resultadoText.disabled = true;
    resultadoText.textContent = texto;

    return resultadoText;
}

function criarMensagemNaoEncontrado() {
    const resultadoEmpty = document.createElement("div");
    resultadoEmpty.setAttribute("id", "resultado__mensagem__empty");

    const img = document.createElement("img");
    img.setAttribute("src", "./assets/img/empty.svg");
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