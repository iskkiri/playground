import { useCallback, useState } from 'react';
import type { Editor } from '@tiptap/react';
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  SkinTonePickerLocation,
  SuggestionMode,
  Theme,
} from 'emoji-picker-react';
import Popover from '#src/overlay/Popover/Popover';
import EditorMenuButton from '../EditorMenuButton';
import EmojiAddIcon from '../../assets/emoji_add.svg';
import { emojiCategories } from '../../data/emoji.data';

interface EmojiPickerControlProps {
  editor: Editor;
}

export default function EmojiPickerControl({ editor }: EmojiPickerControlProps) {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const onEmojiClick = useCallback(
    (emojiData: EmojiClickData) => {
      if (editor) {
        editor.chain().focus().insertContent(emojiData.emoji).run();
        setIsEmojiPickerOpen(false);
      }
    },
    [editor]
  );

  return (
    <Popover
      placement="bottom"
      isOpen={isEmojiPickerOpen}
      onOpenChange={setIsEmojiPickerOpen}
      offsetOptions={{ mainAxis: 8 }}
    >
      <Popover.Trigger asChild>
        <EditorMenuButton isActive={isEmojiPickerOpen}>
          <EmojiAddIcon className="size-20" />
        </EditorMenuButton>
      </Popover.Trigger>

      <Popover.Content>
        <EmojiPicker
          onEmojiClick={onEmojiClick}
          lazyLoadEmojis
          skinTonesDisabled={false}
          searchDisabled={false}
          searchPlaceholder="모든 이모티콘 검색"
          emojiStyle={EmojiStyle.NATIVE}
          theme={Theme.LIGHT}
          suggestedEmojisMode={SuggestionMode.FREQUENT}
          height={450}
          width={350}
          skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
          previewConfig={{ showPreview: true }}
          categories={emojiCategories}
        />
      </Popover.Content>
    </Popover>
  );
}
