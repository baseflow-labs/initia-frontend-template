import { exportDataToSingleSheetExcel } from "../../../utils/filesExport";
import { renderDataFromOptions } from "../../../utils/function";
import {
  getAidCategoryTypes,
  getAidStatuses,
} from "../../../utils/optionDataLists/aids";
import {
  getBeneficiaryCategories,
  getGenders,
  getNationalities,
} from "../../../utils/optionDataLists/beneficiaries";

export const downloadNationalReport = (
  t: Function,
  beneficiaries: object[]
) => {
  const data = beneficiaries.reduce(
    (
      final: any,
      {
        fullName,
        nationality,
        dob,
        idNumber,
        category,
        gender,
        fileNo,
        aids,
        ...rest
      }: any
    ) => {
      return [
        ...final,
        ...aids
          .filter((aid: any) => aid.status?.status)
          .map((aid: any) => ({
            الاسم: fullName,
            "رقم الهوية": idNumber,
            الجنس: renderDataFromOptions(gender, getGenders(t)),
            "تاريخ الميلاد": dob,
            الجنسية: renderDataFromOptions(nationality, getNationalities(t)),
            الفئة: renderDataFromOptions(category, getBeneficiaryCategories(t)),
            "رقم الملف": fileNo,
            "نوع الدعم": aid.aidProgram?.aidCategory?.name,
            "فئة الدعم": renderDataFromOptions(
              aid.aidProgram?.aidCategory?.type,
              getAidCategoryTypes(t)
            ),
            "حالة الدعم": renderDataFromOptions(
              aid.status?.status,
              getAidStatuses(t)
            ),
            "تاريخ الدعم": aid.status.createdAt,
            "تكلفة الدعم": aid.value,
            التفاصيل: aid.note,
          })),
      ];
    },
    []
  );

  exportDataToSingleSheetExcel(
    t("Auth.Beneficiaries.BeneficiariesData"),
    data as any
  );
};
