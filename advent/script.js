const doors = document.querySelectorAll('.door');
const content = document.querySelector('.content');
const prizeImage = document.getElementById('prize-image');
const prizeText = document.getElementById('prize-text');
const closeButton = document.getElementById('close');

doors.forEach((door, index) => {
    door.addEventListener('click', () => {
        const doorDate = new Date('2023-12-' + (index + 1));
        if (doorDate <= currentDate) {
            const prize = getPrize(index + 1);
            prizeImage.src = 'imagem' + (index + 1) + '.jpg'; // Substitua 'imagem1.jpg', 'imagem2.jpg', etc., com seus próprios caminhos de imagem
            prizeText.textContent = prize;
            content.style.display = 'block';
            // Define uma marcação no localStorage indicando que esta porta foi aberta
            localStorage.setItem(`door${index + 1}`, 'opened');
        } else {
            prizeImage.src = '';
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
});

const currentDate = new Date('2023-12-01');

function getPrize(day) {
    switch (day) {
        case 1:
            return "Hoje é o dia 1 do Advento ⭐⭐🎄 SDASD AS D SA DS a sd asd as dasd . sdasad A. SDAS DS a sd asd as dasd . sdasad A. SDAS DS a sd asd as dasd . sdasad A. SDAS!";
        case 2:
            return "Feliz Natal!";
        case 3:
            return "Feliz Natal!";
        case 4:
            return "Feliz Natal!";
        case 5:
            return "Hoje é o dia 1 do Advento!";
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
