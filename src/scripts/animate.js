const animate = (effect, ctx, canvas) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.draw(ctx);
  effect.update();

  requestAnimationFrame(() => {
    animate(effect, ctx, canvas);
  });
};

export default animate;
