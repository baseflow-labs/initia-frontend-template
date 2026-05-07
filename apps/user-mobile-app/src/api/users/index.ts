import api, { EnvelopeResponse } from "@initia/shared/api";

type UserProps = {
  id?: string;
  role?: string;
  email?: string;
  username?: string;
  fullName?: string;
  phone?: string;
};

const getMe = async (): Promise<EnvelopeResponse<UserProps>> => {
  return await api.get<UserProps>("/auth/me");
};

const updateMe = async (
  data: Partial<Pick<UserProps, "fullName" | "username" | "email" | "phone">>
): Promise<EnvelopeResponse<UserProps>> => {
  return await api.patch<UserProps>("/auth/me", data);
};

export { getMe, updateMe };
