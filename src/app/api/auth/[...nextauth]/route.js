"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = exports.authOptions = void 0;
const next_auth_1 = __importDefault(require("next-auth"));
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const restClient_1 = __importDefault(require("@/api/restClient"));
function refreshAccessToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield restClient_1.default.post("/auth/refresh", {
                refreshToken: token.refreshToken,
            });
            const refreshedTokens = response.data;
            return Object.assign(Object.assign({}, token), { accessToken: refreshedTokens.accessToken, accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000, refreshToken: refreshedTokens.refreshToken || token.refreshToken });
        }
        catch (error) {
            console.error("Error refreshing access token:", error);
            return Object.assign(Object.assign({}, token), { error: "RefreshAccessTokenError" });
        }
    });
}
exports.authOptions = {
    providers: [
        (0, credentials_1.default)({
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            authorize(credentials) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!credentials)
                        return null;
                    const { username, password } = credentials;
                    const response = yield restClient_1.default.post("/auth/login", {
                        username,
                        password,
                        expiresInMins: 24 * 60, // 24hrs. stupid API,
                    });
                    const user = response === null || response === void 0 ? void 0 : response.data;
                    if (user)
                        return user;
                    return null;
                });
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours
        updateAge: 60 * 60, // 1 hour
    },
    callbacks: {
        jwt(_a) {
            return __awaiter(this, arguments, void 0, function* ({ token, user }) {
                if (user) {
                    return Object.assign(Object.assign({}, token), { accessToken: user.token, refreshToken: user.refreshToken, user });
                }
                if (Date.now() < token.accessTokenExpires) {
                    return token;
                }
                return refreshAccessToken(token);
            });
        },
        session(_a) {
            return __awaiter(this, arguments, void 0, function* ({ session, token }) {
                session.user = token.user;
                session.accessToken = token.accessToken;
                session.error = token.error;
                return session;
            });
        },
    },
    pages: {
        signIn: "/", // Custom sign-in page
    },
};
const handler = (0, next_auth_1.default)(exports.authOptions);
exports.GET = handler;
exports.POST = handler;
