// 在文件开头添加计时功能
function updateTimer() {
    const startDate = new Date('2023-02-10T10:00:00');
    const now = new Date();
    const diff = now - startDate;

    // 计算时间差
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 格式化时间字符串
    const timeString = `感谢你陪伴了我 ${days}天${hours}小时${minutes}分${seconds}秒`;
    
    // 更新显示
    const timeCounter = document.getElementById('timeCounter');
    if (timeCounter) {
        timeCounter.textContent = timeString;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 初始更新计时器
    updateTimer();
    // 每秒更新一次
    setInterval(updateTimer, 1000);

    // 创建树枝
    const treeBody = document.querySelector('.tree-body');
    treeBody.innerHTML = '';
    
    // 创建10层树枝
    for (let i = 0; i < 10; i++) {
        const branch = document.createElement('div');
        branch.className = 'tree-branch';
        treeBody.appendChild(branch);
    }

    // 添加装饰球
    const colors = ['#ff0000', '#ffd700', '#ff69b4', '#00ff00', '#87ceeb', '#ffffff'];
    
    // 为每个树枝添加装饰
    const branches = document.querySelectorAll('.tree-branch');
    branches.forEach((branch, index) => {
        const numDecorations = 3 + Math.floor(index / 2); // 越往下装饰越多
        
        for (let i = 0; i < numDecorations; i++) {
            const decoration = document.createElement('div');
            decoration.style.position = 'absolute';
            decoration.style.width = `${8 + Math.random() * 8}px`;
            decoration.style.height = decoration.style.width;
            decoration.style.borderRadius = '50%';
            decoration.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // 在树枝上均匀分布装饰球
            const xPos = (i + 1) * (branch.offsetWidth / (numDecorations + 1));
            decoration.style.left = `${xPos}px`;
            decoration.style.top = '-5px';
            decoration.style.animation = `twinkle ${1 + Math.random() * 2}s infinite`;
            decoration.style.boxShadow = `0 0 10px ${decoration.style.backgroundColor}`;
            decoration.style.zIndex = '2';
            
            branch.appendChild(decoration);
        }
    });

    // 添加闪烁的星星效果
    const starContainer = document.querySelector('.star');
    starContainer.innerHTML = `
        <div class="star-inner">★</div>
        <div class="star-glow"></div>
    `;

    // 雪花效果
    const snowflakesContainer = document.querySelector('.snowflakes') || 
        document.createElement('div');
    
    if (!snowflakesContainer.classList.contains('snowflakes')) {
        snowflakesContainer.className = 'snowflakes';
        document.body.appendChild(snowflakesContainer);
    }

    // 持续生成雪花
    function generateSnowflakes() {
        if (snowflakesContainer.children.length < 50) { // 限制最大雪花数量
            createSnowflake(snowflakesContainer);
        }
        setTimeout(generateSnowflakes, 200); // 每200ms生成一个新雪花
    }

    generateSnowflakes();
});

// 修改雪花生成和动画逻辑
function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.style.position = 'absolute';
    snowflake.style.color = '#fff';
    snowflake.style.fontSize = `${Math.random() * 15 + 8}px`;
    snowflake.innerHTML = '❄';
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.top = '-20px'; // 从屏幕顶部开始
    snowflake.style.opacity = Math.random() * 0.7 + 0.3;
    
    // 计算随机的动画持续时间和水平移动
    const duration = Math.random() * 5 + 5;
    const horizontalMovement = Math.random() * 150 - 75; // -75px 到 75px 之间的随机值

    // 使用CSS transform来创建更流畅的动画
    snowflake.style.transition = `transform ${duration}s linear`;
    snowflake.style.transform = `translate(0, -20px)`;

    container.appendChild(snowflake);

    // 使用 requestAnimationFrame 来实现平滑的下落动画
    let start = null;
    const height = window.innerHeight + 20; // 额外的20px确保完全离开视口

    function fall(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / (duration * 1000);

        if (progress < 1) {
            const currentY = height * progress;
            const currentX = horizontalMovement * Math.sin(progress * Math.PI);
            snowflake.style.transform = `translate(${currentX}px, ${currentY}px)`;
            requestAnimationFrame(fall);
        } else {
            snowflake.remove();
        }
    }

    requestAnimationFrame(fall);
} 