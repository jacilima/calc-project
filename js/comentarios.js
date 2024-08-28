function submitFeedback() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const comment = document.getElementById('comment').value.trim();

    let isValid = true;

    // Validação de nome
    if (!name) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
    }

    // Validação de e-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    // Validação de comentário
    if (!comment) {
        document.getElementById('commentError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('commentError').style.display = 'none';
    }

    if (isValid) {
        const commentsList = document.getElementById('commentsList');
        
        // Cria um novo elemento para o comentário
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        
        // Adiciona o nome e o comentário ao novo elemento
        commentElement.innerHTML = `<p class="name">${name}</p><p class="text">${comment}</p>`;
        
        // Adiciona o novo comentário à lista
        commentsList.appendChild(commentElement);
        
        // Limpa os campos do formulário
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('comment').value = '';
    }
}
