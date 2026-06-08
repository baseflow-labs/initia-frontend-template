import type { Metadata } from "next";

import { ContactForm } from "./ContactForm";

import { getSystemIdentity } from "@/lib/api/identity";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const identity = await getSystemIdentity();

  return {
    title: `Contact ${identity.name}`,
    description: identity.slogan || `Contact ${identity.name} support`,
  };
}

export default async function ContactPage() {
  const identity = await getSystemIdentity();

  return <ContactForm identity={identity} />;
}
