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

let currentImageIndex = 0;
const images = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/image5.jpg',
    'images/image6.jpg',
    'images/image7.jpg',
    'images/image8.jpg'
];

function showImage(src) {
    document.getElementById('imageViewer').style.display = 'block';
    document.getElementById('fullImage').src = src;
    // 更新当前图片索引
    currentImageIndex = images.indexOf(src);
}

function closeImage() {
    document.getElementById('imageViewer').style.display = 'none';
}

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    document.getElementById('fullImage').src = images[currentImageIndex];
}

// 添加键盘事件支持
document.addEventListener('keydown', function(e) {
    if (document.getElementById('imageViewer').style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        } else if (e.key === 'Escape') {
            closeImage();
        }
    }
});