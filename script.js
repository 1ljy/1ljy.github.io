document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 音乐控制 (静音自动播放，点击后有声) ---
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.4;
    bgMusic.muted = true;
    bgMusic.play().catch(e => console.log("Autoplay prevented"));

    document.body.addEventListener('click', () => {
        if (bgMusic.muted) {
            bgMusic.muted = false;
            bgMusic.play();
        }
    }, { once: true });

    // --- 2. 粒子背景配置 ---
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    // --- 3. 打字机效果 ---
    const typewriterElement = document.getElementById('typewriter');
    const text = "Happy 3rd Anniversary";
    let index = 0;
    function type() {
        if (index < text.length) {
            typewriterElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    setTimeout(type, 500); // 延迟半秒开始

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
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // --- 6. 信件解锁 (已填入你的生日) ---
    window.checkBirthday = function() {
        const input = document.getElementById('birthdayInput').value;
        const herBirthday = "2003-01-04"; // 你女友的生日

        if (input === herBirthday) {
            document.getElementById('unlockForm').style.display = 'none';
            document.getElementById('letterContent').style.display = 'block';
        } else {
            alert("哎呀，好像不对哦，再想想看？😉");
        }
    };
});
