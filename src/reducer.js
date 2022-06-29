import * as R from "ramda";

const MESSAGES = {
  IMAGES: "IMAGES",
  CURRENT_ID: "CURRENT_ID",
  WATERMARKED: "WATERMARKED",
  TARGET: "TARGET",
  SAVE_IMAGE: "SAVE_IMAGE",
};

const imagesMessage = (sources) => ({
  type: MESSAGES.IMAGES,
  sources,
});

const currentIdMessage = (currentId) => ({
  type: MESSAGES.CURRENT_ID,
  currentId,
});

const watermarkedMessage = (watermarked) => ({
  type: MESSAGES.WATERMARKED,
  watermarked,
});

const targetMessage = (target) => ({
  type: MESSAGES.TARGET,
  target,
});

const saveImageMessage = { type: MESSAGES.SAVE_IMAGE };

const reducer = (message, model) => {
  switch (message.type) {
    case MESSAGES.IMAGES: {
      const { sources } = message;
      const images = sources.map((source, id) => ({
        id,
        source,
        watermarked: false,
        target: null,
      }));
      return { ...model, images };
    }
    case MESSAGES.CURRENT_ID: {
      const { currentId } = message;
      const { images } = model;
      const currentImage = images.find((image) => image.id === currentId);
      const { source, watermarked, target } = currentImage;
      return { ...model, currentId, source, watermarked, target };
    }
    case MESSAGES.WATERMARKED: {
      const { watermarked } = message;
      return { ...model, watermarked };
    }
    case MESSAGES.TARGET: {
      const { target } = message;
      return { ...model, target };
    }
    case MESSAGES.SAVE_IMAGE: {
      const { currentId, source, watermarked, target } = model;
      const images = model.images.map((image) => {
        if (image.id === currentId) {
          return { ...image, source, watermarked, target };
        }
        return image;
      });
      return { ...model, images };
    }
  }
  return model;
};

export default reducer;
export {
  imagesMessage,
  currentIdMessage,
  watermarkedMessage,
  targetMessage,
  saveImageMessage,
};
