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
