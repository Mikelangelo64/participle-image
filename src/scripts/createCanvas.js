const createCanvas = (canvasDom) => {
  if (!canvasDom) {
    return { canvas: undefined, ctx: undefined };
  }

  const canvas = canvasDom;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  return { canvas, ctx };
};

export default createCanvas;
