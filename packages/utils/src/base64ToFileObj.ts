// dataURL = data:image/png;base64,/9j/4AAQSkZJR…KIgxIJCwlixiHjZ7j5wYw87CMC7EhQ9XQ0FiFIfBbb30/9k=

export async function base64ToBlob(base64: string): Promise<Blob> {
  const response = await fetch(base64);
  return response.blob();
}

// Base64 문자열을 File 객체로 변환
export async function base64toFile({ base64, filename }: { base64: string; filename: string }) {
  const blob = await base64ToBlob(base64);
  const file = new File([blob], filename, { type: blob.type });
  return file;
}
