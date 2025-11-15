// ============================
// Saudação dinâmica
// ============================
const hour2 = new Date().toLocaleString("pt-BR", {
  timeZone: "America/Sao_Paulo",
  hour: "numeric",
  hour12: false
});

const greeting2 =
  hour2 >= 5 && hour2 < 12
    ? "Bom dia 👋"
    : hour2 >= 12 && hour2 < 18
    ? "Boa tarde 👋"
    : "Boa noite 👋";

document.getElementById("greeting").textContent = greeting2;


// ============================
// Renderização dos clientes
// ============================
const clientesContainer2 = document.getElementById("clientesContainer");

Object.keys(clientes).forEach(nome => {
  const btn = document.createElement("button");
  btn.textContent = nome;
  btn.className =
    "w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg transition";
  btn.onclick = () => abrirModal2(nome);
  clientesContainer2.appendChild(btn);
});


// ============================
// Modal de cliente
// ============================
let clienteAtual2 = "";

function abrirModal2(nome) {
  clienteAtual2 = nome;
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("clienteNome").textContent = nome;
  renderArquivos2();
}

function fecharModal() {
  document.getElementById("modal").classList.add("hidden");
}


// ============================
// Listagem de Arquivos
// ============================
function renderArquivos2() {
  const container = document.getElementById("arquivosContainer");
  const search = document.getElementById("searchInput").value.toLowerCase();

  container.innerHTML = "";

  clientes[clienteAtual2].arquivos
    .filter(a => a.nome.toLowerCase().includes(search))
    .forEach(a => {
      const card = document.createElement("div");
      card.className =
        "bg-yellow-300 hover:bg-yellow-400 p-3 rounded-lg cursor-pointer shadow";
      card.textContent = a.nome;
      card.onclick = () => abrirPDF2(a.fileId);
      container.appendChild(card);
    });
}

function atualizarArquivos() {
  renderArquivos2();
}


// ============================
// Modal de PDF em tela cheia
// ============================
function abrirPDF2(fileId) {
  document.getElementById("pdfModal").classList.remove("hidden");
  document.getElementById("pdfFrame").src =
    `https://drive.google.com/file/d/${fileId}/preview`;
}

function fecharPDFModal() {
  document.getElementById("pdfModal").classList.add("hidden");
  document.getElementById("pdfFrame").src = "";
}


// ============================
// Debounce para a busca
// ============================
function debounce(fn, delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}
