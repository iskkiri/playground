import FeatherIcons from '@repo/icons/featherIcons';
import DaumPostcodeEmbed from 'react-daum-postcode';
import useDaumPostCode from './hooks/useDaumPostCode';

interface DaumPostCodeProps {
  onCompleteAddress: (address: string) => void;
  onClose: () => void;
}

export default function DaumPostCode({ onCompleteAddress, onClose }: DaumPostCodeProps) {
  const { onComplete } = useDaumPostCode({ onCompleteAddress });

  return (
    <div className="rounded-8 overflow-hidden border border-gray-300">
      <div className="px-8 py-12">
        <button onClick={onClose} className="ml-auto block">
          <FeatherIcons.X />
        </button>
      </div>
      <DaumPostcodeEmbed onComplete={onComplete} autoClose={false} style={{ height: 500 }} />
    </div>
  );
}
