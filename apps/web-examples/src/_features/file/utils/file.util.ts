export function extractS3Key(decodedUrl: string) {
  const match = decodedUrl.match(/https:\/\/d37qx3oivk5uc5\.cloudfront\.net\/(.+?)(?:&|$)/);
  return match ? match[1] : null;
}
