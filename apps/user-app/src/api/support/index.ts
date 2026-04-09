import api, { EnvelopeResponse } from "..";

const mainPath = "/support";

// Support Tickets - User side
export interface SubmitTicketData {
  type: string;
  title: string;
  urgent?: boolean;
  content: string;
  userId: string; // Current user's ID from auth context
}

export interface UserTicket {
  id: string;
  type: string;
  title: string;
  urgent: boolean;
  content: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

const submitTicket = async (data: SubmitTicketData): Promise<EnvelopeResponse<UserTicket>> => {
  return await api.post<UserTicket>(mainPath + "/tickets", data);
};

const getUserTickets = async (): Promise<EnvelopeResponse<UserTicket[]>> => {
  return await api.get<UserTicket[]>(mainPath + "/tickets");
};

const getUserTicketById = async (id: string): Promise<EnvelopeResponse<UserTicket>> => {
  return await api.get<UserTicket>(mainPath + "/tickets/" + id);
};

// Contact Form - User side
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const submitContactForm = async (
  data: ContactFormData
): Promise<EnvelopeResponse<ContactSubmission>> => {
  return await api.post<ContactSubmission>(mainPath + "/contact-submissions", data);
};

// FAQ - User side (read-only)
export interface FaqItem {
  id: string;
  title: string;
  content: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
}

const getPublishedFaqs = async (): Promise<EnvelopeResponse<FaqItem[]>> => {
  return await api.get<FaqItem[]>(mainPath + "/faqs");
};

// User Manual - User side (read-only)
export interface UserManualSection {
  id: string;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserManualSubsection {
  id: string;
  sectionId: string;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserManualContent {
  id: string;
  subsectionId: string;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

const getPublishedUserManual = async (): Promise<EnvelopeResponse<UserManualSection[]>> => {
  return await api.get<UserManualSection[]>(mainPath + "/manual/sections");
};

const getUserManualSection = async (
  sectionId: string
): Promise<EnvelopeResponse<UserManualSection>> => {
  const sectionsRes = await api.get<UserManualSection[]>(mainPath + "/manual/sections");
  const matched = (sectionsRes.payload || []).find((section) => section.id === sectionId);

  return {
    ...sectionsRes,
    data: matched as UserManualSection,
    payload: matched as UserManualSection,
  };
};

const getUserManualSubsections = async (
  sectionId?: string
): Promise<EnvelopeResponse<UserManualSubsection[]>> => {
  const endpoint = sectionId
    ? `${mainPath}/manual/sections/${sectionId}/subsections`
    : `${mainPath}/manual/subsections`;

  return await api.get<UserManualSubsection[]>(endpoint);
};

const getUserManualContents = async (
  subsectionId?: string
): Promise<EnvelopeResponse<UserManualContent[]>> => {
  const endpoint = subsectionId
    ? `${mainPath}/manual/subsections/${subsectionId}/contents`
    : `${mainPath}/manual/contents`;

  return await api.get<UserManualContent[]>(endpoint);
};

export {
  // Tickets
  submitTicket,
  getUserTickets,
  getUserTicketById,

  // Contact
  submitContactForm,

  // FAQ
  getPublishedFaqs,

  // User Manual
  getPublishedUserManual,
  getUserManualSection,
  getUserManualSubsections,
  getUserManualContents,
};
