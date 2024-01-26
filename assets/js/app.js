const principalTextarea = document.getElementById("principal__textarea");
const btnCriptografar = document.getElementById("btn__criptografar");
const btnDescriptografar = document.getElementById("btn__descriptografar");
const sectionResultado = document.getElementById("resultado");
sectionResultado.appendChild(criarMensagemNaoEncontrado());

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
    navigator.clipboard.writeText(texto).then(function () {
        console.log('Texto copiado para a área de transferência');
    }).catch(function (erro) {
        console.error('Erro ao copiar para a área de transferência', erro);
    });
}

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