// Set to true to enable test mode with a mock date
const useMockDate = false;

// Define a mock date (e.g., testing November 1, 2024)
const mockDate = new Date(2024, 10, 1); // Months are 0-based, so 11 is December

// Use the mock date if test mode is enabled; otherwise, use the real date
const currentDate = useMockDate ? mockDate : new Date();

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
    const currentDay = currentDate.getDate();
    const currentDoor = document.getElementById(`door${currentDay}`);

    if (currentDoor && localStorage.getItem(`door${currentDay}`) !== 'opened') {
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
            return `Dia 1 (⭐)! A vida é uma tela. Com que cores a vais pintar hoje?`;
        case 2:
            return "Dia 2 (🔔)! Se não puderes fazer tudo, faz tudo o que puderes!";
        case 3:
            return "Dia 3 (⛄)! Cada fim é um novo começo!";
        case 4:
            return "Dia 4 (🎁)! A maior prenda da vida és tu!";
        case 5:
            return "Dia 5! A carregar mensagem...";
        case 6:
            return "Dia 6 (❤️)! O Natal é a época de aquecer corações. Espalha alegria hoje!";
        case 7:
            return "Dia 7! A carregar mensagem...";
        case 8:
            return "Dia 8! A carregar mensagem...";
        case 9:
            return "Dia 9! A carregar mensagem...";
        case 10:
            return "Dia 10! A carregar mensagem...";
        case 11:
            return "Dia 11 (🫂)! Existem amigos que são casa. Abraça os teus!";
        case 12:
            return "Dia 12! A carregar mensagem...";
        case 13:
            return "Dia 13! A carregar mensagem...";
        case 14:
            return "Dia 14! A carregar mensagem...";
        case 15:
            return "Dia 15! A carregar mensagem...";
        case 16:
            return "Dia 16! A carregar mensagem...";
        case 17:
            return "Dia 17! A carregar mensagem...";
        case 18:
            return "Dia 18! A carregar mensagem...";
        case 19:
            return "Dia 19! A carregar mensagem...";
        case 20:
            return "Dia 20! A carregar mensagem...";
        case 21:
            return "Dia 21! A carregar mensagem...";
        case 22:
            return "Dia 22! A carregar mensagem...";
        case 23:
            return "Dia 23! A carregar mensagem...";
        case 24:
            return "Dia 24! A carregar mensagem...";
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
            const doorYear = 2024;
            const doorMonth = 12;
            const doorDay = index + 1;
            const doorDate = new Date(doorYear, doorMonth - 1, doorDay);

            if (
                doorDate.getFullYear() < currentDate.getFullYear() ||
                (doorDate.getFullYear() === currentDate.getFullYear() &&
                    doorDate.getMonth() < currentDate.getMonth()) ||
                (doorDate.getFullYear() === currentDate.getFullYear() &&
                    doorDate.getMonth() === currentDate.getMonth() &&
                    doorDate.getDate() <= currentDate.getDate())
            ) {
                const prize = getPrize(index + 1);
                prizeText.textContent = prize;
                content.style.display = 'block';
                door.classList.add('opened');
                localStorage.setItem(`door${index + 1}`, 'opened');
            } else {
                prizeText.textContent = "Que curiosidade! Só é possível abrir portas passadas ou do dia atual.";
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

// Function to reset the calendar if there are opened doors
function resetCalendarForNewYear() {
    const currentYear = currentDate.getFullYear();
    const lastAccessedYear = localStorage.getItem('lastAccessedYear');
    const totalDoors = 24; // Adjust this number based on your calendar
    let hasOpenedDoors = false;
    let resetPerformed = false;

    // Check if any door is marked as opened
    for (let i = 1; i <= totalDoors; i++) {
        if (localStorage.getItem(`door${i}`) === 'opened') {
            hasOpenedDoors = true;
            break;
        }
    }

    // If no `lastAccessedYear` exists or it's a new year, handle the reset
    if (!lastAccessedYear || parseInt(lastAccessedYear, 10) !== currentYear) {
        if (hasOpenedDoors) {
            console.log('Opened doors detected. Resetting calendar for the new year.');

            // Clear all doors
            for (let i = 1; i <= totalDoors; i++) {
                localStorage.removeItem(`door${i}`);
            }

            resetPerformed = true; // Mark that a reset occurred
        }

        // Update the year to the current year
        localStorage.setItem('lastAccessedYear', currentYear);
    }

    // Refresh the page if a reset was performed
    if (resetPerformed) {
        console.log('Reset performed. Refreshing the page to update.');
        location.reload(); // Refresh the page to reflect the reset
    }
}

// Verifica se o nome do usuário já foi armazenado na localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    resetCalendarForNewYear();

    if (localStorage.getItem('username')) {
        updateTitle(localStorage.getItem('username'));
    }

    // Chama a função de inicialização do calendário
    initCalendar();

});

