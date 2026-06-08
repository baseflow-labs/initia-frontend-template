import type { Metadata } from "next";

import { ContactForm } from "./ContactForm";

import { getSystemIdentity } from "@/lib/api/identity";

export const revalidate = 3600;

export const generateMetadata = async (): Promise<Metadata> => {
  const identity = await getSystemIdentity();

  return {
    title: `Contact ${identity.name}`,
    description: identity.slogan || `Contact ${identity.name} support`,
  };
};

const ContactPage = async () => {
  const identity = await getSystemIdentity();

  return <ContactForm identity={identity} />;
};

export default ContactPage;
