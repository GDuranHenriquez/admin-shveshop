

export function getBase64Image(img: HTMLImageElement):string {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL();
    return dataURL;
  } else {
    throw new Error("Canvas context is not supported");
  }
}