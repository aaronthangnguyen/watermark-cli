import * as R from "ramda";

const MESSAGES = {
  TARGET_DIR: "TARGET_DIR",
  SIGNATURE_DIR: "SIGNATURE_DIR",
  SIGNATURE: "SIGNATURE",
  IMAGES: "IMAGES",
  SAVE_IMAGE: "SAVE_IMAGE",
  CURRENT_ID: "CURRENT_ID",
  WATERMARKED_INPUT: "WATERMARKED_INPUT",
  TARGET_INPUT: "TARGET_INPUT",
};

const sourceDirMessage = (sourceDir) => ({
  type: MESSAGES.SOURCE_DIR,
  sourceDir,
});

const targetDirMessage = (targetDir) => ({
  type: MESSAGES.TARGET_DIR,
  targetDir,
});

const signatureDirMessage = (signatureDir) => ({
  type: MESSAGES.SIGNATURE_DIR,
  signatureDir,
});

const signatureMessage = (signature) => ({
  type: MESSAGES.SIGNATURE,
  signature,
});

const imagesMessage = (sources) => ({
  type: MESSAGES.IMAGES,
  sources,
});

const currentIdMessage = (currentId) => ({
  type: MESSAGES.CURRENT_ID,
  currentId,
});

const watermarkedInputMessage = (watermarked) => ({
  type: MESSAGES.WATERMARKED_INPUT,
  watermarked,
});

const targetInputMessage = (target) => ({
  type: MESSAGES.TARGET_INPUT,
  target,
});

const saveImageMessage = { type: MESSAGES.SAVE_IMAGE };

const reducer = (message, model) => {
  switch (message.type) {
    case MESSAGES.SOURCE_DIR: {
      const { sourceDir } = message;
      return { ...model, sourceDir };
    }
    case MESSAGES.TARGET_DIR: {
      const { targetDir } = message;
      return { ...model, targetDir };
    }
    case MESSAGES.SIGNATURE_DIR: {
      const { signatureDir } = message;
      return { ...model, signatureDir };
    }
    case MESSAGES.SIGNATURE: {
      const { signature } = message;
      return { ...model, signature };
    }
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
    case MESSAGES.SAVE_IMAGE: {
      const { currentId, watermarked, target } = model;

      const images = R.map((image) => {
        if (image.id === currentId) {
          return { ...image, watermarked, target };
        }
        return image;
      }, model.images);

      return {
        ...model,
        currentId: null,
        watermarked: false,
        target: null,
        images,
      };
    }
    case MESSAGES.CURRENT_ID: {
      const { images } = model;
      const { currentId } = message;
      console.error(`Current ID: ${currentId}`);
      const currentImage = R.find((image) => image.id === currentId, images);
      const { source, watermarked, target } = currentImage;
      return {
        ...model, //
        currentId,
        source,
        watermarked,
        target,
      };
    }
    case MESSAGES.WATERMARKED_INPUT: {
      const { watermarked } = message;
      return {
        ...model,
        watermarked,
      };
    }
  }

  return model;
};

export default reducer;
export {
  sourceDirMessage,
  targetDirMessage,
  signatureDirMessage,
  signatureMessage,
  imagesMessage,
  saveImageMessage,
  currentIdMessage,
  watermarkedInputMessage,
};
