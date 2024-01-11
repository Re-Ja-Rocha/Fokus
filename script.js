const html = document.querySelector('html');
const focoBtn =document.querySelector('.app__card-button--foco');
const curtoBtn =document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBtn = document.querySelector('#start-pause');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const iconeInicarOuPausar = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop=true;
const somPausa = new Audio('/sons/pause.mp3');
const somPlay = new Audio('/sons/play.wav');
const somFinalizado = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;


musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    } else{
        musica.pause();
    }
})

focoBtn.addEventListener('click',() =>{
    tempoDecorridoEmSegundos =  1500;
    mudaContexto('foco');
    focoBtn.classList.add('active');

}
);

curtoBtn.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 300;
   mudaContexto('descanso-curto');
   curtoBtn.classList.add('active');
});

longoBtn.addEventListener('click',()=>{
    tempoDecorridoEmSegundos = 900;
    mudaContexto('descanso-longo');
    longoBtn.classList.add('active');
});
function mudaContexto(contexto){
    temporizadorNaTela();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch(contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case "descanso-curto" :
            titulo.innerHTML = `
            Que tal dar uma respirada? <br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong> `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;        
    };
}
const constagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <=0){
        somFinalizado.play();
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    temporizadorNaTela();
}


startPauseBtn.addEventListener('click', iniciarOuPausar);
function iniciarOuPausar(){
    if(intervaloId){
        somPausa.play();
        iconeInicarOuPausar.setAttribute('src','/imagens/pause.png');
        zerar();
        return;
    }
    somPlay.play();
    intervaloId =  setInterval(constagemRegressiva, 1000);
    iniciarOuPausarBtn.textContent = "Pausar";
    iconeInicarOuPausar.setAttribute('src','/imagens/pause.png');



}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBtn.textContent ="Começar";
    iconeInicarOuPausar.setAttribute('src','/imagens/play_arrow.png');


}

function temporizadorNaTela(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br',{minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

temporizadorNaTela();