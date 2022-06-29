import * as R from "ramda";

const view = (dispatch, model) => {
  const { images, source } = model;
  return R.join("\n", [progressBar(images)]);
};

const progressBar = (images) => {
  const step = 2;

  const percent = progress(images);
  const watermarked = Math.floor(progress(images) / step);
  const remain = 100 / step - watermarked;

  const watermakedDots = ".".repeat(watermarked);
  const remainDots = " ".repeat(remain);
  const roundedPercent = Math.floor(percent) || 0;

  return `[${watermakedDots}${remainDots}] ${roundedPercent} %`;
};

const progress = (images) => {
  const watermarked = images.filter((image) => image.watermarked === true);
  return (watermarked.length / images.length) * 100;
};

export default view;
