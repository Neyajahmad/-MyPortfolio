import { useEffect, useRef } from 'react';

// A canvas-based particle trail that follows the mouse.
// Renders cyan/teal glowing dots that drift and fade — matching the reference screenshot.
export function ParticleTrailCursor({ parentRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef?.current;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;
    let mouse = { x: -999, y: -999 };

    // Resize canvas to match parent
    function resize() {
      canvas.width  = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    // Track mouse position relative to the parent element
    function onMouseMove(e) {
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    parent.addEventListener('mousemove', onMouseMove);

    // Hide trail when mouse leaves
    function onMouseLeave() { mouse.x = -999; mouse.y = -999; }
    parent.addEventListener('mouseleave', onMouseLeave);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        // Spread in the direction of travel with random burst
        this.vx = (Math.random() - 0.5) * 2.5;
        this.vy = (Math.random() - 0.5) * 2.5 - 0.5; // slight upward drift
        this.life = 1;           // 1 = fully visible
        this.decay = 0.018 + Math.random() * 0.022; // fade speed
        this.radius = 2 + Math.random() * 4;
        // Colour: cyan → teal range
        const hue = 170 + Math.random() * 30; // 170°–200° (cyan-teal)
        this.color = `hsla(${hue}, 100%, 60%, `;
      }

      update() {
        this.x  += this.vx;
        this.y  += this.vy;
        this.vy += 0.04;         // gentle gravity
        this.vx *= 0.97;         // drag
        this.life -= this.decay;
        this.radius *= 0.98;     // shrink as it fades
      }

      draw() {
        if (this.life <= 0) return;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter'; // additive glow
        // Soft glow: draw a blurred outer halo
        const grd = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 3
        );
        grd.addColorStop(0,   `${this.color}${this.life})`);
        grd.addColorStop(0.4, `${this.color}${this.life * 0.4})`);
        grd.addColorStop(1,   `${this.color}0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fill();
        // Bright core dot
        ctx.globalAlpha = this.life;
        ctx.fillStyle = `${this.color}1)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function loop() {
      // Clear with slight alpha so old particles leave a motion-blur trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn 4–6 particles per frame at mouse position
      if (mouse.x > 0) {
        const count = 4 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(
            mouse.x + (Math.random() - 0.5) * 6,
            mouse.y + (Math.random() - 0.5) * 6,
          ));
        }
      }

      // Update & draw surviving particles
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => { p.update(); p.draw(); });

      animId = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      cancelAnimationFrame(animId);
      parent.removeEventListener('mousemove', onMouseMove);
      parent.removeEventListener('mouseleave', onMouseLeave);
      ro.disconnect();
    };
  }, [parentRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
