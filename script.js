document.addEventListener('DOMContentLoaded', () => {

    const bgMusic = document.getElementById('bgMusic');
    const loadingMask = document.getElementById('loading-mask');
    const loadingText = document.getElementById('loading-text');
    const manualPlayBtn = document.getElementById('manual-play-btn');

    bgMusic.volume = 0.4;

    // --- 核心函数：初始化音乐和页面 ---
    function initMusicAndPage() {
        loadingText.textContent = "正在加载音乐...";
        
        // 尝试播放音乐
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // 播放成功！
                console.log("音乐自动播放成功！");
                hideLoadingMask();
            }).catch(error => {
                // 播放失败（被浏览器阻止）
                console.error("音乐自动播放被阻止:", error);
                loadingText.textContent = "浏览器需要您的许可才能播放音乐";
                manualPlayBtn.style.display = 'block'; // 显示手动播放按钮
                
                manualPlayBtn.onclick = () => {
                    bgMusic.play().then(_ => {
                        console.log("用户手动播放成功！");
                        hideLoadingMask();
                    }).catch(err => {
                        console.error("手动播放也失败了:", err);
                        loadingText.textContent = "音乐播放失败，请检查网络或刷新页面。";
                    });
                };
            });
        }
    }

    // --- 隐藏加载遮罩，显示页面 ---
    function hideLoadingMask() {
        loadingMask.style.opacity = '0';
        setTimeout(() => {
            loadingMask.style.display = 'none';
            // 页面显示后，再初始化其他所有功能
            initOtherFeatures();
        }, 500); // 等待淡出动画
    }

    // --- 初始化其他所有功能 ---
    function initOtherFeatures() {
        // --- 1. 鼠标跟随光晕 ---
        const cursorGlow = document.querySelector('.cursor-glow');
        if (window.matchMedia("(pointer: fine)").matches) {
            document.addEventListener('mousemove', (e) => {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
            });
        }

        // --- 2. 粒子背景配置 ---
        particlesJS('particles-js', {
            particles: { number: { value: 50, density: { enable: true, value_area: 800 } }, color: { value: "#ffffff" }, shape: { type: "circle" }, opacity: { value: 0.5, random: true }, size: { value: 3, random: true }, line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 }, move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false } },
            interactivity: { detect_on: "canvas", events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true }, modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } } },
            retina_detect: true
        });

        // --- 3. 打字机效果 ---
        function typeWriter(elementId, text, speed = 100, callback) {
            const element = document.getElementById(elementId);
            element.innerHTML = '';
            let i = 0;
            function type() {
                if (i < text.length) { element.innerHTML += text.charAt(i); i++; setTimeout(type, speed); } else { if (callback) callback(); }
            }
            type();
        }

        // --- 4. 视图切换 ---
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

        // --- 5. 滚动触发时间轴动画 ---
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

        // --- 6. 爱心雨彩蛋 ---
        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 2 + 3 + 's';
            document.getElementById('hearts-rain').appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }

        // --- 7. 信件解锁 ---
        window.checkBirthday = function() {
            const input = document.getElementById('birthdayInput').value;
            const herBirthday = "2003-01-04";
            const letterText = `亲爱的，

当你看到这些文字时，我们已经携手走过了1095个日夜。三年，仿佛一瞬，又仿佛一生。我想用这封信，封存我所有说不出口的爱意与感谢。

谢谢你，出现在我的生命里，像一道光，照亮了我所有的平凡。和你在一起的每一天，都像是偷来的好时光。我怀念我们第一次见面的紧张，第一次约会的甜蜜，第一次旅行的憧憬...我们在一起的每一个瞬间，都已被我珍藏心底，反复回味。

你让我明白，爱不是寻找一个完美的人，而是学会用完美的眼光，欣赏那个不完美的对方。谢谢你包容我的小缺点，分享我的大梦想。你的笑容，是我对抗世界所有疲惫的解药。

三周年快乐。未来的路，我希望每一步都有你的脚印。让我们一起去看更多的风景，去经历更多的故事，去把生活过成我们最想要的样子。

我爱你，不止三千遍。

永远爱你的，
大强`;
            if (input === herBirthday) {
                document.getElementById('unlockForm').style.display = 'none';
                document.getElementById('letterContent').style.display = 'block';
                const heartInterval = setInterval(createHeart, 300);
                const typingSpeed = 50;
                typeWriter('letter-text', letterText, typingSpeed, () => {
                    setTimeout(() => { clearInterval(heartInterval); console.log("信已读完，爱心雨停止。"); }, 3000);
                });
            } else {
                alert("哎呀，好像不对哦，再想想看？😉");
            }
        };

        // --- 8. 全屏照片查看器 ---
        const photoViewer = document.getElementById('photo-viewer');
        const viewerImg = document.getElementById('viewer-img');
        const closeBtn = document.querySelector('.close-viewer');
        window.openPhotoViewer = function(src) { photoViewer.style.display = 'block'; viewerImg.src = src; };
        function closeViewer() { photoViewer.style.display = 'none'; }
        closeBtn.onclick = closeViewer;
        photoViewer.onclick = (e) => { if (e.target === photoViewer) { closeViewer(); } };
    }

    // --- 开始整个流程 ---
    initMusicAndPage();

});
