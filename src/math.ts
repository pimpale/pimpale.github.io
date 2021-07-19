export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export async function loadImage(imageUrl: string) {
  const response = await fetch(imageUrl);
  const fileBlob = await response.blob();
  const bitmap = await createImageBitmap(fileBlob);
  const canvas = document.createElement('canvas');
  canvas.width  = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext('2d')!;
  context.drawImage(bitmap, 0, 0);
  return context.getImageData(0, 0, bitmap.width, bitmap.height);
}
