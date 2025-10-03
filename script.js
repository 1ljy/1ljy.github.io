// --- 全局变量 ---
const startDate = new Date('2022-03-27');
const constellationQuestions = [
    { correctSequence: [0, 1, 2, 5, 8, 7, 6], hint: "指引方向，永恒不变" },
    { correctSequence: [4, 1, 3, 5, 7], hint: "夜空中最亮的恒星" }
];
let constellationLevel = 0;
let userSequence = [];

// --- 初始化应用 ---
document.addEventListener('DOMContentLoaded', () => {
    // 更新天数
    updateDaysCounter();
    setInterval(updateDaysCounter, 1000 * 60 * 60);

    // 视图切换
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => switchView(item.dataset.view));
    });

    // 情书解锁
    document.getElementById('unlockBtn').addEventListener('click', unlockLetter);

    // 星空游戏
    initConstellationGame();

    // 照片查看器
    initPhotoViewer();
});

// --- 视图切换 ---
function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(`${viewId}-view`).classList.add('active');
    event.target.classList.add('active');
}

// --- 更新天数 ---
function updateDaysCounter() {
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    document.querySelectorAll('.days-counter').forEach(el => el.textContent = diffDays);
}

// --- 情书解锁 ---
function unlockLetter() {
    const input = document.getElementById('birthdayInput').value;
    const herBirthday = "2003-01-04";
    const diffDays = getDaysTogether();
    
    if (input === herBirthday) {
        const letterText = `亲爱的,\n\n当你看到这些文字时，我们已经携手走过了${diffDays}个日夜...`;
        document.getElementById('unlockForm').style.display = 'none';
        document.getElementById('letterContent').style.display = 'block';
        typeWriter('letterContent', letterText);
    }
}

// --- 星空游戏 ---
function initConstellationGame() {
    const grid = document.getElementById('star-grid');
    // 创建九宫格
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        grid.appendChild(cell);
    }

    document.getElementById('startGameBtn').addEventListener('click', startConstellationGame);
    document.getElementById('checkAnswerBtn').addEventListener('click', checkConstellationAnswer);
}

function startConstellationGame() {
    constellationLevel = 0;
    userSequence = [];
    document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.remove('active'));
    document.getElementById('startGameBtn').style.display = 'none';
    document.getElementById('checkAnswerBtn').style.display = 'inline-block';
    loadConstellationLevel();
}

function loadConstellationLevel() {
    document.getElementById('gameHint').textContent = constellationQuestions[constellationLevel].hint;
}

function handleCellClick(index) {
    if (userSequence.length === constellationQuestions[constellationLevel].correctSequence.length) return;
    
    userSequence.push(index);
    document.querySelectorAll('.grid-cell')[index].classList.add('active');
}

function checkConstellationAnswer() {
    const correctSequence = constellationQuestions[constellationLevel].correctSequence;
    let isCorrect = userSequence.length === correctSequence.length;
    
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== correctSequence[i]) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        document.getElementById('gameHint').textContent = "答对了！你点亮了我们的星座！";
        if (constellationLevel < constellationQuestions.length - 1) {
            constellationLevel++;
            setTimeout(() => {
                userSequence = [];
                document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.remove('active'));
                loadConstellationLevel();
            }, 1500);
        } else {
            // 游戏结束
            document.getElementById('gameHint').textContent = "恭喜你！完成了所有誓言！";
        }
    } else {
        document.getElementById('gameHint').textContent = "好像不太对哦，再想想看~";
        userSequence = [];
        document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.remove('active'));
    }
}

// --- 其他辅助函数 ---
function typeWriter(elementId, text) {
    // ... 打字机效果实现 ...
}

function initPhotoViewer() {
    // ... 照片查看器实现 ...
}
