import React from "react";

const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm";

export type inputTypes = "input" | "select";

type InputProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  labelText?: string;
  labelFor: string;
  id: string;
  name: string;
  type: inputTypes;
  isRequired?: boolean;
  placeholder?: string;
  customClass?: string;
  disabled?: boolean;
  selectFilds?: string[];
  isHidden?: boolean;
};

export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
  selectFilds,
  disabled,
  isHidden,
}: InputProps) {
  if (type === "select") {
    return (
      <div className={`my-1 ${customClass}`}>
        <div className={`${isHidden && "hidden"}`}>
          {labelText && (
            <label
              htmlFor={labelFor}
              className="text-gray-600 font-semibold text-base"
            >
              {labelText}
            </label>
          )}
          <select
            id={id}
            name={name}
            onChange={handleChange}
            placeholder={"Selecione um tipo"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-3 "
            value={value}
            disabled={disabled}
          >
            <option value={-1} key={"Selecione"}>
              Selecione
            </option>
            {selectFilds?.map((select, index) => {
              return (
                <option value={index} key={select}>
                  {select}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-1 ${customClass}`}>
      <div className={`${isHidden && "hidden"}`}>
        {labelText && (
          <label
            htmlFor={labelFor}
            className="text-gray-600 font-semibold text-base"
          >
            {labelText}
          </label>
        )}
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          required={isRequired}
          className={fixedInputClass + customClass}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
