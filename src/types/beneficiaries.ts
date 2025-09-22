export interface MembershipStatus {
  id: string;
  status: string;
  note?: string;
}

export interface Beneficiary {
  id: string;
  socialStatus: string;
  fullName: string;
  nationality: string;
  dob: string;
  idExpiryDate: string;
  idNumber: number;
  fileNo: string;
  category: string;
  gender: string;
  status: MembershipStatus;
  healthStatus: string;
  diseases?: string[];
  incurableDiseases?: boolean;
}

export interface ContactsBank {
  id: string;
  beneficiaryMobile: string;
  secondaryMobile: string;
  backupMobile?: string;
  email?: string;
  bankAccountNumber: string;
  bankName: string;
}

export interface User {
  id: string;
  username: string;
  email?: string;
  name?: string;
  role: string;
}

export interface Dependent {
  id: string;
  fullName: string;
  income?: number;
  dob: string;
  idExpiryDate: string;
  idNumber: number;
  gender: string;
  phoneNumber?: string;
  relation: string;
  ageGroup: string;
  educationLevel: string;
  occupation: string;
  healthStatus: string;
  diseases?: string[];
  incurableDiseases?: boolean;
}

export interface Housing {
  id: string;
  province: string;
  governorate: string;
  city: string;
  district: string;
  homeType: string;
  apartmentNo: string;
  nationalAddressNumber: string;
  homeLocation: string;
  homeOwnership: string;
  category: string;
  rentalCharge?: number;
  payee: string;
}
