import FeatherIcons from '@repo/icons/featherIcons';
import type { FileSchema } from '../../schemas/file.schema';
import { cn } from '@repo/utils/cn';

interface MultipleFileAttachmentProps {
  fields: FileSchema[];
  onInsertFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => () => void;
  ariaLabel?: string;
}

export default function MultipleFileAttachment({
  fields,
  onInsertFiles,
  onRemoveFile,
  ariaLabel,
}: MultipleFileAttachmentProps) {
  return (
    <div className="flex flex-col gap-8">
      <label
        className={cn(
          'rounded-4 bg-primary hover:bg-primary-hover typography-p4-14r flex h-36 w-fit cursor-pointer items-center justify-center gap-4 px-10 py-8 font-medium text-white',
          'has-[input:focus-visible]:outline-primary has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2'
        )}
        role="button"
        aria-label={ariaLabel}
      >
        <input key={Date.now()} onChange={onInsertFiles} type="file" multiple className="sr-only" />
        <FeatherIcons.Paperclip size={20} aria-hidden="true" />
        <span>파일 첨부</span>
      </label>

      <ul className="flex flex-col gap-12">
        {fields.map((field, i) => (
          <li
            key={i}
            className="rounded-4 flex items-center justify-between gap-16 bg-gray-100 px-16 py-8"
            data-file-url={field.storageFileUrl}
          >
            <div className="flex items-center gap-4">
              <FeatherIcons.File size={18} aria-hidden="true" />
              <span className="typography-p3-16r">{field?.filename ?? ''}</span>
            </div>

            <button type="button" onClick={onRemoveFile(i)} aria-label="파일 제거">
              <FeatherIcons.Trash2
                size={20}
                color="var(--Status-Destructive, #ff6363)"
                aria-hidden="true"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
