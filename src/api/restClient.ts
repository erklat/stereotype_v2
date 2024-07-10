import axios from "axios";
// import createAuthRefreshInterceptor from "axios-auth-refresh";
// import { getCookie } from "grutils/cookie";

// import { actions as authActions } from "grutils/AuthManager/AuthManager.reducer";
// import { getEntityId } from "grutils/GreenlabelManager/utils";

const axiosConfig = () => {
  return {
    baseURL: process?.env?.NEXT_PUBLIC_REST_API,
    headers: {
      // Authorization: `Bearer ${fakeToken}`
    },
  };
};

const axiosLocalConfig = () => {
  return {
    baseURL: process?.env?.NEXT_PUBLIC_LOCAL_REST_API,
    headers: {
      // Authorization: `Bearer ${fakeToken}`
    },
  };
};

const restClient = axios.create(axiosConfig());
export const localRestClient = axios.create(axiosLocalConfig());

export default restClient;
