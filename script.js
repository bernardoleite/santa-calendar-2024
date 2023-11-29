const currentDate = new Date('2023-12-04');

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
    const currentDate = new Date('2023-12-04');
    const currentDay = currentDate.getDate();

    if (localStorage.getItem(`door${currentDay}`) !== 'opened') {
        const currentDoor = document.getElementById(`door${currentDay}`);
        let isBlinkVisible = true;

        const blinkInterval = setInterval(function () {
            if (isBlinkVisible) {
                currentDoor.style.color = 'transparent';
            } else {
                currentDoor.style.color = 'white';
            }
            isBlinkVisible = !isBlinkVisible;

            if (localStorage.getItem(`door${currentDay}`) === 'opened') {
                clearInterval(blinkInterval);
                currentDoor.style.color = 'white';
            }
        }, 500);
    }
}

// Função para obter o prêmio com base no dia
function getPrize(day) {
    switch (day) {
        case 1:
            return `Dia 1! Recebeu uma estrela (⭐).`;
        case 2:
            return "Feliz Natal!";
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            return "Feliz Natal!";
        // Adicione mais casos para os outros dias do Advento
        default:
            return "Nada aqui hoje.";
    }
}

// Função para inicializar o calendário
function initCalendar() {
    const doors = document.querySelectorAll('.door');
    const content = document.querySelector('.content');
    const prizeText = document.getElementById('prize-text');
    const closeButton = document.getElementById('close');
    const usernameInput = document.getElementById('username');
    const saveNameButton = document.getElementById('saveName');

    // Adiciona ouvinte de evento para o botão "Salvar"
    saveNameButton.addEventListener('click', function () {
        const username = usernameInput.value;
        localStorage.setItem('username', username);
        updateTitle(username);
    });

    // Adiciona ouvinte de evento para o botão de fechar
    closeButton.addEventListener('click', function () {
        content.style.display = 'none';

        doors.forEach((door, index) => {
            if (localStorage.getItem(`door${index + 1}`) === 'opened') {
                door.classList.add('opened');
            } else {
                door.classList.remove('opened');
            }
        });
    });

    // Adiciona ouvinte de evento para cada porta
    doors.forEach((door, index) => {
        door.addEventListener('click', function () {
            const doorDate = new Date('2023-12-' + (index + 1));

            if (doorDate <= currentDate) {
                const prize = getPrize(index + 1);
                prizeText.textContent = prize;
                content.style.display = 'block';
                door.classList.add('opened');
                localStorage.setItem(`door${index + 1}`, 'opened');
            } else {
                prizeText.textContent = "Você só pode abrir portas passadas ou do dia atual.";
                content.style.display = 'block';
            }
        });

        // Verifica se a porta já foi aberta ao carregar a página
        if (localStorage.getItem(`door${index + 1}`) === 'opened') {
            door.classList.add('opened');
        }
    });

    // Chama a função para piscar o número do dia atual
    blinkCurrentDay();
}

// Verifica se o nome do usuário já foi armazenado na localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('username')) {
        updateTitle(localStorage.getItem('username'));
    }
});

// Chama a função de inicialização do calendário
initCalendar();
