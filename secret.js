// 创建雪花
function createSnow() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random() * 0.5 + 0.3;
    snowflake.innerHTML = '❤';
    snowflake.style.color = 'rgba(255, 182, 193, 0.8)';
    
    document.querySelector('.snow-container').appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

// 持续创建雪花
setInterval(createSnow, 100);

// 添加样式
const style = document.createElement('style');
style.textContent = `
    .snowflake {
        position: fixed;
        font-size: 1em;
        user-select: none;
        pointer-events: none;
        animation: fall linear forwards;
        color: rgba(255, 182, 193, 0.8);
    }

    @keyframes fall {
        0% {
            transform: translateY(-10vh);
        }
        100% {
            transform: translateY(100vh);
        }
    }
`;
document.head.appendChild(style);

// 信封和音乐控制
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    const envelope = document.querySelector('.envelope');
    const openButton = document.getElementById('openButton');
    const music = document.getElementById('bgMusic');
    
    console.log('Elements found:', {
        envelope: envelope,
        openButton: openButton,
        music: music
    });

    if (!envelope || !openButton || !music) {
        console.error('Some elements are missing');
        return;
    }

    let isOpen = false;

    // 直接在按钮上添加内联事件处理，用于测试
    openButton.onclick = function() {
        console.log('Button clicked');
        if (!isOpen) {
            envelope.classList.add('open');
            openButton.textContent = '关闭信封';
            music.play().catch(error => {
                console.log('播放失败:', error);
            });
        } else {
            envelope.classList.remove('open');
            openButton.textContent = '打开信封';
            music.pause();
        }
        isOpen = !isOpen;
    };
}); 