



const veiculos = [
  { id: 1, nome: 'Caminhão Baú', tipo: 'Carga', disponivel: true },
  { id: 2, nome: 'Van Executiva', tipo: 'Passageiros', disponivel: true },
  { id: 3, nome: 'Ônibus Escolar', tipo: 'Passageiros', disponivel: true },
  { id: 4, nome: 'Caminhão Plataforma', tipo: 'Carga', disponivel: true },
];

const login_btn = document.getElementById("login_btn");
const reserva_btn_btn = document.getElementById("reserva_btn");

const close_login = document.getElementById("close_login");
const close_reserva = document.getElementById("close_reserva");

const form_login = document.getElementById("login_container");
const form_reserva = document.getElementById("reserva_container");

login_btn.addEventListener("click", () => {
  form_login.style.display = "flex";
});

close_login.addEventListener("click", () => {
  form_login.style.display = "none";
});

reserva_btn.addEventListener("click", () => {
  form_reserva.style.display = "flex";
});

close_reserva.addEventListener("click", () => {
  form_reserva.style.display = "none";
});

function carregarVeiculos() {
  const lista = document.getElementById('lista-veiculos');
  const select = document.getElementById('veiculo');
  lista.innerHTML = '';
  select.innerHTML = '';
  
  const optionPadrao = document.createElement('option');
  optionPadrao.value = '';
  optionPadrao.textContent = 'Selecione um veículo';
  optionPadrao.disabled = true;
  optionPadrao.selected = true;
  select.appendChild(optionPadrao);
  
  veiculos.forEach(veiculo => {
    const item = document.createElement('div');
    item.className = 'card';
    item.innerHTML = `
      <h3>${veiculo.nome}</h3>
      <p>Tipo: ${veiculo.tipo}</p>
      <p>Status: <strong style="color: ${veiculo.disponivel ? 'green' : 'red'}">${veiculo.disponivel ? 'Disponível' : 'Indisponível'}</strong></p>
    `;
    lista.appendChild(item);
    
    if (veiculo.disponivel) {
      const option = document.createElement('option');
      option.value = veiculo.id;
      option.textContent = `${veiculo.nome} (${veiculo.tipo})`;
      select.appendChild(option);
    }
  });
}

carregarVeiculos();

const reservas = [];

const tabelaReservas = document.getElementById("tabela-reservas"); // <table>
const corpoTabela = tabelaReservas.querySelector("tbody");
const cabecalhoTabela = tabelaReservas.querySelector("thead");

atualizarTabelaReservas();

function atualizarTabelaReservas() {
  corpoTabela.innerHTML = "";
  cabecalhoTabela.innerHTML = "";

  if (reservas.length === 0) {
    const linha = document.createElement("tr");
    const celula = document.createElement("td");
    celula.colSpan = 3;
    celula.textContent = "Nenhum veículo reservado";
    celula.style.textAlign = "center";
    linha.appendChild(celula);
    corpoTabela.appendChild(linha);
  } else {
    cabecalhoTabela.innerHTML = `
      <tr>
        <th>Nome</th>
        <th>Veículo</th>
        <th>Data</th>
      </tr>
    `;
    reservas.forEach(r => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${r.nome}</td>
        <td>${r.veiculo}</td>
        <td>${formatarData(r.data)}</td>
      `;
      corpoTabela.appendChild(linha);
    });
  }
}

const formReserva = document.getElementById('form-reserva');
formReserva.addEventListener('submit', function(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const veiculoId = document.getElementById('veiculo').value;
  const data = document.getElementById('data').value;
  const veiculoSelecionado = veiculos.find(v => v.id == veiculoId);
  if (!veiculoSelecionado) {
    alert("Selecione um veículo.");
    return;
  }
  reservas.push({
    nome,
    veiculo: veiculoSelecionado.nome,
    data
  });
  alert(`Reserva confirmada para ${nome}, Veículo: ${veiculoSelecionado.nome}, Data: ${data}`);
  veiculoSelecionado.disponivel = false;
  carregarVeiculos();
  atualizarTabelaReservas();
  formReserva.reset();
  form_reserva.style.display = "none";
});

function formatarData(dataString) {
  if (!dataString) return 'Data não informada';
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dataString).toLocaleDateString('pt-BR', options);
}

const formLogin = document.getElementById('form-login');
formLogin.addEventListener('submit', function(event) {
  event.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  if (usuario === 'admin' && senha === '1234') {
    alert('Login bem-sucedido!');
  } else {
    alert('Usuário ou senha incorretos.');
  }
});

function setMinDate() {
  const date = new Date();
  const input = document.getElementById("data");
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);

  const today = `${date.getFullYear()}-${month}-${day}`;

  input.setAttribute("min", today);
}

// ===== JavaScript =====

// 1) Referências aos elementos do DOM
const imagesContainer = document.getElementById('images_container');
const prevBtn = document.getElementById('prev_btn');
const nextBtn = document.getElementById('next_btn');
const ballsContainer = document.getElementById('balls_carrossel');

// 2) Coleção de elementos <img> dentro de #images_container
const images = imagesContainer.getElementsByClassName('carrossel_image');

// 3) Índice corrente (começa em 0)
let currentIndex = 0;

/**
 * Cria as bolinhas (span.ball_carrossel) dinamicamente,
 * adiciona listener de clique em cada uma para navegar direto ao índice.
 */
function initBalls() {
  ballsContainer.innerHTML = ''; // limpa se já existir algo

  for (let i = 0; i < images.length; i++) {
    const ball = document.createElement('span');
    ball.classList.add('ball_carrossel');
    if (i === 0) ball.classList.add('selected'); // primeira bolinha já selecionada

    // Ao clicar em uma bolinha, muda currentIndex e atualiza carrossel
    ball.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });

    ballsContainer.appendChild(ball);
  }
}

/**
 * Atualiza transformação do #images_container para mostrar a imagem em currentIndex
 * e também ajusta a classe .selected na bolinha correta.
 */
function updateCarousel() {
  // 1) Cálculo genérico do deslocamento em porcentagem:
  //    Cada imagem ocupa (100% / número de imagens) do container total.
  const shiftPercent = (100 / images.length) * currentIndex;
  imagesContainer.style.transform = `translateX(-${shiftPercent}%)`;

  // 2) Atualiza bolinhas: remove .selected de todas e adiciona à corrente
  const balls = ballsContainer.getElementsByClassName('ball_carrossel');
  for (let j = 0; j < balls.length; j++) {
    balls[j].classList.toggle('selected', j === currentIndex);
  }
}

// 4) Botão "Anterior"
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
});

// 5) Botão "Próxima"
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
});

// 6) Inicializa as bolinhas e já define o carrossel na posição zero
initBalls();
updateCarousel();