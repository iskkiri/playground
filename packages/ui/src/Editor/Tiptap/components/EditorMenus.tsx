import { useState, useRef, useCallback } from 'react';
import { useEditorState, type Editor } from '@tiptap/react';
import EmojiPicker, {
  Categories,
  EmojiClickData,
  EmojiStyle,
  SkinTonePickerLocation,
  SuggestionMode,
  Theme,
} from 'emoji-picker-react';
import { SketchPicker, type ColorResult } from 'react-color';
import Popover from '../../../FloatingUI/Popover/Popover';

interface EditorMenusProps {
  editor: Editor;
}

export default function EditorMenus({ editor }: EditorMenusProps) {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const currentColor = useEditorState({
    editor,
    selector: (ctx) => ctx.editor.getAttributes('textStyle').color || '#000000',
  });

  const onEmojiClick = useCallback(
    (emojiData: EmojiClickData) => {
      if (editor) {
        editor.chain().focus().insertContent(emojiData.emoji).run();
        setIsEmojiPickerOpen(false);
      }
    },
    [editor]
  );

  const handleColorChange = useCallback(
    (color: ColorResult) => {
      if (editor) {
        console.log(color);
        editor.chain().focus().setColor(color.hex).run();
      }
    },
    [editor]
  );

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const src = e.target?.result as string;
        editor
          .chain()
          .focus()
          .setResizableImage({
            src,
            'data-keep-ratio': true,
          })
          .run();
      };

      reader.readAsDataURL(file);
    }
    // 같은 파일을 다시 선택할 수 있도록 value 초기화
    event.target.value = '';
  };

  return (
    <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        H4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        H5
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        H6
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        Strike
      </button>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt('URL');

          // cancelled
          if (url === null) {
            return;
          }

          // empty
          if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();

            return;
          }

          if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }
        }}
        className={editor.isActive('link') ? 'is-active' : ''}
      >
        Link
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
      >
        Left
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
      >
        Center
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
      >
        Right
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        Bullet List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        Numbered List
      </button>

      {/* Color Picker */}
      <Popover isFocusDisabled isOpen={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            style={{
              padding: '6px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: isColorPickerOpen ? '#f0f0f0' : 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '2px',
                backgroundColor: currentColor,
                border: '1px solid #ccc',
              }}
            />
            텍스트 색상
          </button>
        </Popover.Trigger>

        <Popover.Content
          style={{
            zIndex: 99999,
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          }}
        >
          <SketchPicker
            color={currentColor}
            onChange={handleColorChange}
            disableAlpha={false}
            presetColors={[
              '#000000',
              '#ffffff',
              '#ff0000',
              '#00ff00',
              '#0000ff',
              '#ffff00',
              '#ff00ff',
              '#00ffff',
              '#808080',
              '#800000',
              '#008000',
              '#000080',
              '#808000',
              '#800080',
              '#008080',
              '#c0c0c0',
            ]}
          />
        </Popover.Content>
      </Popover>

      <button
        type="button"
        onClick={handleImageUpload}
        style={{
          padding: '6px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: 'white',
          cursor: 'pointer',
          marginRight: '10px',
        }}
      >
        📷 이미지
      </button>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />

      {/* Emoji Picker */}
      <Popover isOpen={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            style={{
              padding: '6px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: isEmojiPickerOpen ? '#f0f0f0' : 'white',
              cursor: 'pointer',
            }}
          >
            😀 이모지
          </button>
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
            previewConfig={{
              showPreview: true,
            }}
            categories={[
              {
                name: '자주 사용됨',
                category: Categories.SUGGESTED,
              },
              {
                name: '웃는 얼굴 및 사람',
                category: Categories.SMILEYS_PEOPLE,
              },
              {
                name: '동물 및 자연',
                category: Categories.ANIMALS_NATURE,
              },
              {
                name: '음식 및 음료',
                category: Categories.FOOD_DRINK,
              },
              {
                name: '활동',
                category: Categories.ACTIVITIES,
              },
              {
                name: '여행 및 장소',
                category: Categories.TRAVEL_PLACES,
              },
              {
                name: '사물',
                category: Categories.OBJECTS,
              },
              {
                name: '기호',
                category: Categories.SYMBOLS,
              },
              {
                name: '국기',
                category: Categories.FLAGS,
              },
            ]}
          />
        </Popover.Content>
      </Popover>
    </div>
  );
}
