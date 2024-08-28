let itens = [];

// Função para adicionar um item à tabela e atualizar o total geral
function adicionarItem() {
    // Obter os valores dos campos
    const descricao = document.getElementById('descricao').value.trim();
    const categoria = document.getElementById('categoria').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    
    // Limpar mensagens de erro
    limparMensagensErro();
    
    // Validação dos campos
    let valid = true;
    
    if (!descricao || descricao.length < 3) { // Comprimento mínimo de 3 caracteres
        mostrarErro('descricaoError', 'Descrição é obrigatória e deve ter pelo menos 3 caracteres.');
        valid = false;
    }
    
    if (!categoria) {
        mostrarErro('categoriaError', 'Categoria é obrigatória.');
        valid = false;
    }
    
    if (isNaN(valor) || valor <= 0) {
        mostrarErro('valorError', 'Valor é obrigatório e deve ser um número maior que zero.');
        valid = false;
    } else if (valor > 10000) { // Exemplo de valor máximo
        mostrarErro('valorError', 'Valor deve ser menor que 10.000.');
        valid = false;
    }
    
    if (isNaN(quantidade) || quantidade <= 0) {
        mostrarErro('quantidadeError', 'Quantidade/Peso é obrigatória e deve ser um número maior que zero.');
        valid = false;
    } else if (quantidade > 1000) { // Exemplo de quantidade máxima
        mostrarErro('quantidadeError', 'Quantidade/Peso deve ser menor que 1.000.');
        valid = false;
    }
    
    // Se os campos forem válidos, adicionar o item
    if (valid) {
        // Adiciona o item ao array de itens
        const item = { descricao, categoria, valor, quantidade };
        itens.push(item);
        
        // Atualiza a tabela de itens
        atualizarTabelaItens();
        
        // Atualiza o total geral
        atualizarTotalGeral();
        
        // Limpa os campos do formulário
        limparFormulario();
    }
}

// Função para mostrar mensagens de erro
function mostrarErro(id, mensagem) {
    const elemento = document.getElementById(id);
    elemento.textContent = mensagem;
    elemento.style.display = 'block';
}

// Função para limpar mensagens de erro
function limparMensagensErro() {
    const erros = document.querySelectorAll('.error');
    erros.forEach(erro => erro.style.display = 'none');
}

// Função para atualizar a tabela de itens
function atualizarTabelaItens() {
    const tabelaItens = document.getElementById('itensTabela').getElementsByTagName('tbody')[0];
    tabelaItens.innerHTML = ''; // Limpa a tabela existente
    
    itens.forEach((item, index) => {
        const row = tabelaItens.insertRow();
        row.insertCell(0).textContent = item.descricao;
        row.insertCell(1).textContent = item.categoria;
        row.insertCell(2).textContent = item.valor.toFixed(2);
        row.insertCell(3).textContent = item.quantidade.toFixed(2);
        const cell = row.insertCell(4);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => excluirItem(index);
        cell.appendChild(deleteButton);
    });
}

// Função para excluir um item da lista
function excluirItem(index) {
    itens.splice(index, 1);
    atualizarTabelaItens();
    atualizarTotalGeral();
}

// Função para limpar a lista
function limparLista() {
    itens = [];
    atualizarTabelaItens();
    atualizarTotalGeral();
}

// Função para atualizar o total geral
function atualizarTotalGeral() {
    const totalGeral = itens.reduce((acc, item) => acc + (item.valor * item.quantidade), 0);
    document.getElementById('totalGeral').textContent = `R$ ${totalGeral.toFixed(2)}`;
}

// Função para limpar os campos do formulário
function limparFormulario() {
    const formulario = document.getElementById('itemForm');
    formulario.reset();
    limparMensagensErro(); // Limpa mensagens de erro ao reiniciar o formulário
}
