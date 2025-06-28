// import { client } from '@/api/client';
// import axios from 'axios';
import type { Editor, FileLoader, UploadAdapter, UploadResponse } from 'ckeditor5';

export function CustomUploadAdapterPlugin(editor: Editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new CustomUploadAdapter(loader);
  };
}

class CustomUploadAdapter implements UploadAdapter {
  loader: FileLoader;

  constructor(loader: FileLoader) {
    this.loader = loader;
  }

  async upload(): Promise<UploadResponse> {
    const file = await this.loader.file;
    if (!file) return {};

    const formData = new FormData();
    formData.append('file', file);

    // *************************** 이미지 업로드 API 호출 코드 ***************************
    /**
     * 이곳에 이미지 업로드 API 호출 코드를 작성합니다.
     * 아래의 코드는 임시 코드이기 때문에 수정하지 않으면 이미지 업로드 시 에러가 발생합니다.
     * data는 업로드된 이미지 url입니다.
     * ex) https://s3.bucket.com/images/image.png
     * */
    // const { data } = await axios.post<string>('https://example.com/images', formData);
    // *************************** 이미지 업로드 API 호출 코드 ***************************

    return {
      // default: data
    };
  }

  abort(): void {}
}
