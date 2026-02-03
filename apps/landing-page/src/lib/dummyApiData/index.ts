import { Page, SystemMetadata } from "@/types/landing";
import { getMockSystemMetadataEN, getMockPagesEN } from "./en";
import { getMockSystemMetadataAR, getMockPagesAR } from "./ar";

export const getMockSystemMetadata = (locale: string = "en"): SystemMetadata => {
  switch (locale) {
    case "ar":
      return getMockSystemMetadataAR();
    case "en":
    default:
      return getMockSystemMetadataEN();
  }
};

export const getMockPages = (locale: string = "en"): Page[] => {
  switch (locale) {
    case "ar":
      return getMockPagesAR();
    case "en":
    default:
      return getMockPagesEN();
  }
};
