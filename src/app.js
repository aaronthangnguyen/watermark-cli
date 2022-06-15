//@ts-check
import sharp from "sharp";
import * as path from "path";
import * as R from "ramda";
import {
  currentIdMessage,
  saveImageMessage,
  watermarkedInputMessage,
} from "./reducer";

const app = (initModel, reducer, view) => {
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
  console.log(model);
};

export default app;
