import { useContext } from "react";
import { FormContext } from "./form.context";
import { useFormStatus } from "react-dom";
import { cn } from "@/app/utils/style/helper";

interface FormCheckBoxInputProps{
  id: string;
  name?: string
  required?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
}

export function FormCheckBoxInput({id, required=false, className, name, onValueChange}:FormCheckBoxInputProps){
  const { errors } = useContext(FormContext);
  const { pending } = useFormStatus();

  return(
  <div className="group">
    <input
      type="checkbox"
      className={cn(``,className)}
      id={id}
      name = {name}
      required={required}
      onChange={(e) => {
        onValueChange?.(e.target.value);
      }}
    />
  </div>
  )
}