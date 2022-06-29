// @ts-check
import sharp from "sharp";
import path from "path";

const _target = async (
  sourceDir,
  source,
  signatureDir,
  signature,
  signatureSize
) => {
  const signaturePath = path.join(signatureDir, signature);
  const signatureBuffer = await sharp(signaturePath)
    .resize(signatureSize)
    .toBuffer();
  const sourcePath = path.join(sourceDir, source);
  return sharp(sourcePath).composite([
    {
      input: signatureBuffer,
      gravity: "southeast",
    },
  ]);
};

/*
 * @param image Sharp object
 */
const _toFile = (source, target, targetDir) => {
  target.toFile(path.join(targetDir, `${source}-w`));
};

export { _target, _toFile };
