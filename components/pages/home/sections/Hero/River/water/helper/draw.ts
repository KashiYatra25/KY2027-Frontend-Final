import {
  WATER_GRADIENT_STOPS,
  WATER_GRADIENT_STOPS_BY_THEME,
  MOON_GRADIENT_STOPS,
  type Particle,
  type Sparkle,
  type ComputedValues,
} from "./elements";

export function drawWaterGradient(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  timeOfDay: string = "night"
) {
  const stops = WATER_GRADIENT_STOPS_BY_THEME[timeOfDay] ?? WATER_GRADIENT_STOPS;
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  for (let i = 0; i < stops.length; i++) {
    const { offset, color } = stops[i];
    grad.addColorStop(offset, color);
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

export function drawMoonlightReflection(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const grad = ctx.createRadialGradient(w * 0.5, 0, 0, w * 0.5, h * 0.3, w * 0.5);
  for (let i = 0; i < MOON_GRADIENT_STOPS.length; i++) {
    const { offset, color } = MOON_GRADIENT_STOPS[i];
    grad.addColorStop(offset, color);
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

export function drawWaveLayers(
  ctx: CanvasRenderingContext2D,
  w: number,
  time: number,
  computed: ComputedValues
) {
  const { waveLayers, waveXCoords } = computed;
  const len = waveLayers.length;
  const xLen = waveXCoords.length;

  for (let i = 0; i < len; i++) {
    const layer = waveLayers[i];
    const {
      y,
      freq,
      speed,
      amp,
      freqMultiplied,
      speedMultiplied,
      ampHalf,
      ampThird,
      color,
      alpha,
    } = layer;
    const timeSpeed = time * speed;
    const timeSpeedMult = time * speedMultiplied;
    const timeSpeedSlow = time * speed * 0.7;

    ctx.beginPath();
    ctx.moveTo(0, y);

    for (let j = 0; j < xLen; j++) {
      const x = waveXCoords[j];
      const xFreq = x * freq;
      const waveY =
        y +
        Math.sin(xFreq + timeSpeed) * amp +
        Math.sin(x * freqMultiplied + timeSpeedMult) * ampHalf +
        Math.sin(xFreq * 0.5 + timeSpeedSlow) * ampThird;
      ctx.lineTo(x, waveY);
    }

    ctx.lineTo(w, y + 20);
    ctx.lineTo(0, y + 20);
    ctx.closePath();
    ctx.fillStyle = `rgba(${color}, ${alpha})`;
    ctx.fill();
  }
}

export function drawFlowLines(
  ctx: CanvasRenderingContext2D,
  time: number,
  computed: ComputedValues
) {
  const { flowLineYs, flowLineXCoords } = computed;
  const yLen = flowLineYs.length;
  const xLen = flowLineXCoords.length;

  ctx.strokeStyle = "rgba(180, 210, 240, 0.04)";
  ctx.lineWidth = 1;

  for (let i = 0; i < yLen; i++) {
    const baseY = flowLineYs[i];
    const timeOffset = time + i * 0.5;

    ctx.beginPath();
    for (let j = 0; j < xLen; j++) {
      const x = flowLineXCoords[j];
      const offset = Math.sin(x * 0.01 + timeOffset) * 3;
      if (j === 0) ctx.moveTo(x, baseY + offset);
      else ctx.lineTo(x, baseY + offset);
    }
    ctx.stroke();
  }
}

export function drawRipples(ctx: CanvasRenderingContext2D, time: number, computed: ComputedValues) {
  const { rippleBases, width: w, height: h } = computed;
  const len = rippleBases.length;
  const halfTime = time * 0.5;

  ctx.lineWidth = 1.5;

  for (let i = 0; i < len; i++) {
    const base = rippleBases[i];
    const rippleTime = (halfTime + base.timeOffset) % 4;
    const rippleX = w * base.xRatio + Math.sin(time + i) * 20;
    const rippleY = h * base.yRatio + Math.cos(halfTime + i) * 10;
    const rippleRadius = rippleTime * 25;
    const rippleAlpha = Math.max(0, 0.15 - rippleTime * 0.04);

    ctx.beginPath();
    ctx.arc(rippleX, rippleY, rippleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(200, 230, 255, ${rippleAlpha})`;
    ctx.stroke();

    if (rippleRadius > 10) {
      ctx.beginPath();
      ctx.arc(rippleX, rippleY, rippleRadius * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(200, 230, 255, ${rippleAlpha * 0.6})`;
      ctx.stroke();
    }
  }
}

export function drawDiyaReflections(
  ctx: CanvasRenderingContext2D,
  time: number,
  computed: ComputedValues
) {
  const { diyaPositions } = computed;
  const len = diyaPositions.length;
  const time3 = time * 3;

  for (let i = 0; i < len; i++) {
    const { x, y } = diyaPositions[i];
    const flicker = 0.7 + Math.sin(time3 + i * 2) * 0.3;
    const flickerRadius = 50 * flicker;

    const grad = ctx.createRadialGradient(x, y, 0, x, y, flickerRadius);
    grad.addColorStop(0, `rgba(255, 180, 80, ${0.4 * flicker})`);
    grad.addColorStop(0.4, `rgba(255, 150, 50, ${0.2 * flicker})`);
    grad.addColorStop(1, "rgba(255, 120, 30, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(x - 60, y - 60, 120, 120);

    ctx.beginPath();
    ctx.ellipse(x, y + 15, 25 * flicker, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 160, 60, ${0.25 * flicker})`;
    ctx.fill();
  }
}

export function drawSparkles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  sparkles: Sparkle[]
) {
  const len = sparkles.length;
  const halfH = h * 0.5;
  const time2 = time * 2;

  for (let i = 0; i < len; i++) {
    const sparkle = sparkles[i];
    sparkle.life += 1;

    if (sparkle.life > sparkle.maxLife) {
      sparkle.life = 0;
      sparkle.x = Math.random() * w;
      sparkle.y = Math.random() * halfH;
      sparkle.maxLife = 80 + Math.random() * 60;
    }

    const lifeRatio = sparkle.life / sparkle.maxLife;
    const alpha = lifeRatio < 0.5 ? lifeRatio * 2 : (1 - lifeRatio) * 2;
    const size = 1 + alpha * 2;

    ctx.beginPath();
    ctx.arc(sparkle.x + Math.sin(time2 + sparkle.x) * 2, sparkle.y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
    ctx.fill();
  }
}

export function drawParticles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  particles: Particle[]
) {
  const len = particles.length;
  const time2 = time * 2;

  for (let i = 0; i < len; i++) {
    const p = particles[i];
    p.x += p.speed;
    p.y += Math.sin(time2 + p.x * 0.01) * 0.3;

    if (p.x > w + 20) {
      p.x = -20;
      p.y = Math.random() * h;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(time + p.x * 0.01);

    ctx.beginPath();
    if (p.type === 0) {
      ctx.ellipse(0, 0, p.size, p.size * 0.4, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(80, 120, 60, ${p.opacity})`;
    } else if (p.type === 1) {
      ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 180, 150, ${p.opacity})`;
    } else {
      ctx.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 119, 101, ${p.opacity})`;
    }
    ctx.fill();
    ctx.restore();
  }
}

export function drawMist(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const mistH = h * 0.25;
  const grad = ctx.createLinearGradient(0, 0, 0, mistH);
  grad.addColorStop(0, "rgba(180, 200, 220, 0.08)");
  grad.addColorStop(0.5, "rgba(160, 180, 200, 0.04)");
  grad.addColorStop(1, "rgba(140, 160, 180, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, mistH);
}

export function drawForegroundWave(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  computed: ComputedValues
) {
  const { foregroundXCoords } = computed;
  const len = foregroundXCoords.length;
  const baseY = h * 0.9;
  const time15 = time * 1.5;
  const time2 = time * 2;
  const time08 = time * 0.8;

  ctx.beginPath();
  ctx.moveTo(0, baseY);

  for (let i = 0; i < len; i++) {
    const x = foregroundXCoords[i];
    const y =
      baseY +
      Math.sin(x * 0.012 + time15) * 6 +
      Math.sin(x * 0.02 + time2) * 3 +
      Math.sin(x * 0.005 + time08) * 8;
    ctx.lineTo(x, y);
  }

  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fillStyle = "rgba(60, 100, 140, 0.15)";
  ctx.fill();
}

export function drawCaustics(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  const baseY = h * 0.6;
  const time30 = time * 30;
  const time2 = time * 2;
  const wPlus100 = w + 100;
  const sinTime2 = Math.sin(time2) * 5;
  const cosTime2 = Math.cos(time2) * 5;

  ctx.strokeStyle = "rgba(200, 230, 255, 0.03)";
  ctx.lineWidth = 2;

  for (let i = 0; i < 8; i++) {
    const cx = ((w * 0.1 + i * w * 0.12 + time30) % wPlus100) - 50;
    const cy = baseY + Math.sin(time + i) * 30;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.bezierCurveTo(cx + 20, cy - 10 + sinTime2, cx + 40, cy + 10 + cosTime2, cx + 60, cy);
    ctx.stroke();
  }
}
