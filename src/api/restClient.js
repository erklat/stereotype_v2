"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localRestClient = void 0;
const axios_1 = __importDefault(require("axios"));
// import createAuthRefreshInterceptor from "axios-auth-refresh";
// import { getCookie } from "grutils/cookie";
// import { actions as authActions } from "grutils/AuthManager/AuthManager.reducer";
// import { getEntityId } from "grutils/GreenlabelManager/utils";
const axiosConfig = () => {
    var _a;
    return {
        baseURL: (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NEXT_PUBLIC_REST_API,
        headers: {
        // Authorization: `Bearer ${fakeToken}`
        },
    };
};
const axiosLocalConfig = () => {
    var _a;
    return {
        baseURL: (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NEXT_PUBLIC_LOCAL_REST_API,
        headers: {
        // Authorization: `Bearer ${fakeToken}`
        },
    };
};
const restClient = axios_1.default.create(axiosConfig());
exports.localRestClient = axios_1.default.create(axiosLocalConfig());
exports.default = restClient;
