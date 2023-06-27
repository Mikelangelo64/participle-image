import Particle from './Particle';
import vevet from './config/vevet';

class Effect {
  constructor(width, height, img) {
    this.width = width;
    this.height = height / 2;
    this.particlesArray = [];
    this.image = img;
    // this.centerX = this.width * 0.5;
    // this.centerY = this.height * 0.5;
    // this.x = this.centerX - this.image.width * 0.5;
    // this.y = this.centerY - this.image.height * 0.5;

    this.hRatio = this.width / this.image.width;
    this.vRatio = this.height / this.image.height;
    this.ratio = Math.min(this.hRatio, this.vRatio);
    this.x = (this.width - this.image.width * this.ratio) * 0.5;
    this.y = (this.height + 100 - this.image.height * this.ratio) * 0.5;

    this.gap = 8;
    this.mouse = {
      radius: 3000,
      x: undefined,
      y: undefined,
    };

    if (vevet.isMobile) {
      window.addEventListener('touchstart', (evt) => {
        document.body.classList.add('lock');
        document.documentElement.classList.add('lock');

        this.mouse.x = evt.changedTouches[0].clientX;
        this.mouse.y = evt.changedTouches[0].clientY;
      });

      window.addEventListener('touchmove', (evt) => {
        this.mouse.x = evt.changedTouches[0].clientX;
        this.mouse.y = evt.changedTouches[0].clientY;
      });

      window.addEventListener('touchend', () => {
        document.body.classList.remove('lock');
        document.documentElement.classList.remove('lock');

        this.mouse.x = undefined;
        this.mouse.y = undefined;
      });
    } else {
      window.addEventListener('mousemove', (evt) => {
        this.mouse.x = evt.x;
        this.mouse.y = evt.y;
      });
    }
  }

  init(context) {
    // this.image.onload = () => {
    context.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.x,
      this.y,
      this.image.width * this.ratio,
      this.image.height * this.ratio
    );
    const pixels = context.getImageData(0, 0, this.width, this.height).data;

    for (let y = 0; y < this.height; y += this.gap) {
      for (let x = 0; x < this.width; x += this.gap) {
        const index = (y * this.width + x) * 4;
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const alpha = pixels[index + 3];

        const color = `rgb(${red}, ${green}, ${blue})`;

        if (alpha > 0) {
          this.particlesArray.push(new Particle(this, x, y, color));
        }
      }
    }
    // };
  }

  draw(context) {
    this.particlesArray.forEach((particle) => {
      particle.draw(context);
    });
  }

  update() {
    this.particlesArray.forEach((particle) => {
      particle.update();
    });
  }

  warp() {
    let counter = 27;

    this.particlesArray.forEach((particle, index) => {
      particle.posX();

      if (counter <= index + 27) {
        counter += 27;
      }

      setTimeout(() => {
        particle.warp();
      }, counter * 8);
    });
  }
}

export default Effect;
