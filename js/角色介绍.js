// 音频对象管理
const characterSounds = {
    chiikawa: new Audio('sounds/chiikawa.mp3'),
    hachiware: new Audio('sounds/hachiware.mp3'),
    usagi: new Audio('sounds/usagi.mp3'),
    momonga: new Audio('sounds/momonga.mp3'),
    kuriko: new Audio('sounds/kuriko.mp3'),
    rakko: new Audio('sounds/rakko.mp3'),
    raisa: new Audio('sounds/raisa.mp3'),
    knight1: new Audio('sounds/knight1.mp3'), 
    knight2: new Audio('sounds/knight2.mp3'),  
    knight3: new Audio('sounds/knight3.mp3'),  
    strong: new Audio('sounds/strong.mp3'),  
    star: new Audio('sounds/star.mp3')       
};

// 播放角色音频
function playCharacterSound(character) {
    console.log('尝试播放音频:', character); // 添加调试日志
    
    // 停止所有正在播放的音频
    Object.values(characterSounds).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    
    // 播放选中角色的音频
    const audio = characterSounds[character];
    if (audio) {
        audio.play().catch(error => {
            console.error('播放音频失败:', error);
        });
    } else {
        console.error('未找到对应的音频:', character);
    }
}

// 添加音频加载错误处理
Object.values(characterSounds).forEach(audio => {
    audio.addEventListener('error', (e) => {
        console.error('音频加载失败:', e);
    });
});

// 确保DOM加载完成后再添加事件监听
document.addEventListener('DOMContentLoaded', () => {
    // 为所有角色卡片添加点击事件监听
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const character = card.getAttribute('data-character');
            if (character) {
                playCharacterSound(character);
            }
        });
    });
});