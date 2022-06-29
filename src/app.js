//@ts-check
import sharp from "sharp";
import path from "path";
import {
  currentIdMessage,
  watermarkedMessage,
  targetMessage,
  saveImageMessage,
} from "./reducer";
import { _target, _toFile } from "./utils";

const app = async (initModel, reducer, view) => {
  const dispatch = (message) => {
    model = reducer(message, model);
    const newView = view(dispatch, model);
    if (newView !== currentView) {
      // console.clear();
      console.log(newView); // Production
      currentView = newView;
    }
  };
  let model = initModel;
  let currentView = view(dispatch, model);
  console.log(currentView); // Production

  model.images.map((image, index) => {
    dispatch(currentIdMessage(index));

    // dispatch(targetMessage(target));
    dispatch(watermarkedMessage(true));
    dispatch(saveImageMessage);
    console.log(model.images);
  });
};

export default app;
