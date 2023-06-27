class Particle {
  constructor(effect, x, y, color) {
    this.effect = effect;

    // this.x = Math.random() * this.effect.width;
    // this.y = Math.random() * this.effect.height;

    this.radius = this.effect.gap - 4;
    this.xRandom = Math.random() * this.effect.width;
    this.yRandom = Math.random() * this.effect.height;
    this.x = this.xRandom;
    this.y = this.yRandom;

    this.originX = Math.floor(x);
    this.originY = Math.floor(y);
    this.color = color;
    this.size = this.effect.gap;
    // this.vx = Math.random() * 2 - 1;
    // this.vy = Math.random() * 2 - 1;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.1;
    this.friction = 0.6;
    this.dx = 0;
    this.dy = 0;
    this.distance = 0;
    this.force = 0;
    this.angle = 0;
  }

  draw(context) {
    context.fillStyle = this.color;
    // context.fillRect(this.x, this.y, this.size, this.size);
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
  }

  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -this.effect.mouse.radius / this.distance;

    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }

    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
    // this.x += (this.originX - this.x) * this.ease;
    // this.y += (this.originY - this.y) * this.ease;
  }

  warp() {
    // this.x = Math.random() * this.effect.width;
    // this.x = this.xRandom;
    // this.y = this.yRandom;
    this.ease = 0.08;
  }

  random() {
    this.xRandom = Math.random() * this.effect.width;
    this.yRandom = Math.random() * this.effect.height;

    this.x = this.xRandom;
    this.y = this.yRandom;

    this.ease = 0;
  }

  posX() {
    this.xRandom = this.originX;
    this.yRandom = 0;

    this.x = this.xRandom;
    this.y = this.yRandom;

    this.ease = 0;
  }
}

export default Particle;
