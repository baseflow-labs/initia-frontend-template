import React, { useRef, useState } from "react";
import { InputProps } from "..";
import { ValidatedInput } from "../Input";

type FinalInput = ValidatedInput &
  InputProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const OTP_LENGTH = 6;

const OtpInput: React.FC<FinalInput> = ({
  name,
  value,
  handleChange,
  handleBlur,
  type,
  ...input
}) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const focusInput = (index: number) => {
    const input = inputsRef.current[index];
    if (input) input.focus();
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    } else {
      handleChange({ target: { name, value: newOtp.join("") } });
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const paste = e.clipboardData.getData("Text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(paste)) return;

    const nextOtp = paste
      .split("")
      .concat(Array(OTP_LENGTH).fill(""))
      .slice(0, OTP_LENGTH);
    setOtp(nextOtp);
    focusInput(nextOtp.length - 1);
  };

  return (
    <div
      onPaste={handlePaste}
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        direction: "ltr",
      }}
    >
      {otp.map((digit, i) => (
        <input
          {...input}
          type="text"
          inputMode="numeric"
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          maxLength={1}
          pattern="\d*"
          name={name}
          value={digit}
          onChange={(e) => handleOtpChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onBlur={handleBlur}
          className="form-check-input"
          required={true}
          style={{
            width: "48px",
            height: "48px",
            textAlign: "center",
            fontSize: "1.5rem",
            borderRadius: "8px",
            border: "2px solid #ccc",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => e.target.select()}
          key={i}
        />
      ))}
    </div>
  );
};

export default OtpInput;
