// @ts-nocheck

"use client";
import { useTransition } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { Container } from "@/components/Layout/Layout.component";
import Form, { FormRow, FormColumn } from "@/components/Form/Form";
import Text from "@/components/Form/components/Text/Text";
import Button from "@/components/Button/Button.component";
import { login as loginAction } from "@/utils/AuthManager/actions";
import { schema as loginValidationSchema } from "@/utils/AuthManager/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import TLoginData from "@/utils/AuthManager/types";
import { signIn } from "next-auth/react";
import { useAppDispatch } from "@/state-management/hooks";
import { actions as authActions } from "@/utils/AuthManager/AuthManager.reducer";

type TFormValues = {
  [key: string]: string;
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
    getFieldState,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmitAPI = (formData) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: authActions.START_USER_LOGIN,
        promise: { resolve, reject },
        payload: {
          formData,
        },
      });
    });
  };

  const onSubmit: SubmitHandler<TFormValues> = (formData) => {
    onSubmitAPI(formData)
      .then(() => {})
      .catch(() => {});
  };

  return (
    <div className={``}>
      <Container>
        <div
          className={`
            min-h-screen 
            flex 
            justify-center 
            items-center
        `}
        >
          <div
            className={`
            max-w-96
            bg-white
            p-24
        `}
          >
            <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <FormRow>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Text
                      label="Username"
                      getFieldState={getFieldState}
                      {...field}
                    />
                  )}
                />
              </FormRow>
              <FormRow>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Text
                      label="Password"
                      getFieldState={getFieldState}
                      {...field}
                    />
                  )}
                />
              </FormRow>
              <FormRow>
                <Button label="Submit" disabled={!isValid} submit full />
              </FormRow>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
