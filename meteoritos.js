// meteoritos.js

// Definimos la función global que podrás invocar cuando quieras
window.iniciarMeteoritos = function () {
  const canvas = document.getElementById('spaceCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const PIXEL_SIZE = 2; 

  // DETECTOR TÁCTIL EN TIEMPO REAL: Identifica celulares y tablets
  const esCelular = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class PixelSpark {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;

      const factorVelocidad = esCelular ? 0.5 : 1.0;
      this.vx = (Math.random() - 0.5) * 1.5 * factorVelocidad;
      this.vy = (Math.random() - 0.5) * 1.5 * factorVelocidad;
      
      this.life = 1;

      this.decay = esCelular ? (Math.random() * 0.04 + 0.02) : (Math.random() * 0.06 + 0.03);
      this.color = color;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
    }

    draw(globalOpacity) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life * globalOpacity);
      ctx.fillStyle = this.color;
      const px = Math.floor(this.x / PIXEL_SIZE) * PIXEL_SIZE;
      const py = Math.floor(this.y / PIXEL_SIZE) * PIXEL_SIZE;
      ctx.fillRect(px, py, PIXEL_SIZE, PIXEL_SIZE);
      ctx.restore();
    }
  }

  class PixelMeteor {
    constructor() {
      this.active = false;
      this.sparks = [];
    }

    spawn() {
      this.active = true;
      this.thickness = 2;
      
      const hue = Math.random() * 20 + 200;
      this.headColor = `hsl(${hue}, 20%, 95%)`;
      this.trailColor = `hsl(${hue}, 20%, 80%)`;

      const imgWidth = Math.min(canvas.width, canvas.height * (16 / 9));
      const minX = (canvas.width - imgWidth) / 2;
      const maxX = minX + imgWidth;

      const spawnFromTop = Math.random() < 0.7;

      const baseVelocidad = esCelular ? (Math.random() * 3 + 4.5) : (Math.random() * 8 + 8);

      if (spawnFromTop) {
        this.x = minX + Math.random() * imgWidth;
        this.y = -20;
        
        const isLeft = this.x < (minX + imgWidth / 2);
        const angle = (Math.random() * Math.PI * 0.25) + (Math.PI * 0.1);
        this.vx = Math.cos(angle) * baseVelocidad * (isLeft ? 1 : -1);
        this.vy = Math.sin(angle) * baseVelocidad;
      } else {
        const isLeftEdge = Math.random() < 0.5;
        this.x = isLeftEdge ? minX : maxX;
        
        this.y = Math.random() * (canvas.height * (esCelular ? 0.20 : 0.35));

        const angle = (Math.random() * Math.PI * 0.2) + (Math.PI * 0.15); 
        this.vx = Math.cos(angle) * baseVelocidad * (isLeftEdge ? 1 : -1);
        this.vy = Math.sin(angle) * baseVelocidad;
      }

      this.distanceTraveled = 0;

      this.maxDistance = esCelular ? (Math.random() * 180 + 180) : (Math.random() * 450 + 450); 
      
      this.opacity = 1;
      this.sparks = [];
    }

    update() {
      if (!this.active) return;

      this.x += this.vx;
      this.y += this.vy;

      const frameDistance = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      this.distanceTraveled += frameDistance;

      const fadeStart = this.maxDistance * 0.65;
      if (this.distanceTraveled > fadeStart) {
        const progress = (this.distanceTraveled - fadeStart) / (this.maxDistance - fadeStart);
        this.opacity = Math.max(0, 1 - progress);
      }

      if (this.opacity > 0.4 && Math.random() < 0.12) {
        this.sparks.push(new PixelSpark(this.x, this.y, this.trailColor));
      }

      this.sparks.forEach((spark, index) => {
        spark.update();
        if (spark.life <= 0) this.sparks.splice(index, 1);
      });

      const limiteAlturaMax = esCelular ? (canvas.height * 0.48) : (canvas.height * 0.62);

      if (this.distanceTraveled >= this.maxDistance || this.opacity <= 0 || this.y > limiteAlturaMax) {
        this.active = false;
      }
    }

    draw() {
      if (!this.active || this.opacity <= 0) return;

      this.sparks.forEach(spark => spark.draw(this.opacity));

      const steps = 16;
      const angle = Math.atan2(this.vy, this.vx);
      const trailLength = (Math.sqrt(this.vx * this.vx + this.vy * this.vy) * 3.2);

      ctx.save();
      ctx.globalAlpha = this.opacity;

      for (let i = 0; i < steps; i++) {
        const progress = i / steps;
        const px = this.x - Math.cos(angle) * (trailLength * progress);
        const py = this.y - Math.sin(angle) * (trailLength * progress);

        const gridX = Math.floor(px / PIXEL_SIZE) * PIXEL_SIZE;
        const gridY = Math.floor(py / PIXEL_SIZE) * PIXEL_SIZE;

        ctx.fillStyle = i < 3 ? this.headColor : this.trailColor;
        ctx.globalAlpha = this.opacity * (1 - progress);

        ctx.fillRect(gridX, gridY, PIXEL_SIZE * this.thickness, PIXEL_SIZE * this.thickness);
      }

      ctx.restore();
    }
  }

  const meteors = Array.from({ length: 8 }, () => new PixelMeteor());

  let spawnTimer = 0;
  let nextSpawnTime = 10; 

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const activeMeteors = meteors.filter(m => m.active);

    spawnTimer++;

    if (spawnTimer >= nextSpawnTime) {
      const maxSimultaneous = Math.floor(Math.random() * 3) + 2; 

      if (activeMeteors.length < maxSimultaneous) {
        const inactiveMeteor = meteors.find(m => !m.active);
        if (inactiveMeteor) {
          inactiveMeteor.spawn();
        }
      }

      spawnTimer = 0;
      const rangoAparicion = esCelular ? 120 : 60;
      nextSpawnTime = Math.floor(Math.random() * rangoAparicion + 12); 
    }

    meteors.forEach(m => {
      m.update();
      m.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
};
