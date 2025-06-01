// Dados simulados de veículos disponíveis
const veiculos = [
  { id: 1, nome: 'Caminhão Baú', tipo: 'Carga', disponivel: true },
  { id: 2, nome: 'Van Executiva', tipo: 'Passageiros', disponivel: true },
  { id: 3, nome: 'Ônibus Escolar', tipo: 'Passageiros', disponivel: false },
  { id: 4, nome: 'Caminhão Plataforma', tipo: 'Carga', disponivel: true },
];
function carregarVeiculos() {
  const lista = document.getElementById('lista-veiculos');
  const select = document.getElementById('veiculo');
  lista.innerHTML = '';
  select.innerHTML = '';
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
      option.textContent = veiculo.nome;
      select.appendChild(option);
    }
  });
}
const formReserva = document.getElementById('form-reserva');
formReserva.addEventListener('submit', function(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const veiculoId = document.getElementById('veiculo').value;
  const data = document.getElementById('data').value;
  alert(`Reserva confirmada para ${nome}, Veículo ID: ${veiculoId}, Data: ${data}`);
  formReserva.reset();
});
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
carregarVeiculos();
