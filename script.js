document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 自动播放音乐 (终极修复版) ---
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.4;

    // 核心修复函数：强制重置音频状态，解决缓存和状态不一致问题
    function forceResetAudio() {
        bgMusic.pause();           // 先确保它暂停
        bgMusic.currentTime = 0;   // 再把播放时间拉回0
        bgMusic.muted = true;      // 确保它是静音的
        bgMusic.loop = true;       // 确保循环播放是开启的！
        console.log("音频状态已强制重置。");
        
        // 尝试静音播放，为后续交互做准备
        // 浏览器会阻止这个播放，但没关系，目的是让它“准备就绪”
        bgMusic.play().catch(error => {
            console.log("静音自动播放被浏览器阻止，这是正常的，等待用户交互。");
        });
    }

    // 页面加载时，立即执行重置
    forceResetAudio();

    // 监听用户的第一次交互，然后取消静音
    function enableAudio() {
        // 检查是否真的需要取消静音，防止重复操作
        if (bgMusic.muted) {
            // 新增：动态设置音乐源，实现按需加载
            if (!bgMusic.src) {
                bgMusic.src = bgMusic.getAttribute('data-src');
            }
            
            bgMusic.muted = false;
            bgMusic.play().then(() => {
                console.log("音频已通过用户交互成功启动！");
            }).catch(error => {
                console.error("取消静音后播放失败:", error);
            });
        }
        // 移除事件监听器，确保只触发一次
        document.body.removeEventListener('click', enableAudio);
        document.body.removeEventListener('touchstart', enableAudio);
    }

    // 同时监听点击和触摸事件，以覆盖桌面和移动端
    document.body.addEventListener('click', enableAudio, { once: true });
    document.body.addEventListener('touchstart', enableAudio, { once: true, passive: true });


    // --- 2. 鼠标跟随光晕 (仅在桌面端显示) ---
    const cursorGlow = document.querySelector('.cursor-glow');
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // --- 3. 粒子背景配置 (优化性能) ---
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } }, // 80 -> 50
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // --- 4. 打字机效果 (优化版) ---
    function typeWriter(elementId, text, speed = 100, callback) {
        const element = document.getElementById(elementId);
        element.innerHTML = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // 打字完成后，执行回调函数
                if (callback) callback();
            }
        }
        type();
    }

    // --- 5. 视图切换 ---
    const navLinks = document.querySelectorAll('.nav-link');
    const views = document.querySelectorAll('.view');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            navLinks.forEach(l => l.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));
            link.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- 6. 滚动触发时间轴动画 ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    timelineItems.forEach(item => { observer.observe(item); });

    // --- 7. 爱心雨彩蛋 (优化版) ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 2 + 3 + 's';
        document.getElementById('hearts-rain').appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }

    // --- 8. 信件解锁 (意境优化版) ---
    window.checkBirthday = function() {
        const input = document.getElementById('birthdayInput').value;
        const herBirthday = "2003-01-04"; // 请替换成她的生日
        const letterText = `亲爱的，

当你看到这些文字时，我们已经携手走过了1095个日夜。三年，仿佛一瞬，又仿佛一生。我想用这封信，封存我所有说不出口的爱意与感谢。

谢谢你，出现在我的生命里，像一道光，照亮了我所有的平凡。和你在一起的每一天，都像是偷来的好时光。我怀念我们第一次见面的紧张，第一次约会的甜蜜，第一次旅行的憧憬...我们在一起的每一个瞬间，都已被我珍藏心底，反复回味。

你让我明白，爱不是寻找一个完美的人，而是学会用完美的眼光，欣赏那个不完美的对方。谢谢你包容我的小缺点，分享我的大梦想。你的笑容，是我对抗世界所有疲惫的解药。

三周年快乐。未来的路，我希望每一步都有你的脚印。让我们一起去看更多的风景，去经历更多的故事，去把生活过成我们最想要的样子。

我爱你，不止三千遍。

永远爱你的，
大强`; // 请替换成你的名字

        if (input === herBirthday) {
            document.getElementById('unlockForm').style.display = 'none';
            document.getElementById('letterContent').style.display = 'block';
            
            // 1. 立即开始爱心雨
            const heartInterval = setInterval(createHeart, 300);
            
            // 2. 开始打字效果
            const typingSpeed = 50; // 舒适的阅读速度
            typeWriter('letter-text', letterText, typingSpeed, () => {
                // 3. 打字结束后，再等待3秒停止爱心雨
                setTimeout(() => {
                    clearInterval(heartInterval); // 停止创建新的爱心
                    console.log("信已读完，爱心雨停止。");
                }, 3000);
            });

        } else {
            alert("哎呀，好像不对哦，再想想看？😉");
        }
    };

    // --- 9. 全屏照片查看器 ---
    const photoViewer = document.getElementById('photo-viewer');
    const viewerImg = document.getElementById('viewer-img');
    const closeBtn = document.querySelector('.close-viewer');

    window.openPhotoViewer = function(src) {
        photoViewer.style.display = 'block';
        viewerImg.src = src;
    };

    function closeViewer() {
        photoViewer.style.display = 'none';
    }

    closeBtn.onclick = closeViewer;
    photoViewer.onclick = (e) => {
        if (e.target === photoViewer) {
            closeViewer();
        }
    };

});
