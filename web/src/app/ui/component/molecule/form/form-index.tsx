import { FormRoot } from './form-root';
import { FormTextInput } from './form-textinput';
import { FormPasswordInput } from './form-password-input';
import { FormNumberInput } from './form-number-input';
import { FormSubmitButton } from './form-submit-button';

// FormRoot 객체에 input & submit button 요소 할당
const Form = Object.assign(FormRoot, {
  TextInput: FormTextInput,
  NumberInput: FormNumberInput,
  PasswordInput: FormPasswordInput,
  SubmitButton: FormSubmitButton,
});

export default Form;
