interface TextFaviconPreviewProps {
  backgroundColor: string;
  textColor: string;
  faviconText: string;
}

export default function TextFaviconPreview({
  backgroundColor,
  textColor,
  faviconText,
}: TextFaviconPreviewProps) {
  return (
    <div className="rounded-8 border border-gray-200 p-16">
      <h3 className="typography-p4-14r mb-8 font-medium text-gray-700">실시간 미리보기 (32x32)</h3>
      <div className="flex justify-center">
        <div
          className="rounded-4 flex h-32 w-32 items-center justify-center border border-gray-300 font-bold text-white"
          style={{
            backgroundColor: backgroundColor,
            color: textColor,
            fontSize: '20px',
          }}
        >
          {faviconText.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}
