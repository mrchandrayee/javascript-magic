const c = document.getElementById('canvas');
    const ctx = c.getContext('2d');
    let w = c.width = window.innerWidth;
    let h = c.height = window.innerHeight;
    
    window.addEventListener('resize', () => { 
        w = c.width = window.innerWidth; 
        h = c.height = window.innerHeight; 
    });
    
    const particles = [];
    
    class Star {
        constructor(x, y, color) {
            this.x = x; 
            this.y = y; 
            this.c = color; 
            this.a = 1; 
            
            const ang = Math.random() * Math.PI * 2;
            const spd = Math.random() * 8 + 2;
            this.vx = Math.cos(ang) * spd; 
            this.vy = Math.sin(ang) * spd;
            
            this.s = Math.random() * 6 + 4; 
            this.r = Math.random() * Math.PI; 
            this.rs = (Math.random() - 0.5) * 0.4;
        }
        
        update() {
            this.vx *= 0.96; 
            this.vy *= 0.96; 
            this.vy += 0.1;
            this.x += this.vx; 
            this.y += this.vy; 
            this.a -= 0.015; 
            this.r += this.rs;
        }
        
        draw() {
            ctx.globalAlpha = Math.max(0, this.a); 
            ctx.fillStyle = this.c;
            ctx.save(); 
            ctx.translate(this.x, this.y); 
            ctx.rotate(this.r); 
            ctx.beginPath();
            for(let i = 0; i < 10; i++) {
                let rad = i % 2 === 0 ? this.s : this.s / 2.5;
                let a = (Math.PI / 5) * i;
                ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
            }
            ctx.closePath(); 
            ctx.fill(); 
            ctx.restore();
        }
    }

    const explode = (x, y) => {
        const color = `hsl(${Math.random() * 360}, 100%, 65%)`; 
        for(let i = 0; i < 60; i++) {
            particles.push(new Star(x, y, color));
        }
    };

    window.addEventListener('pointerdown', e => explode(e.clientX, e.clientY));
    (function loop() {
        ctx.globalCompositeOperation = 'source-over'; 
        ctx.globalAlpha = 0.3; 
        ctx.fillStyle = '#050510'; 
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter'; 
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update(); 
            particles[i].draw();
            if (particles[i].a <= 0) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(loop);
    })();