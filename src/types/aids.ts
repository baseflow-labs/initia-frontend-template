export interface AidCategory {
  id: string;
  name: string;
  type: string;
  reapply: string;
  aidPrograms: AidProgram[];
}

export const defaultAidCategory: AidCategory = {
  id: "",
  name: "",
  type: "",
  reapply: "",
  aidPrograms: [],
};

export interface AidProgram {
  id: string;
  name: string;
  sponsor: string;
  status: string;
  credit: number;
  balance: number;
  aidCategory: AidCategory;
}

export const defaultAidProgram: AidProgram = {
  id: "",
  name: "",
  sponsor: "",
  status: "",
  credit: 0,
  balance: 0,
  aidCategory: defaultAidCategory,
};

export interface Aid {
  id: string;
  beneficiaryId: string;
  status: string;
  fileNo: string;
  value: number;
  category: string;
  aidProgram: AidProgram;
}

export const defaultAid: Aid = {
  id: "",
  beneficiaryId: "",
  status: "",
  fileNo: "",
  value: 0,
  category: "",
  aidProgram: defaultAidProgram,
};
