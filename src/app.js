//@ts-check
import sharp from "sharp";
import * as path from "path";
import * as R from "ramda";
import {
  currentIdMessage,
  saveImageMessage,
  watermarkedInputMessage,
} from "./reducer";

const app = async (initModel, reducer, view) => {
  const dispatch = (message) => {
    model = reducer(message, model);
    const newView = view(dispatch, model);
    console.clear();
    console.log(newView); // Production
    currentView = newView;
  };
  let model = initModel;
  let currentView = view(dispatch, model);
  console.log(currentView); // Production
  dispatch(currentIdMessage(0));

  const signatureBuffer = await sharp(path.join("signature", "signature.png"))
    .resize(1000)
    .toBuffer();

  sharp(path.join("input", "chair.jpg"))
    .composite([
      {
        input: signatureBuffer,
        gravity: "southeast",
      },
    ])
    .toFile(path.join("out", "out.jpg"));
};

export default app;
