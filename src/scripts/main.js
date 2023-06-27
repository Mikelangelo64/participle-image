// import vevet from './config/vevet';
import Effect from './Effect';
import animate from './animate';
import createCanvas from './createCanvas';

const init = () => {
  const canvasArray = document.querySelectorAll('.canvas');

  if (canvasArray.length !== 0) {
    canvasArray.forEach((canvasDom) => {
      const { canvas, ctx } = createCanvas(canvasDom);
      const img = document.querySelector('img');

      if (!canvas || !ctx || !img) {
        return;
      }

      // img.onload = () => {
      const effect = new Effect(canvas.width, canvas.height, img);
      effect.init(ctx);
      // console.log(effect.particlesArray);

      animate(effect, ctx, canvas);

      // warp button
      const warpButton = document.querySelector('.warp');
      warpButton.addEventListener('click', () => {
        effect.warp();
      });
      // };
    });
  }
};

export default init;
