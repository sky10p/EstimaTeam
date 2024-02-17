import { HTMLInputTypeAttribute, useState } from "react";
import { Button } from "../Button";
import "./InputWithButton.css";

export type InputWithButtonProps = {
  label: string;
  textButton: string;
  placeholder: string;
  inputType?: HTMLInputTypeAttribute;
  onClickButton?: (inputValue: string) => void | Promise<void>;
  required?: boolean;
  validate?: (inputValue: string) => boolean | Promise<boolean>;
  validationErrorMessage?: string;
  
};

export const InputWithButton: React.FC<InputWithButtonProps> = ({
  inputType = "text",
  label,
  placeholder,
  textButton,
  onClickButton,
  required,
  validate,
  validationErrorMessage,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [errorRequired, setErrorRequired] = useState(false);
  const [errorValidation, setErrorValidation] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleOnClick = async () => {
    if (required && inputValue === "") {
      setErrorRequired(true);
      return;
    }

    if (validate && !(await validate(inputValue))) {
      setErrorValidation(true);
      return;
    }

    if (onClickButton) {
      await onClickButton(inputValue);
    }
    setErrorRequired(false);
    setErrorValidation(false);
  };
  return (
    <>
      <label htmlFor="input">{label}</label>
      <input
        type={inputType}
        id="input"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      {errorRequired && <div className="error">Field is required</div>}
      {errorValidation && (
        <div className="error">
          {validationErrorMessage ?? "Validation error"}
        </div>
      )}
      <Button onClick={handleOnClick} textButton={textButton} />
    </>
  );
};
