"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StoreProvider;
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const store_1 = require("@/state-management/store");
const AuthManager_reducer_1 = require("@/utils/AuthManager/AuthManager.reducer");
function StoreProvider({ children, session, }) {
    const storeRef = (0, react_1.useRef)();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = (0, store_1.makeStore)();
        if (session === null || session === void 0 ? void 0 : session.user) {
            storeRef.current.dispatch({
                type: AuthManager_reducer_1.actions.STORE_USER_DATA,
                response: session === null || session === void 0 ? void 0 : session.user,
            });
        }
    }
    return <react_redux_1.Provider store={storeRef.current}>{children}</react_redux_1.Provider>;
}
