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

// --- 视图5: 星空下的誓言 ---
const constellationQuestions = [
    {
        question: "我们的爱，如同永恒的...",
        answer: "北斗七星",
        hint: "指引方向，永恒不变",
        stars: [
            { x: 0.2, y: 0.3 }, { x: 0.3, y: 0.35 }, { x: 0.4, y: 0.4 },
            { x: 0.5, y: 0.45 }, { x: 0.6, y: 0.4 }, { x: 0.7, y: 0.35 },
            { x: 0.8, y: 0.3 }
        ],
        connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
    },
    {
        question: "你是我心中最亮的...",
        answer: "天狼星",
        hint: "夜空中最亮的恒星",
        stars: [
            { x: 0.5, y: 0.5 },
            { x: 0.45, y: 0.45 }, { x: 0.55, y: 0.45 },
            { x: 0.45, y: 0.55 }, { x: 0.55, y: 0.55 }
        ],
        connections: [[0, 1], [0, 2], [0, 3], [0, 4]]
    }
];
let constellationLevel = 0;
let constellationUserStars = []; // 存储星星DOM元素


// ===================================================================
// 2. 页面初始化与通用功能
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    const loadingMask = document.getElementById('loading-mask');
    const loadingText = document.getElementById('loading-text');

    bgMusic.volume = 0.4;

    // --- 核心函数：初始化音乐和页面 ---
    function initMusicAndPage() {
        loadingText.textContent = "正在准备浪漫...";
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log("音乐自动播放成功！");
                hideLoadingMask();
            }).catch(error => {
                console.error("音乐自动播放被阻止:", error);
                loadingText.textContent = "音乐播放失败，请刷新页面重试。";
            });
        }
    }

    // --- 隐藏加载遮罩，显示页面 ---
    function hideLoadingMask() {
        document.body.classList.add('page-loaded');
        loadingMask.style.opacity = '0';
        setTimeout(() => {
            loadingMask.style.display = 'none';
            initOtherFeatures();
        }, 500);
    }

    // --- 初始化其他所有功能 ---
    function initOtherFeatures() {
        // --- 0. 日夜计时器 ---
        updateDaysAndNights();
        setInterval(updateDaysAndNights, 1000 * 60 * 60 * 6); // 每6小时更新一次

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

        // --- 9. 使用事件委托统一绑定所有游戏按钮 ---
        document.addEventListener('click', (event) => {
            const target = event.target;

            // 视图4: 默契大考验
            if (target.id === 'start-game-btn' || target.id === 'restart-game-btn') {
                startGame();
            }

            // 视图5: 星空下的誓言
            if (target.id === 'start-canvas-btn') {
                startConstellationGame();
            }
            if (target.id === 'check-answer-btn') {
                checkConstellationAnswer();
            }
            if (target.id === 'next-level-btn') {
                nextConstellationLevel();
            }
        });
        
        // 初始化星空游戏
        initConstellationCanvas();
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
    const dayText = `From 2022.03.27 to Forever (已陪伴 ${diffDays} 个日夜)`;

    // 更新主页面的日夜数
    const heroTextP = document.querySelector('.hero-text p');
    if (heroTextP) {
        heroTextP.textContent = dayText;
    }

    // 如果存在 days-counter span，也更新它
    const daysCounterSpan = document.querySelector('.days-counter');
    if (daysCounterSpan) {
        daysCounterSpan.textContent = diffDays;
    }
}


// ===================================================================
// 5. 视图5: 星空下的誓言 - 游戏逻辑 (DOM操作版)
// ===================================================================

// 1. 初始化函数
function initConstellationCanvas() {
    console.log("Constellation game initialized (DOM version).");
}

// 2. 开始游戏函数
function startConstellationGame() {
    constellationLevel = 0;
    constellationUserStars = [];
    document.getElementById('start-canvas-btn').style.display = 'none';
    document.getElementById('check-answer-btn').style.display = 'inline-block';
    document.getElementById('game-hint').style.display = 'block';
    
    const interactionArea = document.getElementById('star-interaction-area');
    interactionArea.innerHTML = ''; 

    loadConstellationLevel();
}

// 3. 加载关卡函数
function loadConstellationLevel() {
    const interactionArea = document.getElementById('star-interaction-area');
    interactionArea.innerHTML = '';
    constellationUserStars = [];

    const levelData = constellationQuestions[constellationLevel];
    document.getElementById('hint-text').innerText = `问题: ${levelData.question} (${levelData.hint})`;
    
    showGuideStars(levelData.stars);
}

// 4. 处理区域点击的函数
function handleAreaClick(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    createTouchRipple(event.clientX, event.clientY);

    const clickedStarElement = event.target.closest('.user-star');
    if (clickedStarElement) {
        removeStarAndLines(clickedStarElement);
    } else {
        const starElement = createStarElement(x, y);
        event.currentTarget.appendChild(starElement);
        constellationUserStars.push(starElement);

        if (constellationUserStars.length > 1) {
            const prevStar = constellationUserStars[constellationUserStars.length - 2];
            createLineElement(prevStar, starElement);
        }
    }
}

// 5. 创建星星DOM元素
function createStarElement(x, y) {
    const star = document.createElement('div');
    star.classList.add('user-star');
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    return star;
}

// 6. 创建连线DOM元素
function createLineElement(star1, star2) {
    const line = document.createElement('div');
    line.classList.add('star-line');
    
    const x1 = parseFloat(star1.style.left);
    const y1 = parseFloat(star1.style.top);
    const x2 = parseFloat(star2.style.left);
    const y2 = parseFloat(star2.style.top);
    
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    line.style.width = length + 'px';
    line.style.left = x1 + 'px';
    line.style.top = y1 + 'px';
    line.style.transform = `rotate(${angle}deg)`;
    
    star1.parentElement.appendChild(line);
    star1.dataset.lineId = line.id = `line-${Date.now()}`;
}

// 7. 移除星星和相关的线
function removeStarAndLines(starElement) {
    const prevLineId = starElement.dataset.prevLineId;
    if (prevLineId) {
        const prevLine = document.getElementById(prevLineId);
        if (prevLine) prevLine.remove();
    }
    const nextLineId = starElement.dataset.lineId;
    if (nextLineId) {
        const nextLine = document.getElementById(nextLineId);
        if (nextLine) nextLine.remove();
    }
    starElement.remove();
    const index = constellationUserStars.indexOf(starElement);
    if (index > -1) {
        constellationUserStars.splice(index, 1);
    }
}

// 8. 显示引导星星的函数
function showGuideStars(stars) {
    const guideContainer = document.getElementById('guide-stars-container');
    guideContainer.innerHTML = '';

    const containerRect = document.getElementById('game-canvas-container').getBoundingClientRect();
    
    stars.forEach(star => {
        const guideStarDiv = document.createElement('div');
        guideStarDiv.classList.add('guide-star');
        guideStarDiv.style.left = (star.x * containerRect.width) + 'px';
        guideStarDiv.style.top = (star.y * containerRect.height) + 'px';
        guideContainer.appendChild(guideStarDiv);
    });
}

// 9. 创建触摸涟漪效果的函数
function createTouchRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.classList.add('touch-ripple');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    document.getElementById('game-canvas-container').appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// 10. 答案校验逻辑
function checkConstellationAnswer() {
    const levelData = constellationQuestions[constellationLevel];
    const correctStars = levelData.stars;
    
    const containerRect = document.getElementById('game-canvas-container').getBoundingClientRect();
    const correctPixelStars = correctStars.map(star => ({
        x: star.x * containerRect.width,
        y: star.y * containerRect.height
    }));

    if (constellationUserStars.length !== correctPixelStars.length) {
        showConstellationMessage("星星数量不对哦，再试试看！", false);
        return;
    }
    
    let isCorrect = true;
    const tolerance = 30;

    for (let userStarElement of constellationUserStars) {
        let foundMatch = false;
        const userX = parseFloat(userStarElement.style.left);
        const userY = parseFloat(userStarElement.style.top);
        for (let correctStar of correctPixelStars) {
            const dx = userX - correctStar.x;
            const dy = userY - correctStar.y;
            if (Math.sqrt(dx * dx + dy * dy) < tolerance) {
                foundMatch = true;
                break;
            }
        }
        if (!foundMatch) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        showConstellationMessage("答对了！你点亮了我们的星座！", true);
        document.getElementById('game-canvas-container').classList.add('correct-answer');
        setTimeout(() => {
            document.getElementById('game-canvas-container').classList.remove('correct-answer');
        }, 1000);
        
        document.getElementById('check-answer-btn').style.display = 'none';
        document.getElementById('guide-stars-container').innerHTML = '';

        if (constellationLevel < constellationQuestions.length - 1) {
            document.getElementById('next-level-btn').style.display = 'inline-block';
        } else {
            showConstellationFinalResult();
        }
    } else {
        showConstellationMessage("好像不太对哦，再想想看~", false);
    }
}

// 11. 进入下一题
function nextConstellationLevel() {
    constellationLevel++;
    document.getElementById('next-level-btn').style.display = 'none';
    document.getElementById('check-answer-btn').style.display = 'inline-block';
    document.getElementById('guide-stars-container').innerHTML = '';
    loadConstellationLevel();
}

// 12. 显示消息的函数
function showConstellationMessage(text, isCorrect) {
    const hintText = document.getElementById('hint-text');
    hintText.innerText = text;
    hintText.style.color = isCorrect ? '#4CAF50' : '#f44336';
    setTimeout(() => {
        hintText.innerText = constellationQuestions[constellationLevel].hint;
        hintText.style.color = 'rgba(255, 255, 255, 0.8)';
    }, 2000);
}

// 13. 显示最终结果的函数
function showConstellationFinalResult() {
    document.getElementById('game-hint').innerHTML = '<h2>恭喜你！完成了所有誓言！</h2><p>你用星辰，为我们的故事画上了最美的注脚。</p>';
}
