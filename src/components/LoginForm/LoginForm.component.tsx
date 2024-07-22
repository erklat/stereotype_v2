"use client";

import { useTransition } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import Form, { FormRow } from "@/components/Form/Form";
import Text from "@/components/Form/components/Text/Text";
import Button from "@/components/Button/Button.component";
import { schema as loginValidationSchema } from "@/utils/AuthManager/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@/state-management/hooks";
import { actions as authActions } from "@/utils/AuthManager/AuthManager.reducer";

type TFormValues = {
  [key: string]: string;
};

const LoginForm = () => {
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

  const onSubmitAPI = (formData: TFormValues) => {
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
    <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <FormRow>
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Text label="Username" getFieldState={getFieldState} {...field} />
          )}
        />
      </FormRow>
      <FormRow>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Text label="Password" getFieldState={getFieldState} {...field} />
          )}
        />
      </FormRow>
      <FormRow>
        <Button label="Submit" disabled={!isValid} submit full />
      </FormRow>
    </Form>
  );
};

export default LoginForm;
