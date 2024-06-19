import React from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessages?: string[];
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  errorMessages = [],
  ...inputProps
}) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-gray-900 text-lg font-medium">{label}</label>
      <div className="flex flex-col gap-1">
        <input {...inputProps} />
        {errorMessages.length > 0 && (
          <div style={{ color: "red", fontSize: 14 }}>
            {errorMessages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextField;
