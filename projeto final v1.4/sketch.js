
// array que armazena os objetos
let estrelas = [];
let chuva_meteoros = [];

//Tela
let tela = 1;
// 1 - tela de menu
// 0 - tela de jogo
// 2 - tela de game over
// 3 - tela de Intruções
// 4 - tela de créditos

//Tamanho da tela
let w = 900, h = 900;

//Posição inicial da nave
var x1 = 420, y1 = 700;

//textos utilizados
var texto = "Objetivo do jogo\n\nControle sua nave espacial e desvie dos meteoros\npelo maior tempo possível. Use as setas do teclado \npara movimentar a nave e teste seus reflexos em meio \nà chuva de meteoros no espaço.";

//Velociade de movimento
var v = 3;

let hit = false; // variavel de colisão

//carregamento das imagens e videos
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

}

function setup() {
  createCanvas(h, w);
  video = createVideo(['videos/gameplay.mp4']);
  video.hide();
  angleMode(DEGREES);

  // Cria o objeto estrela
  for (let i = 0; i < 100; i++) {
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
  if (tela == 0) {
    tela_deJogo();
    
  } else if (tela == 1) {
    tela_principal();
  } else if (tela == 2) {
    tela_gameOver();
  } else if (tela == 3) {
    tela_intrucoes();
  } else if (tela == 4) {
    tela_creditos();
  }

  if (tela == 3) {
    video.show();
  } else {
    video.hide();
  }

}

//-----------------------TELAS-----------------------
function tela_principal() {
  image(titulo, 100, 20, 600, 500);

  //Botão jogar
  fill("white");
  rect(350, 480, 100, 30, 20);
  fill("red");
  textSize(20);
  text("INICIAR", 365, 500);

  fill("white");
  rect(350, 520, 100, 30, 20);
  fill("red");
  textSize(20);
  text("Instruções", 355, 540);

  fill("white");
  rect(350, 560, 100, 30, 20);
  fill("red");
  textSize(20);
  text("Créditos", 363, 580);

}

function tela_deJogo() {
  fill(0, 0, 0, 0);
  rect(x1, y1, 40, 66, 20);
  image(foguete, x1, y1, 40, 66);
  controle(0, 0, w, h);
}

function tela_gameOver() {
  fill("red");
  textSize(80)
  text("GAME OVER", 200, 450);

  //Botão jogar novamente
  fill("white");
  rect(350, 500, 160, 30);
  fill("red");
  textSize(20);
  text("Jogar novamente", 352, 525);

  //Botão voltar ao menu
  fill("white");
  rect(350, 550, 160, 30);
  fill("red");
  textSize(20);
  text("Voltar ao menu", 362, 575);
}

function tela_intrucoes() {
  image(seta_esquerda, 20, 20, 52, 20);
  if (mouseX >= 20 && mouseX < 72 && mouseY >= 20 && mouseY < 40) {
    image(seta_esquerda, 15, 10, 72, 40);
  }

  textSize(20);
  text("Controles", 270, 90);

  text("Para Frente", 430, 170);
  image(seta_direita, 370, 155, 52, 20);

  text("Direita", 505, 250);
  image(seta_direita, 445, 235, 52, 20);

  text("Esquerda", 50, 250);
  image(seta_esquerda, 140, 235, 52, 20);

  image(seta_baixo, 315, 290, 20, 52);
  text("Para trás", 280, 360);

  //objetivo do jogo
  text(texto, 50, 600);

  image(teclas, 200, 130, 240, 156);



  fill(0, 0, 0, 0);
  rect(x1, y1, 40, 66, 20)
  image(foguete, x1, y1, 40, 66);
  controle(700, 130, 856, 286);


  stroke("white");
  rect(700, 130, 156, 156);

  video.size(300, 350);
  video.position(575, 500);
  video.style('border', '2px solid white');
  video.loop();
}
function tela_creditos() {
  image(seta_esquerda, 20, 20, 52, 20);
  if (mouseX >= 20 && mouseX < 72 && mouseY >= 20 && mouseY < 40) {
    image(seta_esquerda, 15, 10, 72, 40);
  }


  image(perfil, 30, 250, 144, 144);
  textSize(30);
  text("Luiz Gustavo Silva Mariano", 180, 290);
  text("Função: Programador", 180, 320)
}

function mouseClicked() {
  //Botão iniciar
  if (tela == 1) {
    if (mouseX >= 350 && mouseX < 450 && mouseY >= 480 && mouseY < 510) {
      x1 = 420;
      y1 = 700;
      tela = 0;
    }
    if (mouseX >= 350 && mouseX < 450 && mouseY >= 520 && mouseY < 550) {
      tela = 3;
      x1 = 750;
      y1 = 200;
    }
    if (mouseX >= 350 && mouseX < 450 && mouseY >= 560 && mouseY < 590) {
      tela = 4;

    }

  }
  //Botão Jogar novamente
  if (tela == 2) {
    if (mouseX >= 350 && mouseX <= 510 && mouseY >= 500 && mouseY <= 530) {
      x1 = 420;
      y1 = 700;
      tela = 0;
      reinicar();
    }
    if (mouseX >= 350 && mouseX <= 510 && mouseY >= 550 && mouseY <= 580) {
      tela = 1;
      reinicar();
    }
  }
  //Botão voltar
  if (tela == 3 || tela == 4) {
    if (mouseX >= 20 && mouseX < 72 && mouseY >= 20 && mouseY < 40) {
      tela = 1;
    }
  }

}



function controle(inicioX, inicioY, limiteX, limiteY) {
  console.log(limiteX);


  if (keyIsDown(UP_ARROW)) {
    if (y1 > inicioY) {
      y1 -= v;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (y1 < limiteY - 66) {
      y1 += v;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if (x1 < limiteX - 40) {
      x1 += v;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    if (x1 > inicioX) {
      x1 -= v;
    }
  }
}

function reinicar(){
  for (let i = 0; i < chuva_meteoros.length; i++) {
        chuva_meteoros[i].resetar();
      }
      hit = false;
}

function espaco() {
  // Update and display each snowflake in the array
  let currentTime = frameCount / 60;

  for (let star of estrelas) {
    // Update each snowflake position and display
    star.update(currentTime);
    star.display();
  }
  if (tela == 0) {
    for (let meteor of chuva_meteoros) {
      meteor.update(currentTime);
      meteor.display();
      meteor.isColission();
    }
  }
}

class Estrela {
  constructor() {
    this.posX = 0;
    this.posY = random(-height, 0);
    this.initialAngle = random(0, 360);
    this.size = random(2, v);
    this.radius = sqrt(random(pow(width / 2, 2)));
    this.color = color("white");
  }

  update(time) {
    // Define angular speed (degrees / second)
    let angularSpeed = 35;

    // Calculate the current angle
    let angle = this.initialAngle + angularSpeed * time;

    // x position follows a sine wave
    this.posX = width / 2 + this.radius * sin(angle);

    // Different size snowflakes fall at different y speeds
    let ySpeed = 8 / this.size;
    this.posY += ySpeed;

    // When snowflake reaches the bottom, move it to the top
    if (this.posY > height) {
      this.posY = -50;
    }
  }

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

  resetar(){
    this.posX = 0;
    this.posY = random(-height, 0);
    this.initialAngle = random(0, 360);
    this.size = 40;
    this.radius = sqrt(random(pow(width / 2, 2)));
  }

  update(time) {
    // Define angular speed (degrees / second)
    let angularSpeed = 20;

    // Calculate the current angle
    let angle = this.initialAngle + angularSpeed * time;

    // x position follows a sine wave
    this.posX = width / 2 + this.radius * sin(angle);

    // Different size snowflakes fall at different y speeds
    let ySpeed = 4;
    this.posY += ySpeed;

    // When snowflake reaches the bottom, move it to the top
    if (this.posY > height) {
      this.posY = -50;
    }
  }

  display() {
    fill(0, 0, 0, 0);
    noStroke();
    circle(this.posX + 21, this.posY + 20, this.size);
    image(meteoro_img, this.posX, this.posY, 44, 40);
  }

  isColission() {

    var rx = x1;
    var ry = y1;
    var rw = 40;
    var rh = 60;



    hit = collideRectCircle(
      rx,
      ry,
      rw,
      rh,
      this.posX + 21,
      this.posY + 20,
      this.size
    );

    if (hit) {
      tela = 2;
      console.log("bateu!");
    } else {
      fill(255);
    }
  }
}