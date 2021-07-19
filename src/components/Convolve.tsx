import { assert } from '@innexgo/frontend-common';
import { mod } from '../math';

export type BoundaryConditions = "FIXED" | "MIRROR" | "PERIODIC";


// extends an image so that it can be processed by the given matrix
export function extend(img: ImageData, b: BoundaryConditions, matsize: number): ImageData {
  assert(matsize > 0, "matsize must be positive");
  assert(matsize % 2 == 1, "matsize must be odd");

  // this is the amount we have to pad the image with
  const padsize = (matsize - 1) / 2;

  let newImg = new ImageData(img.height + padsize * 2, img.width + padsize * 2);

  switch (b) {
    case "FIXED": {
      for (let y = 0; y < newImg.width; y++) {
        for (let x = 0; x < newImg.height; x++) {
          // clamp x and y between the correct values
          const srcx = Math.max(Math.min(x - padsize, img.width - 1), 0);
          const srcy = Math.max(Math.min(y - padsize, img.height - 1), 0);

          // calculate base indexes
          const srcbasei = (srcy * img.width + srcx) * 4;
          const destbasei = (y * newImg.width + x) * 4;

          // copy r, g, b, a
          newImg.data[destbasei + 0] = img.data[srcbasei + 0];
          newImg.data[destbasei + 1] = img.data[srcbasei + 1];
          newImg.data[destbasei + 2] = img.data[srcbasei + 2];
          newImg.data[destbasei + 3] = img.data[srcbasei + 3];
        }
      }
      break;
    }
    case "PERIODIC": {
      for (let y = 0; y < newImg.width; y++) {
        for (let x = 0; x < newImg.height; x++) {
          // wrap x and y between the correct values
          const srcx = mod(x - padsize, img.width);
          const srcy = mod(y - padsize, img.height);

          // calculate base indexes
          const srcbasei = (srcy * img.width + srcx) * 4;
          const destbasei = (y * newImg.width + x) * 4;

          // copy r, g, b, a
          newImg.data[destbasei + 0] = img.data[srcbasei + 0];
          newImg.data[destbasei + 1] = img.data[srcbasei + 1];
          newImg.data[destbasei + 2] = img.data[srcbasei + 2];
          newImg.data[destbasei + 3] = img.data[srcbasei + 3];
        }
      }
      break;
    }
    case "MIRROR": {
      function mirror(x: number, w: number) {
        if (x < 0) {
          // extend
          return Math.min(Math.max(-x, 0), w);
        } else if (x >= w) {
          // extend
          return Math.min(Math.max(2 * w - x, 0), w);
        } else {
          return x;
        }
      }

      for (let y = 0; y < newImg.width; y++) {
        for (let x = 0; x < newImg.height; x++) {
          // wrap x and y between the correct values
          const srcx = mirror(x - padsize, img.width - 1);
          const srcy = mirror(y - padsize, img.height - 1);

          // calculate base indexes
          const srcbasei = (srcy * img.width + srcx) * 4;
          const destbasei = (y * newImg.width + x) * 4;

          // copy r, g, b, a
          newImg.data[destbasei + 0] = img.data[srcbasei + 0];
          newImg.data[destbasei + 1] = img.data[srcbasei + 1];
          newImg.data[destbasei + 2] = img.data[srcbasei + 2];
          newImg.data[destbasei + 3] = img.data[srcbasei + 3];
        }
      }
      break;
    }
  }

  return newImg;
}

// crops the data
export function boxBlur(img: ImageData, radius: number) {
  assert(radius > 0, "radius must be positive");
  assert(radius % 2 == 1, "radius must be odd");

  // this is the amount we will crop from the image
  const padsize = (radius - 1) / 2;

  // dimensions of the src image
  const srcxsize = img.width;
  const srcysize = img.height;

  // dimensions of new image
  const newxsize = srcxsize - padsize * 2;
  const newysize = srcxsize - padsize * 2;

  assert(newxsize <= 0 || newysize <= 0, "radius is too large");

  // create new image
  let newImg = new ImageData(newxsize, newysize);

  // create specific channel sums
  // each array is the sum of specified channel in the rectangle [0, x] by [0, y]
  let rSums = new Uint32Array(srcxsize * srcysize);
  let gSums = new Uint32Array(srcxsize * srcysize);
  let bSums = new Uint32Array(srcxsize * srcysize);
  let aSums = new Uint32Array(srcxsize * srcysize);

  // here, we calculate the sum in each of the channels in the horizontal direction
  for (let y = 0; y < srcysize; y++) {
    // note we start at 1, not 0
    for (let x = 1; x < srcxsize; x++) {
      const srcBaseIdx = (srcysize*y + x) * 4;
      const destIdx = srcysize*y + x;
      // add the left column value to the current position
      rSums[destIdx] = img.data[srcBaseIdx+0] + rSums[destIdx-1];
      gSums[destIdx] = img.data[srcBaseIdx+1] + gSums[destIdx-1];
      bSums[destIdx] = img.data[srcBaseIdx+2] + bSums[destIdx-1];
      aSums[destIdx] = img.data[srcBaseIdx+3] + aSums[destIdx-1];
    }
  }

  // now, we calculate the sum in each of the channels in the vertical direction
  for (let x = 0; x < srcxsize; x++) {
    // note we start at 1, not 0
    for (let y = 1; y < srcysize; y++) {
      const destIdx = srcysize*y + x;
      const srcIdx = srcysize*(y-1) + x;
      // add the above row value to the current position
      rSums[destIdx] += rSums[srcIdx];
      gSums[destIdx] += gSums[srcIdx];
      bSums[destIdx] += bSums[srcIdx];
      aSums[destIdx] += aSums[srcIdx];
    }
  }

  // now, we calculate the blur

  for(let y = 0; y < newysize; y++) {
    for(let x = 0; x < newxsize; x++) {

      const srcIdx = 

      const a =
      const px =
    }
  }





}


