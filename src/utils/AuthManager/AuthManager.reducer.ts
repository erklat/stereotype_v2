// @ts-nocheck

export const actions = {
  START_USER_LOGIN: "START_USER_LOGIN",
  USER_LOGIN_SUCCESSFUL: "USER_LOGIN_SUCCESSFUL",
  USER_LOGIN_FAILED: "USER_LOGIN_FAILED",

  STORE_USER_DATA: "STORE_USER_DATA",
};

const initialState = {
  token: "",
  user: null,
  isFetching: false,
};

const authActions = (state = initialState, { type, response }) => {
  switch (type) {
    case actions.START_USER_LOGIN: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case actions.USER_LOGIN_SUCCESSFUL:
    case actions.USER_LOGIN_FAILED: {
      return {
        ...state,
        isFetching: false,
      };
    }

    case actions.STORE_USER_DATA: {
      return {
        ...state,
        user: response,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default authActions;
