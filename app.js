// Saudação
const hour = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "numeric", hour12: false });
const greeting = hour >= 5 && hour < 12 ? "Bom dia 👋"
              : hour >= 12 && hour < 18 ? "Boa tarde 👋"
              : "Boa noite 👋";
document.getElementById("greeting").textContent = greeting;

// Render clientes
const clientesContainer = document.getElementById("clientesContainer");
Object.keys(clientes).forEach(nome => {
  const btn = document.createElement("button");
  btn.textContent = nome;
  btn.className = "w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg transition";
  btn.onclick = () => abrirModal(nome);
  clientesContainer.appendChild(btn);
});

// Modal cliente
let clienteAtual = "";
function abrirModal(nome) {
  clienteAtual = nome;
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("clienteNome").textContent = nome;
  renderArquivos();
}
function fecharModal() {
  document.getElementById("modal").classList.add("hidden");
}

// Arquivos
function renderArquivos() {
  const container = document.getElementById("arquivosContainer");
  const search = document.getElementById("searchInput").value.toLowerCase();
  container.innerHTML = "";

  clientes[clienteAtual].arquivos
    .filter(a => a.nome.toLowerCase().includes(search))
    .forEach(a => {
      const card = document.createElement("div");
      card.className = "bg-yellow-300 hover:bg-yellow-400 p-3 rounded-lg cursor-pointer shadow";
      card.textContent = a.nome;
      card.onclick = () => abrirPDF(a.fileId);
      container.appendChild(card);
    });
}
function atualizarArquivos() { renderArquivos(); }

// Modal PDF
function abrirPDF(fileId) {
  document.getElementById("pdfModal").classList.remove("hidden");
  document.getElementById("pdfFrame").src = `https://drive.google.com/file/d/${fileId}/preview`;
}

function fecharPDFModal() {
  document.getElementById("pdfModal").classList.add("hidden");
  document.getElementById("pdfFrame").src = "";
}


// Debounce busca
function debounce(fn, delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}
