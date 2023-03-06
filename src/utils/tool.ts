/**
 * 计算容器可容纳下的最大画布尺寸
 * @param containerWidth
 * @param containerHeight
 * @returns
 */
export const calcCanvasRect = (
  containerWidth: number,
  containerHeight: number
) => {
  // const maxWidth = 1920;
  // const maxHeight = 1080;
  const maxWidth = 800;
  const maxHeight = 450;
  const canvasRatio = 16 / 9;

  let width, height;
  // 4K屏幕，需要考虑最大值不能对于maxWidth * maxHeight
  if (containerWidth >= maxWidth && containerHeight >= maxHeight) {
    width = maxWidth;
    height = maxHeight;
  } else if (containerWidth / maxWidth < containerHeight / maxHeight) {
    width = containerWidth;
    height = containerWidth / canvasRatio;
  } else {
    width = containerHeight * canvasRatio;
    height = containerHeight;
  }

  return { height, width };
};
