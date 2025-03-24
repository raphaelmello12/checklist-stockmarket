document.getElementById('checklist-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const getValue = (name) => {
      const selected = document.querySelector(`input[name="${name}"]:checked`);
      return selected ? selected.value : '';
    };
  
    // Etapas bloqueadoras
    const amplitude = getValue('amplitude');
    const media = getValue('media');
    const risk = getValue('risk');
  
    if (amplitude === 'sim' || media === 'sim' || risk === 'nao') {
      mostrarModal(
        "🔴 Não fazer nenhuma operação (condição crítica não atendida)",
        "https://cdn-icons-png.flaticon.com/512/753/753345.png"
      );
      return;
    }
  
    // Tendência base: alta (compra) ou queda (venda)
    const tendencia = getValue('tendencia');
    if (tendencia !== 'sim' && tendencia !== 'nao') {
      mostrarModal(
        "⚠️ Selecione a tendência para continuar.",
        "https://cdn-icons-png.flaticon.com/512/753/753345.png"
      );
      return;
    }
  
    const tipoOperacao = tendencia === 'sim' ? 'compra' : 'venda';
    let pontos = 1;
  
    const criterios = [
      { id: 'dashboard', tipo: 'sim' },
      { id: 'probabilidade', tipo: tipoOperacao },
      { id: 'fluxo', tipo: tipoOperacao },
      { id: 'juros', tipo: tipoOperacao === 'compra' ? 'negativo' : 'positivo' },
      { id: 'quant', tipo: tipoOperacao === 'compra' ? 'positivo' : 'negativo' },
      { id: 'forca', tipo: tipoOperacao },
      { id: 'ibov', tipo: tipoOperacao === 'compra' ? 'positivo' : 'negativo' },
    ];
  
    criterios.forEach(c => {
      if (getValue(c.id) === c.tipo) {
        pontos++;
      }
    });
  
    let resultado = '';
    let imagem = '';
  
    if (pontos >= 9) {
      resultado = tipoOperacao === 'compra'
        ? "✅ Alta probabilidade de compra"
        : "✅ Alta probabilidade de venda";
  
      imagem = tipoOperacao === 'compra'
        ? "https://cdn-icons-png.flaticon.com/512/190/190411.png"
        : "https://cdn-icons-png.flaticon.com/512/1828/1828884.png";
    } else {
      resultado = "🟡 Não fazer nenhuma operação (poucos critérios favoráveis)";
      imagem = "https://cdn-icons-png.flaticon.com/512/753/753345.png";
    }
  
    mostrarModal(resultado, imagem);
  });
  
  function mostrarModal(texto, imagemUrl) {
    document.getElementById('modal-texto').textContent = texto;
    document.getElementById('modal-imagem').src = imagemUrl;
    document.getElementById('resultado-modal').style.display = 'flex';
  }
  
  function fecharModal() {
    document.getElementById('resultado-modal').style.display = 'none';
  }
  
  // Clique no fundo fecha
  document.getElementById('resultado-modal').addEventListener('click', fecharModal);
  
  
  // Clique no botão OK fecha e impede propagação
  document.getElementById('fechar-btn').addEventListener('click', function (e) {
    e.stopPropagation(); // evita que o clique propague para o fundo
    fecharModal();       // fecha o modal
  });
  
  
  