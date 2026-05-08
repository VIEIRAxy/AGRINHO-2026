/**
 * Lógica do Simulador AgroSustentável
 * Concurso Agrinho 2026
 */

function simular() {
    // Captura dos valores de entrada
    const n = parseFloat(document.getElementById('nitro').value);
    const p = parseFloat(document.getElementById('fosforo').value);
    const ph = parseFloat(document.getElementById('ph')?.value || 7); // pH padrão neutro se não houver campo

    // Referências dos elementos de saída
    const resDiv = document.getElementById('resultado');
    const status = document.getElementById('status-texto');
    const feedback = document.getElementById('feedback-texto');
    const barra = document.getElementById('barra-sustentavel');

    // Validação simples
    if (isNaN(n) || isNaN(p)) {
        alert("Por favor, preencha os níveis de Nitrogênio e Fósforo.");
        return;
    }

    // Reset de estilo e exibição
    resDiv.style.display = 'block';
    let pontosSustentaveis = 100;
    let mensagem = "";
    let corBarra = "#2e7d32"; // Verde padrão (Sustentável)

    // LÓGICA DE EQUILÍBRIO (Baseada em médias agronômicas)
    
    // 1. Verificação de Excesso (Risco Ambiental)
    if (n > 60 || p > 50) {
        resDiv.className = 'alerta';
        status.innerText = "⚠️ Alerta: Risco de Contaminação";
        mensagem = "O excesso de nutrientes causa lixiviação e poluição de rios. ";
        pontosSustentaveis -= 40;
        corBarra = "#d32f2f"; // Vermelho
    } 
    
    // 2. Verificação de Escassez (Risco de Produção)
    else if (n < 20 || p < 15) {
        resDiv.className = 'alerta';
        status.innerText = "📉 Alerta: Solo Empobrecido";
        mensagem = "A falta de nutrientes impede o crescimento saudável, reduzindo a eficiência da terra. ";
        pontosSustentaveis -= 30;
        corBarra = "#fbc02d"; // Amarelo/Dourado
    }

    // 3. Verificação de pH (Equilíbrio Químico)
    if (ph < 5.5 || ph > 7.5) {
        mensagem += "O pH está fora da faixa ideal (5.5 - 7.5), o que bloqueia a absorção de nutrientes.";
        pontosSustentaveis -= 20;
        if(corBarra !== "#d32f2f") corBarra = "#fbc02d";
    }

    // 4. Resultado Ideal
    if (pontosSustentaveis === 100) {
        resDiv.className = 'sucesso';
        status.innerText = "✅ Solo em Equilíbrio Perfeito";
        mensagem = "Parabéns! Sua gestão equilibra alta produtividade com proteção ao meio ambiente.";
        corBarra = "#2e7d32";
    }

    // Atualização da Interface
    feedback.innerText = mensagem;
    barra.style.width = pontosSustentaveis + '%';
    barra.style.backgroundColor = corBarra;
}