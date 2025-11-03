import { MembershipStatus } from "./users";

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
  approved?: boolean;
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
  userId: string;
  status: MembershipStatus;
  urgent: boolean;
  value: number;
  note?: string;
  aidProgram: AidProgram;
}

export const defaultAid: Aid = {
  id: "",
  userId: "",
  status: { id: "", status: "" },
  note: "",
  value: 0,
  urgent: false,
  aidProgram: defaultAidProgram,
};
