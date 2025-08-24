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
  urgent: boolean;
  value: number;
  note?: string;
  aidProgram: AidProgram;
}

export const defaultAid: Aid = {
  id: "",
  beneficiaryId: "",
  status: "",
  note: "",
  value: 0,
  urgent: false,
  aidProgram: defaultAidProgram,
};
