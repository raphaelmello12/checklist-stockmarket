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
  
  // function mostrarModal(texto, imagemUrl) {
  //   document.getElementById('modal-texto').textContent = texto;
  //   document.getElementById('modal-imagem').src = imagemUrl;
  //   document.getElementById('resultado-modal').classList.remove('hidden');
  // }
  function mostrarModal(texto, imagemUrl) {
    const modal = document.getElementById('resultado-modal');
    modal.classList.remove('hidden');
    modal.style.display = 'flex'; // força aparecer
    document.getElementById('modal-texto').textContent = texto;
    document.getElementById('modal-imagem').src = imagemUrl;
  }
  

  
  //function fecharModal() {
 //   document.getElementById('resultado-modal').classList.add('hidden');
  //}
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
      fecharModal();
    });
  });
  
  