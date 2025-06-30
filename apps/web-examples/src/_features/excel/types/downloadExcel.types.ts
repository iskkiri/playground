import ExcelJS from 'exceljs';

export interface ApplyColumnWidthsParams {
  worksheet: ExcelJS.Worksheet;
  columnWidths: number[];
}

export interface AdjustColumnWidthsParams {
  worksheet: ExcelJS.Worksheet;
  colHeaders: { header: string; key: string }[];
  sampleSize?: number;
}

export interface DownloadExcelParams<TRow> {
  colHeaders: { header: string; key: string }[];
  rows: TRow[];
  filename: string;
  sampleSize?: number; // 샘플링할 행의 수
}
