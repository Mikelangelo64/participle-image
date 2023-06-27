export const stopAnimation = (idAnimation) => {
  cancelAnimationFrame(idAnimation);
};

export const lerp = (current, target, ease, approximationLeft = 0.001) => {
  const val = current * (1 - ease) + target * ease;
  const diff = Math.abs(target - val);
  if (diff <= approximationLeft) {
    return target;
  }
  return val;
};
