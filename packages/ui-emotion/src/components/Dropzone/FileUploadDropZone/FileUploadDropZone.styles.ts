import { css } from '@emotion/react';

export const fileUploadDropZoneCss = {
  section: css`
    margin: 16px auto 0;
    padding: 16px;
    border: 1px solid #ccc;
    width: 600px;

    display: flex;
    flex-direction: column;
    gap: 8px;
  `,

  dropZone: css`
    height: 160px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border: 1px dashed #ccc;
  `,

  dropZoneActive: css`
    border: 1px solid #4e86ff;
  `,

  button: css`
    border-radius: 4px;
    background-color: #4e86ff;
    color: #fff;
  `,

  grid: css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
};
