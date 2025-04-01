document.getElementById('checklist-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const getValue = (name) => {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : '';
  };

  // Tendência base: alta (compra) ou queda (venda)
  const tendencia = getValue('tendencia');
  if (tendencia !== 'sim' && tendencia !== 'nao') {
    mostrarModal(
      "⚠️ Selecione a tendência para continuar.",
      "https://cdn-icons-png.flaticon.com/128/8622/8622353.png"
    );
    return;
  }

    const tipoOperacao = tendencia === 'sim' ? 'compra' : 'venda';
    const quant = getValue('quant');
    

    const quantBloqueado = (
      (tipoOperacao === 'compra' && quant === 'negativo') ||
      (tipoOperacao === 'venda' && quant === 'positivo')
    );
  
      // Etapas bloqueadoras
      const amplitude = getValue('amplitude');
      const media = getValue('media');
      const risk = getValue('risk');
      const dashboard = getValue('dashboard');

    if (amplitude === 'sim' || media === 'sim' || risk === 'nao' || quantBloqueado || dashboard === 'nao') {
      mostrarModal(
        "🔴 Não fazer nenhuma operação (condição crítica não atendida)",
        "https://cdn-icons-png.flaticon.com/128/10100/10100000.png"
      );
      return;
    }
    let pontos = 1;
  
    const criterios = [
      { id: 'probabilidade', tipo: tipoOperacao === 'compra' ? 'positivo' : 'negativo' },
      { id: 'fluxo',         tipo: tipoOperacao === 'compra' ? 'positivo' : 'negativo' },
      { id: 'juros',         tipo: tipoOperacao === 'compra' ? 'positivo' : 'negativo' },
    ];
  
    criterios.forEach(c => {
      if (getValue(c.id) === c.tipo) {
        pontos++;
      }
    });
  
    let resultado = '';
    let imagem = '';
  
    if (pontos >= 4) {
      resultado = tipoOperacao === 'compra'
        ? "✅ Probabilidade maior de COMPRA"
        : "✅ Probabilidade maior de VENDA";
  
      imagem = tipoOperacao === 'compra'
        ? "https://cdn-icons-png.flaticon.com/128/10893/10893970.png"
        : "https://cdn-icons-png.flaticon.com/128/10893/10893978.png";
    } else {
      resultado = "🟡 Não fazer nenhuma operação (poucos critérios favoráveis)";
      imagem = "https://cdn-icons-png.flaticon.com/128/10100/10100000.png";
    }
  
    mostrarModal(resultado, imagem);
  });
  

  function mostrarModal(texto, imagemUrl) {
    const modal = document.getElementById('resultado-modal');
    modal.classList.remove('hidden');
    modal.style.display = 'flex'; // força aparecer
    document.getElementById('modal-texto').textContent = texto;
    document.getElementById('modal-imagem').src = imagemUrl;
  }
  
  function fecharModal() {
    console.log("fecharModal chamado");
  
    const modal = document.getElementById("resultado-modal");
    modal.classList.add("hidden");
    modal.style.display = "none"; // força desaparecer
  }

  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById('resultado-modal');
    const fecharBtn = document.getElementById('fechar-btn');
    const modalContent = document.getElementById('modal-content');

    modal.addEventListener('click', fecharModal);
    
    fecharBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      fecharModal();
    });

    modalContent.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });
  
  