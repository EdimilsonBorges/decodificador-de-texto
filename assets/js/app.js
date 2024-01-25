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
    const arrayLetras = [...texto];
    const textoCriptografado = arrayLetras.map((letra) => {
        const criptografia = [];

        switch (letra) {
            case "e":
                criptografia.push("enter");
                break;
            case "i":
                criptografia.push("imes");
                break;
            case "a":
                criptografia.push("ai");
                break;
            case "o":
                criptografia.push("ober");
                break;
            case "u":
                criptografia.push("ufat");
                break;

            default:
                criptografia.push(letra);
                break;
        }

        return criptografia;
    });

    return textoCriptografado.join("");

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
    if (resultadoEmpty) {
        sectionResultado.removeChild(resultadoEmpty);
    }
    if (!resultadoText) {
        sectionResultado.appendChild(criarMensagemResultado(criptografarTexto(texto)));
        sectionResultado.appendChild(criarButtonCopiar());
    } else {
        resultadoText.textContent = criptografarTexto(texto);
    }
    principalTextarea.value = "";
}

function mostrarMensagemDescriptografado() {
    const resultadoEmpty = document.getElementById("resultado__mensagem__empty");
    const resultadoText = document.getElementById("resultado__textarea");
    const texto = principalTextarea.value;
    if (resultadoEmpty) {
        sectionResultado.removeChild(resultadoEmpty);
    }
    if (!resultadoText) {
        sectionResultado.appendChild(criarMensagemResultado(descriptografar(texto)));
        sectionResultado.appendChild(criarButtonCopiar());
    } else {
        resultadoText.textContent = descriptografar(texto);
    }
    principalTextarea.value = "";
}

function criarButtonCopiar() {
    const btnCopiar = document.createElement("button");
    btnCopiar.setAttribute("type", "button");
    btnCopiar.setAttribute("id", "btn__copiar");
    btnCopiar.innerText = "Copiar";

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