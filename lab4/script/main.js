function mouseover() {
    const p = document.getElementById("azultroll");
    document.getElementById("azultroll").innerText = "Azul";
    p.style.color = "red";
}

function mouseout() {
    const p = document.getElementById("azultroll");
    document.getElementById("azultroll").innerText = "Se passares fica azul";
    p.style.color = "black";
}

function teste() {
    document.body.style.backgroundImage = "url('/lab4/images/Tux.svg.png')";
}

let counter = 0;
const contadorText = document.getElementById('counter');

function contador() {
    counter++;
    contadorText.textContent = counter;

}



function imagem() {
    const imagem = document.getElementById('tux');
    let larguraAtual = imagem.clientWidth;
    imagem.style.width = (larguraAtual + 50) + 'px';
}

function imagemReduz(){
    const imagem = document.getElementById('tux');
    let larguraAtual = imagem.clientWidth;
    imagem.style.width = (larguraAtual - 50) + 'px';
}