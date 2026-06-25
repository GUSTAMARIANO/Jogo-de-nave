
// array que armazena os objetos
let estrelas = [];
let chuva_meteoros = [];
let recorde_pontos = [];
let recorde_player = [];

//Tela
let tela = 1;
// 1 - tela de menu
// 2 - tela de game over
// 3 - tela de Intruções
// 4 - tela de créditos
// 5 - tela de jogo
// 6 - tela de recordes

//Tamanho da tela
let w = window.innerWidth, h = window.innerHeight;

//Posição inicial da nave
var x1 = w / 2 - 20, y1 = 700;

//textos utilizados
var texto = "Objetivo do jogo\n\nControle sua nave espacial e desvie dos meteoros\npelo maior tempo possível. Use as setas do teclado \npara movimentar a nave e teste seus reflexos em meio \nà chuva de meteoros no espaço.";

//Velociade de movimento
var velocidade = 3;

// variavel de colisão
let isHit = false;

//Variavel de pontuação
var pontos = 0;

var nameInput;
var submitButton;

var botaoW = w / 2 - 75;
//-------------------------------------------------------------------------------------------------------------
//carregamento das imagens
let foguete;
let meteoro_img;
let teclas;
let seta_cima;
let seta_baixo;
let seta_direita;
let seta_esquerda;
let video;
let perfil;
let titulo;
let audio_background;

function preload() {
  foguete = loadImage('Imagens/foguete.png');
  meteoro_img = loadImage('Imagens/meteoro.png');
  teclas = loadImage('Imagens/teclas arrow.png');
  seta_cima = loadImage('Imagens/cima.png');
  seta_baixo = loadImage('Imagens/baixo.png');
  seta_direita = loadImage('Imagens/direita.png');
  seta_esquerda = loadImage('Imagens/esquerda.png');
  perfil = loadImage('Imagens/minha_foto.webp');
  titulo = loadImage('Imagens/titulo.png');
  audio_background = loadSound('Audios/soundback.mp3');

}

function setup() {
  createCanvas(w, h);
  //Carrega e esconde o video
  video = createVideo(['videos/gameplay.mp4']);
  video.hide();
  audio_background.setVolume(0.1);
  if (!audio_background.isPlaying()) {
    audio_background.play();
  }

  //Alteração de angulos radianos para graus
  angleMode(DEGREES);

  // Cria o objeto estrela
  for (let i = 0; i < 120; i++) {
    // Adiciona o objeto ao array
    estrelas.push(new Estrela());
  }

  //Cria e armazena o objeto meteoro
  for (let j = 0; j < 10; j++) {
    chuva_meteoros.push(new Meteoro());
  }


}

function draw() {
  background("black");
  espaco();


  //Controle de telas
  if (tela == 5) {
    tela_deJogo();
  } else if (tela == 1) {
    tela_principal();
  } else if (tela == 2) {
    tela_gameOver();
  } else if (tela == 3) {
    tela_intrucoes();
  } else if (tela == 4) {
    tela_creditos();
  } else if (tela == 6) {
    tela_recordes();
  }




  //Controle de exibição do video
  if (tela == 3) {
    video.show();
  } else {
    video.hide();
  }

  if (!audio_background.isPlaying()) {
    audio_background.loop();
  }
}

function criarBotao(posX, posY, texto) {
  fill("white");
  rect(posX, posY, 160, 40, 20);
  fill("red");
  textSize(20);
  textAlign(CENTER, CENTER);
  text(texto, posX + 160 / 2, posY + 40 / 2);
}

function gerarPersonagem(pos_x, pos_y) {
  fill(0, 0, 0, 0);
  rect(pos_x, pos_y, 40, 66, 20);
  image(foguete, pos_x, pos_y, 40, 66);
}
//-----------------------TELAS-----------------------
function tela_principal() {
  //titulo do jogo
  image(titulo, w / 2 - 300, 20, 600, 500);

  //Botão jogar
  criarBotao(botaoW, 480, "INICIAR");
  //Botão instruções
  criarBotao(botaoW, 530, "Instruções");
  //Botão créditos
  criarBotao(botaoW, 580, "Créditos");
  criarBotao(botaoW, 630, "Recordes");
  userStartAudio();


}


function tela_deJogo() {
  gerarPersonagem(x1, y1);
  controle(0, 0, w, h);
  pontos++;
  fill("white");
  textSize(20);
  textAlign(LEFT, TOP);
  text("Pontos: " + pontos, 20, 20);
}

function tela_gameOver() {
  textAlign(CENTER, CENTER);
  fill("red");
  textSize(80);
  text("GAME OVER", w / 2, 300);

  //Exibi pontuação final
  fill("white");
  textSize(30);
  text("Pontos: " + pontos, w / 2, 360);

  //Botão jogar novamente
  criarBotao(botaoW, 400, "Jogar novamente");

  //Botão voltar ao menu
  criarBotao(botaoW, 450, "Voltar ao menu");


}

function tela_intrucoes() {
  //Botão voltar com efeito interativo
  image(seta_esquerda, 20, 20, 52, 20);
  if (mouseX >= 20 && mouseX < 72 && mouseY >= 20 && mouseY < 40) {
    image(seta_esquerda, 15, 10, 72, 40);
  }

  image(teclas, w / 2 - 500, 130, 240, 156);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Controles", w / 2, 90);

  textSize(20);
  text("Para Frente", w / 2 - 200, 165);
  image(seta_direita, w / 2 - 320, 155, 52, 20);

  text("Direita", w / 2 - 150, 245);
  image(seta_direita, w / 2 - 240, 235, 52, 20);

  text("Esquerda", w / 2 - 630, 245);
  image(seta_esquerda, w / 2 - 575, 235, 52, 20);

  image(seta_baixo, w / 2 - 390, 290, 20, 52);
  text("Para trás", w / 2 - 390, 360);

  //Texto com o objetivo do jogo
  textAlign(LEFT, TOP);
  text(texto, w / 2 - 630, 600);

  //Gera a nave e o controle para teste
  gerarPersonagem(x1, y1);

  controle(w / 2 + 200, 130, w / 2 + 356, 286);
  //Area de teste do controle
  stroke("white");
  rect(w / 2 + 200, 130, 156, 156);

  //Configurações do video
  video.size(300, 350);
  video.position(w / 2 + 100, 500);
  video.style('border', '2px solid white');
  video.loop();
}
function tela_creditos() {
  //Botão voltar com efeito interativo
  image(seta_esquerda, 20, 20, 52, 20);
  if (mouseX >= 20 && mouseX < 72 && mouseY >= 20 && mouseY < 40) {
    image(seta_esquerda, 15, 10, 72, 40);
  }
  //Area com os créditos
  image(perfil, w / 2 - 72, 250, 144, 144);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Luiz Gustavo Silva Mariano", w / 2, 420);
  text("Função: Programador", w / 2, 470);
}
function tela_recordes() {
  image(seta_esquerda, 20, 20, 52, 20);
  if (mouseX >= 20 && mouseX < 72 && mouseY >= 20 && mouseY < 40) {
    image(seta_esquerda, 15, 10, 72, 40);
  }
  //Area com os recordes
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Recordes", w / 2, 100);
  
  if (recorde_pontos.length === 0) {
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Nenhum recorde registrado", w / 2, 200);
  } else {
    for (let i = 0; i < recorde_pontos.length; i++) {
      textSize(30);
      textAlign(LEFT, CENTER);
      text(recorde_player[i], w / 2 - 100, 200 + i * 50);
      textAlign(RIGHT, CENTER);
      text(recorde_pontos[i], w / 2 + 100, 200 + i * 50);
    }
  }
}

function mouseClicked() {
  //------------------------TELA PRINCIPAL------------------------
  if (tela == 1) {
    //Botão iniciar
    if (mouseX >= botaoW && mouseX < botaoW + 160 && mouseY >= 480 && mouseY < 520) {
      tela = 5;
      userStartAudio();

      /*if (!audio_background.isPlaying()) {
        audio_background.loop();
      }*/
    }
    //Botão Instruções
    if (mouseX >= botaoW && mouseX < botaoW + 160 && mouseY >= 530 && mouseY < 570) {
      tela = 3;
      x1 = w / 2 + 260;
      y1 = 200;
    }
    //Botão Créditos
    if (mouseX >= botaoW && mouseX < botaoW + 160 && mouseY >= 580 && mouseY < 620) {
      tela = 4;
      console.log("créditos");
    }
    //Botão Recordes
    if (mouseX >= botaoW && mouseX < botaoW + 160 && mouseY >= 630 && mouseY < 670) {
      tela = 6;
      console.log("recordes");
    }
  }
  //------------------------TELA GAME OVER------------------------
  if (tela == 2) {
    //Botão Jogar novamente
    if (mouseX >= botaoW && mouseX < botaoW + 160 && mouseY >= 400 && mouseY < 440) {
      tela = 5;
      x1 = w / 2 - 20, y1 = 700;
      reiniciar();
    }
    //Botão Voltar ao menu
    if (mouseX >= botaoW && mouseX < botaoW + 160 && mouseY >= 450 && mouseY < 490) {
      tela = 1;
      x1 = w / 2 - 20, y1 = 700;
      reiniciar();
    }
  }

  //Botão voltar na tela de instruções e créditos
  if (tela == 3 || tela == 4 || tela == 6) {
    if (mouseX >= 20 && mouseX < 72 && mouseY >= 20 && mouseY < 40) {
      tela = 1;
      reiniciar();
    }
  }
}




//Movimentação da nave
function controle(inicioX, inicioY, limiteX, limiteY) {

  //Move para cima
  if (keyIsDown(UP_ARROW)) {
    if (y1 > inicioY) {
      y1 -= velocidade;
    }
  }
  //Move para baixo
  if (keyIsDown(DOWN_ARROW)) {
    if (y1 < limiteY - 66) {
      y1 += velocidade;
    }
  }
  //Move para direita
  if (keyIsDown(RIGHT_ARROW)) {
    if (x1 < limiteX - 40) {
      x1 += velocidade;
    }
  }
  //Move para esquerda
  if (keyIsDown(LEFT_ARROW)) {
    if (x1 > inicioX) {
      x1 -= velocidade;
    }
  }
}

//Função para reiniciar a posição dos meteoros e a variável de colisão
function reiniciar() {
  for (let i = 0; i < chuva_meteoros.length; i++) {
    chuva_meteoros[i].resetar();
  }
  isHit = false;
  pontos = 0;
  x1 = w / 2 - 20;
  y1 = 700;
}

//Gera o efeito de chuva de meteoros e estrelas
function espaco() {
  // Calcula o tempo atual em segundos
  let currentTime = frameCount / 60;

  //Carrega as estrelas
  for (let star of estrelas) {
    star.update(currentTime);
    star.display();
  }
  //Se na tela de jogo, carrega os meteoros
  if (tela == 5) {
    for (let meteor of chuva_meteoros) {
      meteor.update(currentTime);
      meteor.display();
      meteor.isColission();
    }
  }

  if (currentTime > 10) {
    ySpeed = 1000;
    //console.log("aumentou a velocidade" + ySpeed);
  }
}

function registrarPontuacao() {
  if (nameInput.value() === '') {
    alert("Por favor, digite um nome para registrar sua pontuação.");
    return;
  } else {
    if (recorde_pontos.length != 10) {
      //nameInput = prompt("Digite seu nome para registrar sua pontuação:");
      recorde_pontos.push(pontos);
      recorde_player.push(nameInput.value());
    } else if (pontos > recorde_pontos[recorde_pontos.length - 1]) {
      recorde_pontos[recorde_pontos.length - 1] = pontos;
      recorde_player[recorde_player.length - 1] = nameInput.value();
    }


    for (let i = 0; i <= recorde_pontos.length; i++) {
      for (let j = 0; j <= recorde_pontos.length; j++) {
        if (recorde_pontos[i] > recorde_pontos[j]) {
          var tempPontos = recorde_pontos[i];
          var tempPlayer = recorde_player[i];
          recorde_pontos[i] = recorde_pontos[j];
          recorde_player[i] = recorde_player[j];
          recorde_pontos[j] = tempPontos;
          recorde_player[j] = tempPlayer;
          //break;
        }
        console.log(recorde_pontos);
        console.log(recorde_player);
      }
    }
    nameInput.remove();
    submitButton.remove();
    //submitButton.remove();
  }
}

class Estrela {
  constructor() {
    this.posX = 0;
    this.posY = random(-height, 0);
    this.initialAngle = random(0, 360);
    this.size = random(2, velocidade);
    this.radius = sqrt(random(pow(width / 2, 2)));
    this.color = color("white");
  }

  update(time) {
    // Define a velocidade angular (graus/segundo)
    let angularSpeed = 35;

    // Calcula o ângulo atual
    let angle = this.initialAngle + angularSpeed * time;

    // A posição x segue uma onda senoidal.
    this.posX = width / 2 + this.radius * sin(angle);

    // Estrelas de tamanhos diferentes caem a velocidades diferentes.
    let ySpeed = 8 / this.size;
    this.posY += ySpeed;

    // Quando a estrela chegar ao fundo, mova-a para o topo.
    if (this.posY > height) {
      this.posY = -50;
    }
  }

  //Exibir as estrelas
  display() {
    fill(this.color);
    noStroke();
    ellipse(this.posX, this.posY, this.size);
  }
}

class Meteoro {
  constructor() {
    this.resetar();
  }

  resetar() {
    this.posX = 0;
    this.posY = random(-height, 0);
    this.initialAngle = random(0, 360);
    this.size = 40;
    this.radius = sqrt(random(pow(width / 2, 2)));
  }

  update(time) {
    // Define a velocidade angular (graus/segundo)
    let angularSpeed = 20;

    // Calcula o ângulo atual
    let angle = this.initialAngle + angularSpeed * time;

    // A posição x segue uma onda senoidal.
    this.posX = width / 2 + this.radius * sin(angle);

    // Velocidade de queda do meteoro
    let ySpeed = 4;
    this.posY += ySpeed;

    // Quando o meteoro chegar ao fundo, mova-o para o topo.
    if (this.posY > height) {
      this.posY = -50;
    }
  }

  //Exibir os meteoros
  display() {
    fill(0, 0, 0, 0);
    noStroke();
    circle(this.posX + 21, this.posY + 20, this.size);
    image(meteoro_img, this.posX, this.posY, 44, 40);
  }

  //Verifica se houve colisão entre o meteoro e a nave usando a função collideRectCircle da biblioteca p5.collide2D
  isColission() {
    //posição da nave no momento da colisão
    var rx = x1;
    var ry = y1;
    var rw = 40;
    var rh = 60;

    //Recebe true ou false
    isHit = collideRectCircle(
      rx,
      ry,
      rw,
      rh,
      this.posX + 21,
      this.posY + 20,
      this.size
    );

    if (isHit) {

      nameInput = createInput();
      nameInput.position(20, 50);
      submitButton = createButton('Registrar');
      submitButton.position(nameInput.x + nameInput.width, nameInput.y);
      submitButton.mousePressed(registrarPontuacao);

      tela = 2;
    }
  }
}