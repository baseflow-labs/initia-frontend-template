import api, { EnvelopeResponse } from "@initia/shared/api";

const mainPath = "/support";

export interface SubmitTicketData {
  type: string;
  title: string;
  urgent?: boolean;
  content: string;
  userId: string;
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

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface FaqItem {
  id: string;
  title: string;
  content: string;
  link?: string;
}

export interface UserManualSection {
  id: string;
  title: string;
  description?: string;
}

export const submitTicket = async (data: SubmitTicketData): Promise<EnvelopeResponse<UserTicket>> =>
  api.post<UserTicket>(mainPath + "/tickets", data);

export const getUserTickets = async (): Promise<EnvelopeResponse<UserTicket[]>> =>
  api.get<UserTicket[]>(mainPath + "/tickets");

export const submitContactForm = async (data: ContactFormData) =>
  api.post(mainPath + "/contact-submissions", data);

export const getPublishedFaqs = async (): Promise<EnvelopeResponse<FaqItem[]>> =>
  api.get<FaqItem[]>(mainPath + "/faqs");

export const getPublishedUserManual = async (): Promise<EnvelopeResponse<UserManualSection[]>> =>
  api.get<UserManualSection[]>(mainPath + "/manual/sections");
