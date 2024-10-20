'use client'
// import { filterChildrenByType } from "@/app/utils/helper";
import { useFormState } from 'react-dom';
import React, { useEffect } from 'react';
import { FormSubmitButton } from "./form-submit-button";
import { FormContext } from "./form.context";
import Callout from "../callout/callout";
import { useToast } from "@/app/utils/hook/use-toast";

export interface FormState {
  isSuccess: boolean;
  isFailure: boolean;
  message: string | null;
  validationError: Record<string, string[] | undefined>;
}

interface FormRootProps {
  id: string;
  onSuccess?: ()=>void;
  action: (prevState: FormState, formData: FormData) => Promise<FormState> | FormState;
  failMessageControl: 'alert' | 'toast';
}

// const getFormSubmitButton = (children: React.ReactNode) => {
//   return filterChildrenByType(children, FormSubmitButton)
// }

export function FormRoot({
  id,
  action,
  onSuccess,
  failMessageControl = 'alert',
  children,
}: React.PropsWithChildren<FormRootProps>) {
  const initialState: FormState = { isSuccess: false, isFailure: false, message: null, validationError: {} };
  const [formState, dispatch] = useFormState(action, initialState);
  const { toast } = useToast();

  // formState의 상태에 따라서 동작 분기처리
  useEffect(() => {
    if (formState.isSuccess) {
      onSuccess?.();
    }
    if (formState.isFailure && failMessageControl === 'toast') {
      toast({
        title: formState.message ? formState.message : '',
        variant: 'destructive',
      });
    }
  }, [formState]);
  
  // 전달받은 children props 중 submit button만 렌더링
  // const formSubmitButton = getFormSubmitButton(children);

  // submit button이 아닌 props만 렌더링
  const renderWithoutSubmitButton = () => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child) || child.type === FormSubmitButton) return null;
      if (child.type === FormSubmitButton) return child;
      return <div key={index}>{child}</div>;
    });
  };

  return (
    <FormContext.Provider value={{ errors: formState.validationError, formId: id }}>
      {formState.isFailure && failMessageControl === 'alert' ? (
        <div className="mb-4">
          <Callout variant={'destructive'} content={formState.message!} />
        </div>
      ) : null}
      <form id={id} action={dispatch}>
        {renderWithoutSubmitButton()}
        {/* {formSubmitButton} */}
      </form>
    </FormContext.Provider>
  );
}
