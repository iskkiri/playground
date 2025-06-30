import { model, models, Schema } from 'mongoose';
import type { AttachedFile } from '../api/dtos/attachedFile.dto';

export const attachedFileSchema = new Schema<AttachedFile>(
  {
    fileName: {
      type: String,
      required: [true, '파일 이름은 필수입니다'],
    },
    fileUrl: {
      type: String,
      required: [true, '파일 URL은 필수입니다'],
    },
  },
  {
    _id: false, // _id 필드 자동 생성 방지
    collection: 'attached_files',
  }
);

const AttachedFile = models.AttachedFile || model<AttachedFile>('AttachedFile', attachedFileSchema);

export default AttachedFile;
