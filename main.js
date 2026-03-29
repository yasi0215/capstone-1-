class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = this.getAttribute('number');
        const color = this.getAttribute('color');

        const ball = document.createElement('div');
        ball.style.backgroundColor = color;
        ball.style.width = '60px';
        ball.style.height = '60px';
        ball.style.borderRadius = '50%';
        ball.style.display = 'flex';
        ball.style.justifyContent = 'center';
        ball.style.alignItems = 'center';
        ball.style.margin = '0 10px';
        ball.style.color = 'white';
        ball.style.fontSize = '24px';
        ball.style.fontWeight = 'bold';
        ball.style.boxShadow = 'inset -5px -5px 10px rgba(0, 0, 0, 0.3), 5px 5px 10px rgba(0, 0, 0, 0.3)';

        ball.textContent = number;

        shadow.appendChild(ball);
    }
}

customElements.define('lotto-ball', LottoBall);

document.getElementById('generate-btn').addEventListener('click', () => {
    const numbersContainer = document.getElementById('numbers-container');
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const colors = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#556270', '#C7F464', '#C44D58'];

    Array.from(numbers).sort((a,b) => a-b).forEach((number, index) => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoBall.setAttribute('color', colors[index]);
        numbersContainer.appendChild(lottoBall);
    });
});
