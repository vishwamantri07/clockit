(() => {
    const page = document.body;
    const stage = document.getElementById('stage-art');
    const svg = document.querySelector('.factory-art');
    const upper = document.getElementById('robot-upper');
    const forearm = document.getElementById('robot-forearm');
    const head = document.getElementById('robot-head');
    const password = document.getElementById('password');
    const card = document.querySelector('.auth-card');
    const guideX = document.querySelector('.guide-x');
    const guideY = document.querySelector('.guide-y');
    const coordinates = document.querySelector('.coordinates');
    const guideLayer = document.querySelector('.pointer-guides');
    const sensorLine = document.getElementById('sensor-line');
    const nodes = [...document.querySelectorAll('.html-node')];
    const gears = [...document.querySelectorAll('.gear-ghost svg')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pointer = { x: innerWidth / 2, y: innerHeight / 2, vx: 0, vy: 0, lastX: 0, lastY: 0, lastTime: 0 };
    let gearAngle = 0;
    let gearVelocity = 0;

    function pivotArm(event) {
        if (!svg || page.classList.contains('privacy-mode') || reducedMotion) return;
        const matrix = svg.getScreenCTM();
        if (!matrix) return;
        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        const local = point.matrixTransform(matrix.inverse());
        const shoulder = Math.atan2(local.y - 350, local.x - 213) * 180 / Math.PI;
        const elbow = Math.atan2(local.y - 314, local.x - 247) * 180 / Math.PI;
        const wrist = Math.atan2(local.y - 273, local.x - 328) * 180 / Math.PI;
        upper.style.transform = `rotate(${shoulder + 46}deg)`;
        forearm.style.transform = `rotate(${elbow - shoulder + 19}deg)`;
        head.style.transform = `rotate(${wrist - elbow + 8}deg)`;
    }

    function updatePointer(event) {
        const now = performance.now();
        const elapsed = pointer.lastTime ? Math.max(8, now - pointer.lastTime) : 16;
        pointer.vx = (event.clientX - pointer.lastX) / elapsed;
        pointer.vy = (event.clientY - pointer.lastY) / elapsed;
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        pointer.lastX = event.clientX;
        pointer.lastY = event.clientY;
        pointer.lastTime = now;

        guideX.style.top = `${pointer.y}px`;
        guideY.style.left = `${pointer.x}px`;
        coordinates.style.left = `${Math.min(pointer.x + 13, innerWidth - 205)}px`;
        coordinates.style.top = `${Math.min(pointer.y + 10, innerHeight - 30)}px`;
        coordinates.innerHTML = `X: ${Math.round(pointer.x).toString().padStart(3, '0')} | Y: ${Math.round(pointer.y).toString().padStart(3, '0')} <b>STATUS: READY</b>`;

        let closest = null;
        let shortest = 100;
        for (const node of nodes) {
            const rect = node.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.hypot(pointer.x - centerX, pointer.y - centerY);
            node.classList.toggle('near', distance < 100);
            if (distance < shortest) {
                shortest = distance;
                closest = { x: centerX, y: centerY };
            }
        }
        if (closest) {
            sensorLine.setAttribute('x1', pointer.x);
            sensorLine.setAttribute('y1', pointer.y);
            sensorLine.setAttribute('x2', closest.x);
            sensorLine.setAttribute('y2', closest.y);
            sensorLine.style.opacity = Math.max(0, 1 - shortest / 100).toFixed(2);
        }
        pivotArm(event);
    }

    if (!reducedMotion) {
        window.addEventListener('pointermove', updatePointer, { passive: true });
        window.addEventListener('pointerleave', () => nodes.forEach(node => node.classList.remove('near')));
        card?.addEventListener('mouseenter', () => guideLayer.classList.add('hidden'));
        card?.addEventListener('mouseleave', () => guideLayer.classList.remove('hidden'));
        stage?.addEventListener('mouseenter', () => gears.forEach(gear => gear.parentElement.classList.add('rolling')));
        stage?.addEventListener('mouseleave', () => gears.forEach(gear => gear.parentElement.classList.remove('rolling')));

        const tick = () => {
            const speed = Math.hypot(pointer.vx, pointer.vy);
            const targetVelocity = Math.min(speed * 0.045, 5);
            gearVelocity += (targetVelocity - gearVelocity) * 0.055;
            gearVelocity *= 0.992;
            gearAngle += gearVelocity;
            gears.forEach((gear, index) => {
                const direction = index === 1 ? -1 : 1;
                gear.style.transform = `rotate(${gearAngle * direction}deg)`;
            });
            pointer.vx *= 0.91;
            pointer.vy *= 0.91;
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    password?.addEventListener('focus', () => {
        page.classList.add('privacy-mode');
        upper?.style.removeProperty('transform');
        forearm?.style.removeProperty('transform');
        head?.style.removeProperty('transform');
    });
    password?.addEventListener('blur', () => {
        page.classList.remove('privacy-mode');
        if (pointer.lastTime) pivotArm({ clientX: pointer.x, clientY: pointer.y });
    });

    const form = document.getElementById('login-form');
    const feedback = document.getElementById('form-feedback');
    const email = document.getElementById('email');
    form?.addEventListener('submit', event => {
        event.preventDefault();
        document.getElementById('email-error').textContent = '';
        document.getElementById('password-error').textContent = '';
        feedback.textContent = '';
        feedback.className = 'form-feedback';
        let valid = true;
        if (!email.value.trim() || !email.validity.valid) {
            document.getElementById('email-error').textContent = 'Enter a valid email address.';
            valid = false;
        }
        if (!password.value) {
            document.getElementById('password-error').textContent = 'Enter your password.';
            valid = false;
        }
        if (!valid) {
            feedback.textContent = 'Check the highlighted fields and try again.';
            feedback.classList.add('error');
            return;
        }
        feedback.textContent = 'Sign-in service is not connected in this preview.';
        feedback.classList.add('success');
    });

    document.getElementById('forgot-link')?.addEventListener('click', event => {
        event.preventDefault();
        feedback.textContent = 'Please contact your system administrator to reset access.';
        feedback.className = 'form-feedback';
        feedback.classList.add('success');
    });
})();
