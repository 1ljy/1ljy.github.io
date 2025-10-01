document.addEventListener('DOMContentLoaded', () => {

    // --- 全局变量 ---
    const bgMusic = document.getElementById('bgMusic');
    const sections = document.querySelectorAll('.section');
    let currentSection = 0;
    const promises = [
        "一起去冰岛看极光",
        "养一只可爱的金毛",
        "把我们的家布置成喜欢的样子",
        "每年都去一个没去过的地方",
        "永远做彼此最坚实的依靠"
    ];
    let promiseIndex = 0;

    // --- 音乐控制 (严格绑定在封面点击) ---
    bgMusic.volume = 0.5;

    // --- 封面交互：打开信封，播放音乐，进入第一章 ---
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        // 尝试播放音乐
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log("音乐开始播放");
            }).catch(error => {
                console.log("自动播放被阻止:", error);
                // 如果失败，可以在这里添加一个手动播放的提示
            });
        }
        // 延迟后进入下一章
        setTimeout(() => {
            showSection(1);
        }, 1500);
    });

    // --- 章节切换逻辑 ---
    function showSection(index) {
        sections.forEach(s => s.classList.remove('active'));
        sections[index].classList.add('active');
        currentSection = index;

        // 根据章节执行特定动画
        if (index === 1) { // 第一章
            typeWriter();
        } else if (index === 3) { // 第三章
            initStarCanvas();
        }
    }

    // --- 滑动/滚轮切换章节 ---
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', e => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', e => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    document.addEventListener('wheel', e => {
        if (e.deltaY > 0) { // 向下滚动
            if (currentSection < sections.length - 1) showSection(currentSection + 1);
        } else { // 向上滚动
            if (currentSection > 0) showSection(currentSection - 1);
        }
    }, { passive: true });

    function handleSwipe() {
        if (touchEndY < touchStartY - 50) { // 向上滑动
            if (currentSection < sections.length - 1) showSection(currentSection + 1);
        }
        if (touchEndY > touchStartY + 50) { // 向下滑动
            if (currentSection > 0) showSection(currentSection - 1);
        }
    }

    // --- 第一章：打字机效果 ---
    function typeWriter() {
        const text = "世界很大，幸好遇见。那天，春天的风里，都是你的味道。";
        const element = document.getElementById('ch1-text');
        element.innerHTML = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        type();
    }

    // --- 第三章：星空与点击生成约定 ---
    function initStarCanvas() {
        const canvas = document.getElementById('starCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 绘制静态星星背景
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const r = Math.random() * 1.5;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }

        // 点击事件
        canvas.onclick = (e) => {
            if (promiseIndex >= promises.length) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // 绘制新星星
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#e8b4b8';
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#e8b4b8';
            ctx.fill();
            ctx.shadowBlur = 0;

            // 显示约定文字
            const promiseDiv = document.createElement('div');
            promiseDiv.className = 'promise';
            promiseDiv.textContent = promises[promiseIndex];
            promiseDiv.style.left = `${x}px`;
            promiseDiv.style.top = `${y}px`;
            document.getElementById('promises').appendChild(promiseDiv);
            
            promiseIndex++;
        };
    }
});
