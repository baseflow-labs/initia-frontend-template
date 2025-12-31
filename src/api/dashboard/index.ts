import api, { EnvelopeResponse } from "..";
import type { Notification } from "@/layouts/auth/navs/navbar";

const mainPath = "/overview";

export interface UserOverviewPayload {
  notifications?: Notification[];
  statuses?: { status: string; createdAt: string }[];
  status?: string;
}

const forUser = async (): Promise<EnvelopeResponse<UserOverviewPayload>> => {
  return await api.get<UserOverviewPayload>(mainPath + "/user");
};

const forResearcher = async () => {
  return await api.get(mainPath + "/researcher");
};

const forSupervisor = async () => {
  return await api.get(mainPath + "/supervisor");
};

const forAccountant = async () => {
  return await api.get(mainPath + "/accountant");
};

export { forAccountant, forResearcher, forSupervisor, forUser };
