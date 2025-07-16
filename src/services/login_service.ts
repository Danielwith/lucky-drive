import { apiFetch } from "@/lib/helpers/ApiFetch";
import { ApiFetchTypes, LoginTypes } from "@/lib/types/types";

export namespace LoginService {
  export const postLogin = (credentials: LoginTypes.LoginForm) => {
    const endpoint: ApiFetchTypes.ApiEndpoint = {
      controller: "Auth",
      method: "loginWeb",
    };

    return apiFetch<LoginTypes.LoginResponse>(endpoint, {
      method: "POST",
      body: credentials,
      log: true,
    });
  };
}
