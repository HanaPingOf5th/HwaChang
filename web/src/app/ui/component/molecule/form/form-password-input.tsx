import { useContext } from "react";
import { FormContext } from "./form.context";
import { useFormStatus } from "react-dom";
import TextInput from '../../atom/text-input/text-input';

interface FormPasswordInputProps {
  label: string;
  id: string;
  placeholder: string;
  className?: string;
  required?: boolean;
}

export function FormPasswordInput({label, id, placeholder ,className, required = false}:FormPasswordInputProps){
  const { errors } = useContext(FormContext);
  const { pending } = useFormStatus();

  return (
    <div className="group">
    <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium group-has-[:required]:after:pl-1 group-has-[:required]:after:text-red-400 group-has-[:required]:after:content-['*']"
      >
        {label}
      </label>
      <TextInput
        required={required}
        disabled={pending}
        error={errors[id] ? true : false}
        errorMessages={errors[id]}
        type={'password'}
        id={id}
        className={className}
        name={id}
        placeholder={placeholder}
      />
    </div>
  )
}