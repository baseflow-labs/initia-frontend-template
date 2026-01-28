import api, { EnvelopeResponse } from "..";

const mainPath = "/support";

// Support Tickets - User side
export interface SubmitTicketData {
  subject: string;
  category: string;
  priority: string;
  description: string;
  attachment?: File;
}

export interface UserTicket {
  id: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const submitTicket = async (data: SubmitTicketData): Promise<EnvelopeResponse<UserTicket>> => {
  return await api.post<UserTicket>(mainPath + "/tickets", data);
};

const getUserTickets = async (): Promise<EnvelopeResponse<UserTicket[]>> => {
  return await api.get<UserTicket[]>(mainPath + "/tickets/my-tickets");
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

const submitContactForm = async (data: ContactFormData): Promise<EnvelopeResponse<void>> => {
  return await api.post(mainPath + "/contact", data);
};

// FAQ - User side (read-only)
export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  order?: number;
}

const getPublishedFaqs = async (): Promise<EnvelopeResponse<FaqItem[]>> => {
  return await api.get<FaqItem[]>(mainPath + "/faq/published");
};

// User Manual - User side (read-only)
export interface UserManualSection {
  id: string;
  section: string;
  subsectionId: string;
  title: string;
  content: string;
  contentType: string;
  order?: number;
  icon?: string;
  videoUrl?: string;
}

const getPublishedUserManual = async (): Promise<EnvelopeResponse<UserManualSection[]>> => {
  return await api.get<UserManualSection[]>(mainPath + "/user-manual/published");
};

const getUserManualSection = async (
  sectionId: string
): Promise<EnvelopeResponse<UserManualSection>> => {
  return await api.get<UserManualSection>(mainPath + "/user-manual/section/" + sectionId);
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
};
