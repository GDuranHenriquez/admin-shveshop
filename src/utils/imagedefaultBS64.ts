

export function getBase64Image(img): string {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(img, 0, 0);
  const dataURL = canvas.toDataURL();
  return dataURL;
}