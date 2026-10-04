document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    function showSlide(index) {
        // 移除所有active类
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 添加新的active类
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // 自动轮播
    function autoSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 点击小圆点切换轮播图
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // 设置自动轮播间隔
    setInterval(autoSlide, 3000); // 每3秒切换一次
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    const slideInterval = 3000; // 3秒切换一次
    let slideTimer;

    // 切换到指定幻灯片
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // 上一张幻灯片
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // 下一张幻灯片
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // 开始自动播放
    function startAutoPlay() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    // 重置自动播放
    function resetAutoPlay() {
        clearInterval(slideTimer);
        startAutoPlay();
    }

    // 为箭头按钮添加点击事件
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay(); // 点击后重置计时器
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay(); // 点击后重置计时器
    });

    // 初始启动自动播放
    startAutoPlay();
});

// 切换登录注册表单
function switchTab(type) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    
    if (type === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
    }
}

// 获取验证码功能
function getVerifyCode() {
    const btn = document.getElementById('verifyBtn');
    const btnText = btn.querySelector('.btn-text');
    const countdownSpan = btn.querySelector('.countdown');
    let countdown = 60;
    
    // 禁用按钮
    btn.disabled = true;
    btn.classList.add('disabled');
    
    // 隐藏原始文本，显示倒计时
    btnText.style.display = 'none';
    countdownSpan.style.display = 'inline';
    
    // 开始倒计时
    const timer = setInterval(() => {
        if (countdown > 0) {
            countdownSpan.textContent = countdown + 's';
            countdown--;
        } else {
            // 恢复按钮状态
            clearInterval(timer);
            btnText.style.display = 'inline';
            countdownSpan.style.display = 'none';
            btn.disabled = false;
            btn.classList.remove('disabled');
        }
    }, 1000);
}

// 表单提交处理
function handleLogin(event) {
    event.preventDefault();
    const form = document.getElementById('loginForm');
    const phone = form.querySelector('input[type="text"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    // 这里添加登录验证逻辑
    console.log('登录信息:', { phone, password });
}

function handleRegister(event) {
    event.preventDefault();
    const form = document.getElementById('registerForm');
    const phone = form.querySelector('input[type="text"]').value;
    const verifyCode = form.querySelectorAll('input[type="text"]')[1].value;
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    
    // 这里添加注册验证逻辑
    console.log('注册信息:', { phone, verifyCode, password, confirmPassword });
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加标签点击事件
    document.getElementById('loginTab').addEventListener('click', () => switchTab('login'));
    document.getElementById('registerTab').addEventListener('click', () => switchTab('register'));
    
    // 获取验证码按钮事件
    const verifyBtn = document.getElementById('verifyBtn');
    verifyBtn.addEventListener('click', getVerifyCode);
    
    // 添加表单提交事件
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // 默认显示登录表单
    switchTab('login');
});

// 手机号验证函数
function validatePhone(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// 密码验证函数
function validatePassword(password) {
    return password.length >= 6;
}

// 验证码验证函数
function validateVerifyCode(code) {
    return code.length === 6 && /^\d+$/.test(code);
}

// 错误提示函数
function showError(message) {
    // 这里可以添加错误提示的UI逻辑
    alert(message);
}