import api, { EnvelopeResponse } from "..";
import type { UserProps } from "../../types/auth";

import store, { RootState } from "@/store/store";

const mainPath = "/user";
const authPath = "/auth";

const getById = async (id: string) => {
  return await api.get(mainPath + "/" + id);
};

const get = async (params?: Record<string, string | number | boolean | undefined>) => {
  return await api.get(mainPath, { params });
};

const create = async (data: object) => {
  return await api.post(mainPath, data);
};

export interface UserProfileResp {
  user: { fullName: string };
}

const getByUserId = async (id?: string): Promise<EnvelopeResponse<UserProfileResp>> => {
  const { user } = (store.getState() as RootState).auth;

  return await api.get<UserProfileResp>(mainPath + "/by-user/" + (id || user.id));
};

const remove = async (id: string) => {
  return await api.delete(mainPath + "/" + id);
};

const removeAllUsers = async () => {
  return await api.delete(mainPath + "/all-users");
};

/** GET /auth/me — returns the full user record for the authenticated user */
const getMe = async (): Promise<EnvelopeResponse<UserProps>> => {
  return await api.get<UserProps>(authPath + "/me");
};

/** GET /user/:id — returns the user profile for a specific user (public endpoint) */
const getProfile = async (userId: string): Promise<EnvelopeResponse<UserProps>> => {
  return await api.get<UserProps>(mainPath + "/" + userId);
};

/** PATCH /auth/me — update profile fields for the authenticated user */
const updateMe = async (
  data: Partial<
    Pick<
      UserProps,
      | "fullName"
      | "username"
      | "email"
      | "phone"
      | "company"
      | "jobTitle"
      | "country"
      | "location"
      | "avatar"
      | "status"
      | "language"
      | "notificationPrefs"
      | "connections"
    >
  >
): Promise<EnvelopeResponse<UserProps>> => {
  return await api.patch<UserProps>(authPath + "/me", data);
};

export { create, get, getById, getByUserId, getMe, getProfile, remove, removeAllUsers, updateMe };
