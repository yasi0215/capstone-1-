class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
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

        this.shadowRoot.appendChild(ball);
    }
}

customElements.define('lotto-ball', LottoBall);

const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️ Light Mode';
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';
    formStatus.textContent = '';

    const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        formStatus.style.color = '#4ECDC4';
        formStatus.textContent = '문의가 성공적으로 전송되었습니다!';
        contactForm.reset();
    } else {
        formStatus.style.color = '#FF6B6B';
        formStatus.textContent = '전송에 실패했습니다. 다시 시도해 주세요.';
    }

    submitBtn.disabled = false;
    submitBtn.textContent = '문의 보내기';
});

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
