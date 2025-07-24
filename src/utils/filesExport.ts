import * as XLSX from "xlsx";

export const exportDataToSingleSheetExcel = (label: string, data: Object[]) => {
  const workbook = XLSX.utils.book_new();

  const worksheet1 = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheet1, label);

  XLSX.writeFile(workbook, label + ".xlsx");
};

export const exportDataToMultipleSheetsExcel = (
  label: string,
  sheets: { label: string; data: Object[] }[]
) => {
  const workbook = XLSX.utils.book_new();

  sheets.forEach(({ label, data }) => {
    const worksheet1 = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet1, label);
  });

  XLSX.writeFile(workbook, label + ".xlsx");
};
