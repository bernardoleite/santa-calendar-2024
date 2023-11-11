const doors = document.querySelectorAll('.door');
const content = document.querySelector('.content');
//const prizeImage = document.getElementById('prize-image');
const prizeText = document.getElementById('prize-text');
const closeButton = document.getElementById('close');

doors.forEach((door, index) => {
    door.addEventListener('click', () => {
        const doorDate = new Date('2023-12-' + (index + 1));
        if (doorDate <= currentDate) {
            const prize = getPrize(index + 1);
            //prizeImage.src = 'imagem' + (index + 1) + '.jpg';
            prizeText.textContent = prize;
            content.style.display = 'block';

            // Atualiza a classe da porta para "opened" imediatamente
            door.classList.add('opened');

            // Define uma marcação no localStorage indicando que esta porta foi aberta
            localStorage.setItem(`door${index + 1}`, 'opened');
        } else {
            //prizeImage.src = '';
            prizeText.textContent = "Você só pode abrir portas passadas ou do dia atual.";
            content.style.display = 'block';
        }
    });

    // Verifica o localStorage para determinar se a porta já foi aberta
    if (localStorage.getItem(`door${index + 1}`) === 'opened') {
        door.classList.add('opened');
    }
});

closeButton.addEventListener('click', () => {
    content.style.display = 'none';

    // Restaura a cor verde da porta após fechar a janela
    doors.forEach((door, index) => {
        if (localStorage.getItem(`door${index + 1}`) === 'opened') {
            door.classList.add('opened');
        } else {
            door.classList.remove('opened');
        }
    });
});

const currentDate = new Date('2023-12-01');

function getPrize(day) {
    switch (day) {
        case 1:
            return "Dia 1! Recebeu uma estrela (⭐).";
        case 2:
            return "Feliz Natal!";
        case 3:
            return "Feliz Natal!";
        case 4:
            return "Feliz Natal!";
        case 5:
            return "Feliz Natal!";
        case 6:
            return "Feliz Natal!";
        case 7:
            return "Feliz Natal!";
        case 8:
            return "Feliz Natal!";
        // Adicione mais casos para os outros dias do Advento
        default:
            return "Nada aqui hoje.";
    }
}

// Verifica se o nome do usuário já foi armazenado na localStorage
if (localStorage.getItem('username')) {
    // Se já foi armazenado, você pode recuperá-lo e usá-lo
    const savedUsername = localStorage.getItem('username');
    updateTitle(savedUsername);
} else {
    // Se não foi armazenado, você pode coletar o nome do usuário e salvá-lo
    document.getElementById('saveName').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        localStorage.setItem('username', username);
        updateTitle(username);
    });
}

// Função para atualizar o título com o nome do usuário
function updateTitle(username) {
    const calendarTitle = document.querySelector('.calendar-title');
    if (username) {
        calendarTitle.textContent = `Calendário das Mensagens de ${username}`;
    } else {
        calendarTitle.textContent = 'Calendário das Mensagens';
    }
}

// Função para piscar o número do dia atual
function blinkCurrentDay() {
    //const currentDate = new Date('2023-12-01'); // Substitua pela data atual
    const currentDay = currentDate.getDate();

    // Verifica se a porta do dia atual não foi aberta
    if (localStorage.getItem(`door${currentDay}`) !== 'opened') {
        const currentDoor = document.getElementById(`door${currentDay}`);
        let isBlinkVisible = true;

        // Define um intervalo para alternar a visibilidade do número a cada 500ms (meio segundo)
        const blinkInterval = setInterval(function () {
            if (isBlinkVisible) {
                currentDoor.style.color = 'transparent';
            } else {
                currentDoor.style.color = 'white'; // Altere a cor do número para corresponder ao fundo
            }
            isBlinkVisible = !isBlinkVisible;

            // Verifica se a porta foi aberta (você deve ter lógica para isso)
            if (localStorage.getItem(`door${currentDay}`) === 'opened') {
                clearInterval(blinkInterval); // Para o efeito de piscar
                currentDoor.style.color = 'white'; // Torna o número visível novamente
            }
        }, 500);
    }
}

// Chame a função para piscar o número do dia atual
blinkCurrentDay();


