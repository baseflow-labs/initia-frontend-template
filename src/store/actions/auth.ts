export interface UserProps {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  status?: string;
  role: string;
  // [key: string]: any;
}

export interface AuthResponse {
  token: string;
  user: UserProps;
}

export const login = (resp: AuthResponse) => ({
  type: "login" as const,
  resp: {
    jwt: resp.token,
    user: resp.user || {
      id: "1",
      name: "Suhaib Ahmad",
      email: "SuhaibAhmadAi@hotmail.com",
    },
  },
});

export const logout = (resp?: string) => ({
  type: "logout" as const,
  resp,
});

export const updateBeneficiaryStatus = () => ({
  type: "updateBeneficiaryStatus" as const,
});
