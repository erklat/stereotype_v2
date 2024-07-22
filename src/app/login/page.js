"use strict";
// @ts-nocheck
"use client";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const Layout_component_1 = require("@/components/Layout/Layout.component");
const Form_1 = __importStar(require("@/components/Form/Form"));
const Text_1 = __importDefault(require("@/components/Form/components/Text/Text"));
const Button_component_1 = __importDefault(require("@/components/Button/Button.component"));
const validators_1 = require("@/utils/AuthManager/validators");
const yup_1 = require("@hookform/resolvers/yup");
const hooks_1 = require("@/state-management/hooks");
const AuthManager_reducer_1 = require("@/utils/AuthManager/AuthManager.reducer");
const Login = () => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const [isPending, startTransition] = (0, react_1.useTransition)();
    const { handleSubmit, control, formState: { isValid, isDirty }, getFieldState, } = (0, react_hook_form_1.useForm)({
        mode: "onChange",
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: (0, yup_1.yupResolver)(validators_1.schema),
    });
    const onSubmitAPI = (formData) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: AuthManager_reducer_1.actions.START_USER_LOGIN,
                promise: { resolve, reject },
                payload: {
                    formData,
                },
            });
        });
    };
    const onSubmit = (formData) => {
        onSubmitAPI(formData)
            .then(() => { })
            .catch(() => { });
    };
    return (<div className={``}>
      <Layout_component_1.Container>
        <div className={`
            min-h-screen 
            flex 
            justify-center 
            items-center
        `}>
          <div className={`
            max-w-96
            bg-white
            p-24
        `}>
            <Form_1.default onSubmit={handleSubmit((data) => onSubmit(data))}>
              <Form_1.FormRow>
                <react_hook_form_1.Controller name="username" control={control} rules={{ required: true }} render={({ field }) => (<Text_1.default label="Username" getFieldState={getFieldState} {...field}/>)}/>
              </Form_1.FormRow>
              <Form_1.FormRow>
                <react_hook_form_1.Controller name="password" control={control} rules={{ required: true }} render={({ field }) => (<Text_1.default label="Password" getFieldState={getFieldState} {...field}/>)}/>
              </Form_1.FormRow>
              <Form_1.FormRow>
                <Button_component_1.default label="Submit" disabled={!isValid} submit full/>
              </Form_1.FormRow>
            </Form_1.default>
          </div>
        </div>
      </Layout_component_1.Container>
    </div>);
};
exports.default = Login;
