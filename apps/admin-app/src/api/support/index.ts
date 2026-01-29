import api, { EnvelopeResponse } from "..";

const mainPath = "/support";

// Support Tickets
export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  userName: string;
  userEmail: string;
  description: string;
  adminNotes?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

const getTickets = async (): Promise<EnvelopeResponse<SupportTicket[]>> => {
  return await api.get<SupportTicket[]>(mainPath + "/tickets");
};

const getTicketById = async (id: string): Promise<EnvelopeResponse<SupportTicket>> => {
  return await api.get<SupportTicket>(mainPath + "/tickets/" + id);
};

const updateTicket = async (
  id: string,
  data: Partial<SupportTicket>
): Promise<EnvelopeResponse<SupportTicket>> => {
  return await api.put<SupportTicket>(mainPath + "/tickets/" + id, data);
};

const deleteTicket = async (id: string): Promise<EnvelopeResponse<void>> => {
  return await api.delete(mainPath + "/tickets/" + id);
};

// Contact Submissions
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

const getContactSubmissions = async (): Promise<EnvelopeResponse<ContactSubmission[]>> => {
  return await api.get<ContactSubmission[]>(mainPath + "/contact-submissions");
};

const getContactSubmissionById = async (
  id: string
): Promise<EnvelopeResponse<ContactSubmission>> => {
  return await api.get<ContactSubmission>(mainPath + "/contact-submissions/" + id);
};

const deleteContactSubmission = async (id: string): Promise<EnvelopeResponse<void>> => {
  return await api.delete(mainPath + "/contact-submissions/" + id);
};

// FAQ
export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  order?: number;
  isPublished: boolean;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}

const getFaqs = async (): Promise<EnvelopeResponse<FaqItem[]>> => {
  return await api.get<FaqItem[]>(mainPath + "/faq");
};

const getFaqById = async (id: string): Promise<EnvelopeResponse<FaqItem>> => {
  return await api.get<FaqItem>(mainPath + "/faq/" + id);
};

const createFaq = async (data: Partial<FaqItem>): Promise<EnvelopeResponse<FaqItem>> => {
  return await api.post<FaqItem>(mainPath + "/faq", data);
};

const updateFaq = async (
  id: string,
  data: Partial<FaqItem>
): Promise<EnvelopeResponse<FaqItem>> => {
  return await api.put<FaqItem>(mainPath + "/faq/" + id, data);
};

const deleteFaq = async (id: string): Promise<EnvelopeResponse<void>> => {
  return await api.delete(mainPath + "/faq/" + id);
};

// User Manual - Sections
export interface ManualSection {
  id: string;
  sectionId: string;
  title: string;
  icon?: string;
  order?: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const getManualSections = async (): Promise<EnvelopeResponse<ManualSection[]>> => {
  return await api.get<ManualSection[]>(mainPath + "/user-manual/sections");
};

const getManualSectionById = async (id: string): Promise<EnvelopeResponse<ManualSection>> => {
  return await api.get<ManualSection>(mainPath + "/user-manual/sections/" + id);
};

const createManualSection = async (
  data: Partial<ManualSection>
): Promise<EnvelopeResponse<ManualSection>> => {
  return await api.post<ManualSection>(mainPath + "/user-manual/sections", data);
};

const updateManualSection = async (
  id: string,
  data: Partial<ManualSection>
): Promise<EnvelopeResponse<ManualSection>> => {
  return await api.put<ManualSection>(mainPath + "/user-manual/sections/" + id, data);
};

const deleteManualSection = async (id: string): Promise<EnvelopeResponse<void>> => {
  return await api.delete(mainPath + "/user-manual/sections/" + id);
};

// User Manual - Subsections
export interface ManualSubsection {
  id: string;
  sectionId: string;
  subsectionId: string;
  title: string;
  contentType: string;
  order?: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const getManualSubsections = async (): Promise<EnvelopeResponse<ManualSubsection[]>> => {
  return await api.get<ManualSubsection[]>(mainPath + "/user-manual/subsections");
};

const getManualSubsectionById = async (id: string): Promise<EnvelopeResponse<ManualSubsection>> => {
  return await api.get<ManualSubsection>(mainPath + "/user-manual/subsections/" + id);
};

const createManualSubsection = async (
  data: Partial<ManualSubsection>
): Promise<EnvelopeResponse<ManualSubsection>> => {
  return await api.post<ManualSubsection>(mainPath + "/user-manual/subsections", data);
};

const updateManualSubsection = async (
  id: string,
  data: Partial<ManualSubsection>
): Promise<EnvelopeResponse<ManualSubsection>> => {
  return await api.put<ManualSubsection>(mainPath + "/user-manual/subsections/" + id, data);
};

const deleteManualSubsection = async (id: string): Promise<EnvelopeResponse<void>> => {
  return await api.delete(mainPath + "/user-manual/subsections/" + id);
};

// User Manual - Contents
export interface ManualContent {
  id: string;
  subsectionId: string;
  content: string;
  videoUrl?: string;
  attachments?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const getManualContents = async (): Promise<EnvelopeResponse<ManualContent[]>> => {
  return await api.get<ManualContent[]>(mainPath + "/user-manual/contents");
};

const getManualContentById = async (id: string): Promise<EnvelopeResponse<ManualContent>> => {
  return await api.get<ManualContent>(mainPath + "/user-manual/contents/" + id);
};

const createManualContent = async (
  data: Partial<ManualContent>
): Promise<EnvelopeResponse<ManualContent>> => {
  return await api.post<ManualContent>(mainPath + "/user-manual/contents", data);
};

const updateManualContent = async (
  id: string,
  data: Partial<ManualContent>
): Promise<EnvelopeResponse<ManualContent>> => {
  return await api.put<ManualContent>(mainPath + "/user-manual/contents/" + id, data);
};

const deleteManualContent = async (id: string): Promise<EnvelopeResponse<void>> => {
  return await api.delete(mainPath + "/user-manual/contents/" + id);
};

export {
  // Tickets
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,

  // Contact Submissions
  getContactSubmissions,
  getContactSubmissionById,
  deleteContactSubmission,

  // FAQ
  getFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,

  // User Manual - Sections
  getManualSections,
  getManualSectionById,
  createManualSection,
  updateManualSection,
  deleteManualSection,

  // User Manual - Subsections
  getManualSubsections,
  getManualSubsectionById,
  createManualSubsection,
  updateManualSubsection,
  deleteManualSubsection,

  // User Manual - Contents
  getManualContents,
  getManualContentById,
  createManualContent,
  updateManualContent,
  deleteManualContent,
};
