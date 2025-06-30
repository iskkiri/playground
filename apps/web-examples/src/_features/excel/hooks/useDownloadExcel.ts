import { useCallback } from 'react';
import ExcelJS from 'exceljs';
import type {
  AdjustColumnWidthsParams,
  ApplyColumnWidthsParams,
  DownloadExcelParams,
} from '../types/downloadExcel.types';

const DEFAULT_ROW_HEIGHT = 20;
const MIN_COLUMN_WIDTH = 10;
const WIDTH_MULTIPLIER = 1.5;
const DEFAULT_SAMPLE_SIZE = 10; // 기본 샘플링 크기

export default function useDownloadExcel() {
  // 열 너비 적용 로직 분리
  const applyColumnWidths = useCallback(
    ({ worksheet, columnWidths }: ApplyColumnWidthsParams) => {
      worksheet.columns.forEach((column, index) => {
        if (!column) return;

        column.width = columnWidths[index] * WIDTH_MULTIPLIER;
      });
    },
    []
  );

  // 최적화된 열 너비 조정 함수
  const adjustColumnWidths = useCallback(
    ({
      worksheet,
      colHeaders,
      sampleSize = DEFAULT_SAMPLE_SIZE,
    }: AdjustColumnWidthsParams) => {
      // 헤더의 길이를 기준으로 초기 너비 설정
      const columnWidths = new Array(colHeaders.length).fill(MIN_COLUMN_WIDTH);

      // 헤더 텍스트 길이 확인
      colHeaders.forEach((col, index) => {
        const headerLength = col.header.length;
        columnWidths[index] = Math.max(columnWidths[index], headerLength);
      });

      // 여러 행을 샘플링하여 데이터 길이 확인
      const totalRows = worksheet.rowCount;
      const rowsToSample = Math.min(totalRows - 1, sampleSize); // 헤더 제외

      if (rowsToSample <= 0) {
        applyColumnWidths({ worksheet, columnWidths });
        return;
      }

      // 전체 데이터 행에서 균등하게 샘플링
      const sampleInterval = Math.max(
        1,
        Math.floor((totalRows - 1) / rowsToSample)
      );

      [...Array(rowsToSample)].forEach((_, i) => {
        const rowNumber = 2 + i * sampleInterval;
        const row = worksheet.getRow(rowNumber);
        if (!row) return;

        row.eachCell((cell, colNumber) => {
          if (!cell.value) return;

          const contentLength = cell.value.toString().length;
          columnWidths[colNumber - 1] = Math.max(
            columnWidths[colNumber - 1],
            contentLength
          );
        });
      });

      // 열 너비 적용
      applyColumnWidths({ worksheet, columnWidths });
    },
    [applyColumnWidths]
  );

  // 엑셀의 셀 스타일 설정 및 빈 셀 처리
  const applyWorksheetStyles = useCallback((worksheet: ExcelJS.Worksheet) => {
    worksheet.eachRow((row) => {
      row.height = DEFAULT_ROW_HEIGHT;

      row.eachCell((cell) => {
        // 빈 셀 처리
        if (cell.value === undefined || cell.value === null) {
          cell.value = '';
        }

        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        } satisfies Partial<ExcelJS.Alignment>;
      });

      row.commit();
    });
  }, []);

  const downloadExcel = useCallback(
    async <TRow = object>({
      colHeaders,
      rows,
      filename,
      sampleSize = DEFAULT_SAMPLE_SIZE,
    }: DownloadExcelParams<TRow>) => {
      try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('시트1');

        // column header
        worksheet.columns = colHeaders;

        // rows
        worksheet.addRows(rows);

        // 열 너비 조정
        adjustColumnWidths({ worksheet, colHeaders, sampleSize });

        // 셀 스타일 적용
        applyWorksheetStyles(worksheet);

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        // 메모리 정리
        window.URL.revokeObjectURL(url);
      } catch (_err) {
        alert('엑셀 파일을 다운로드하는데 실패하였습니다.');
      }
    },
    [adjustColumnWidths, applyWorksheetStyles]
  );

  return { downloadExcel };
}
