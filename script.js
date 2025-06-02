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
