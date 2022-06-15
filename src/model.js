const initModel = {
  sourceDir: "input",
  targetDir: "output",
  signatureDir: "signature",
  signature: "signature.png",

  sizePercent: 15,
  offsetX: 10,
  offsetY: 10,

  currentId: 0,
  source: null,
  watermarked: false,
  target: null,

  images: [
    {
      id: 0,
      source: "chair.jpg",
      watermarked: false,
      target: null,
    },
    {
      id: 1,
      source: "desk.jpg",
      watermarked: false,
      target: null,
    },
    {
      id: 2,
      source: "laptop.jpg",
      watermarked: false,
      target: null,
    },
  ],
};

export default initModel;
