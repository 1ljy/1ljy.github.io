// ===================================================================
// 1. 全局变量
// ===================================================================

// --- 视图4: 默契大考验 ---
const gameQuestions = [
    {
        question: "我最喜欢的电影类型是？",
        options: ["科幻片", "爱情片", "喜剧片", "悬疑片"],
        correctAnswer: 1
    },
    {
        question: "我们第一次约会的餐厅叫什么？",
        options: ["A餐厅", "B餐厅", "C餐厅", "不记得了"],
        correctAnswer: 2
    },
    {
        question: "我最害怕的动物是？",
        options: ["蜘蛛", "蛇", "狗", "都没有"],
        correctAnswer: 0
    },
    {
        question: "我生日时最想要的礼物是？",
        options: ["一次旅行", "一个惊喜派对", "一件实用的礼物", "你的陪伴"],
        correctAnswer: 3
    },
    {
        question: "我最喜欢你的哪个瞬间？",
        options: ["你笑的样子", "你认真工作的样子", "你为我做饭的样子", "所有样子都喜欢"],
        correctAnswer: 3
    }
];
let currentQuestionIndex = 0;
let score = 0;

// --- 视图5: 星空下的誓言 (九宫格版) ---
const constellationQuestions = [
    {
        question: "我们的爱，如同永恒的...",
        answer: "北斗七星",
        hint: "指引方向，永恒不变",
        correctSequence: [0, 1, 2, 5, 8, 7, 6] // 0-8代表九宫格从左到右，从上到下
    },
    {
        question: "你是我心中最亮的...",
        answer: "天狼星",
        hint: "夜空中最亮的恒星",
        correctSequence: [4, 1, 3, 5, 7] // 十字形
    }
];
let constellationLevel = 0;
let userSequence = [];


// ===================================================================
// 2. 页面初始化与通用功能
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    const loadingMask = document.getElementById('loading-mask');
    const loadingText = document.getElementById('loading-text');

    // --- 核心函数：初始化音乐和页面 ---
    function initMusicAndPage() {
        loadingText.textContent = "正在准备浪漫...";
        
        // 尝试播放音乐
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // 播放成功！
                console.log("音乐自动播放成功！");
                hideLoadingMask();
            }).catch(error => {
                // 播放失败，显示手动播放按钮
                console.error("音乐自动播放被阻止:", error);
                loadingText.innerHTML = `音乐播放失败<br><button id="manual-play-btn">点击播放音乐</button>`;
                document.getElementById('manual-play-btn').addEventListener('click', () => {
                    bgMusic.play().then(hideLoadingMask);
                });
            });
        }
    }

    // --- 隐藏加载遮罩，显示页面 ---
    function hideLoadingMask() {
        loadingMask.style.opacity = '0';
        setTimeout(() => {
            loadingMask.style.display = 'none';
            initOtherFeatures();
        }, 500);
    }

    // --- 初始化其他所有功能 ---
    function initOtherFeatures() {
        // --- 1. 日夜计时器 ---
        updateDaysAndNights();
        setInterval(updateDaysAndNights, 1000 * 60 * 60); // 每小时更新一次

        // --- 2. 粒子背景配置 ---
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: { number: { value: 50, density: { enable: true, value_area: 800 } }, color: { value: "#ffffff" }, shape: { type: "circle" }, opacity: { value: 0.5, random: true }, size: { value: 3, random: true }, line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 }, move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false } },
                interactivity: { detect_on: "canvas", events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true }, modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } } },
                retina_detect: true
            });
        }

        // --- 3. 打字机效果 ---
        function typeWriter(elementId, text, speed = 100) {
            const element = document.getElementById(elementId);
            element.innerHTML = '';
            let i = 0;
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }
        typeWriter('typewriter', 'To My Dearest Love,');

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
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = entry.target.dataset.delay || '0s';
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.dataset.delay = `${Math.random() * 0.5}s`;
            observer.observe(item);
        });

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
            const diffDays = getDaysTogether();
            const letterText = `亲爱的，

当你看到这些文字时，我们已经携手走过了${diffDays}个日夜。三年，仿佛一瞬，又仿佛一生。我想用这封信，封存我所有说不出口的爱意与感谢。

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
                    setTimeout(() => { clearInterval(heartInterval); }, 3000);
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

        // --- 9. 初始化游戏 ---
        initGames();
    }

    // --- 开始整个流程 ---
    initMusicAndPage();
});


// ===================================================================
// 3. 视图4: 默契大考验 - 游戏逻辑
// ===================================================================

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('game-start').style.display = 'none';
    document.getElementById('game-result').style.display = 'none';
    document.getElementById('game-play').style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    const questionData = gameQuestions[currentQuestionIndex];
    document.getElementById('question-text').innerText = questionData.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });

    document.getElementById('progress-text').innerText = `${currentQuestionIndex + 1} / ${gameQuestions.length}`;
}

function selectAnswer(selectedIndex) {
    if (selectedIndex === gameQuestions[currentQuestionIndex].correctAnswer) {
        score++;
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < gameQuestions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('game-play').style.display = 'none';
    document.getElementById('game-result').style.display = 'block';
    
    const percentage = Math.round((score / gameQuestions.length) * 100);
    document.getElementById('score-value').innerText = percentage;

    let message = '';
    if (percentage >= 80) {
        message = "天呐！简直是灵魂伴侣！💕";
    } else if (percentage >= 60) {
        message = "很棒啦！看来你很懂我哦！😊";
    } else if (percentage >= 40) {
        message = "还不错，但还有进步空间哦~ 😉";
    } else {
        message = "看来你需要多了解我一点啦！😜";
    }
    document.getElementById('result-message').innerText = message;
}


// ===================================================================
// 4. 日夜计时器功能
// ===================================================================

function getDaysTogether() {
    const startDate = new Date('2022-03-27T00:00:00');
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function updateDaysAndNights() {
    const diffDays = getDaysTogether();
    document.querySelectorAll('.days-counter').forEach(el => {
        el.textContent = diffDays;
    });
}


// ===================================================================
// 5. 视图5: 星空下的誓言 - 游戏逻辑 (九宫格版)
// ===================================================================

function initGames() {
    // 初始化默契大考验
    document.getElementById('start-game-btn').addEventListener('click', startGame);
    document.getElementById('restart-game-btn').addEventListener('click', startGame);

    // 初始化星空誓言
    initConstellationGame();
}

function initConstellationGame() {
    const grid = document.getElementById('star-grid');
    grid.innerHTML = ''; // 清空旧的格子

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        grid.appendChild(cell);
    }

    document.getElementById('start-canvas-btn').addEventListener('click', startConstellationGame);
    document.getElementById('check-answer-btn').addEventListener('click', checkConstellationAnswer);
}

function startConstellationGame() {
    constellationLevel = 0;
    userSequence = [];
    document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.remove('active'));
    document.getElementById('start-canvas-btn').style.display = 'none';
    document.getElementById('check-answer-btn').style.display = 'inline-block';
    loadConstellationLevel();
}

function loadConstellationLevel() {
    document.getElementById('game-hint').textContent = constellationQuestions[constellationLevel].hint;
}

function handleCellClick(index) {
    const currentLevel = constellationQuestions[constellationLevel];
    if (userSequence.length >= currentLevel.correctSequence.length) return;

    userSequence.push(index);
    document.querySelectorAll('.grid-cell')[index].classList.add('active');
}

function checkConstellationAnswer() {
    const currentLevel = constellationQuestions[constellationLevel];
    const correctSequence = currentLevel.correctSequence;
    
    let isCorrect = userSequence.length === correctSequence.length;
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== correctSequence[i]) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        document.getElementById('game-hint').textContent = "答对了！你点亮了我们的星座！";
        if (constellationLevel < constellationQuestions.length - 1) {
            constellationLevel++;
            setTimeout(() => {
                userSequence = [];
                document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.remove('active'));
                loadConstellationLevel();
            }, 1500);
        } else {
            document.getElementById('game-hint').textContent = "恭喜你！完成了所有誓言！";
            document.getElementById('check-answer-btn').style.display = 'none';
        }
    } else {
        document.getElementById('game-hint').textContent = "好像不太对哦，再想想看~";
        userSequence = [];
        document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.remove('active'));
    }
}
