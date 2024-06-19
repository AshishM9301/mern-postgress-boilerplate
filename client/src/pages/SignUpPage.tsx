import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Copyright from "../components/Copyright";
import TextField from "../components/TextFields";
import { VALIDATION, getErrorFields } from "../utils/formValidation";
import { ErrorFields, FormFields } from "../utils/types";
import { useAuth } from "../hooks/useAuth";

type Props = {};

function SignUpPage({}: Props) {
  const navigate = useNavigate();
  const auth = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<FormFields>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorFields>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = getErrorFields(form, VALIDATION);
    setErrors(newErrors);
    if (Object.keys(newErrors).every((key) => newErrors[key].length === 0)) {
      // No errors, proceed with form submission
      const payload = { ...form };
      console.log("Form submitted successfully:", payload);

      let url = "/auth/register";
      let baseUrl = process.env.API_URL;

      await fetch(baseUrl + url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            auth.register({
              token: response.token,
              user: response.data,
              rememberMe: true,
            });
          }
        });
    }
  };

  const formFields = [
    {
      label: "First name",
      name: "firstName",
      placeHolder: "First name",
      type: "text",
      value: form.firstName,
      onChange: handleChange,
    },
    {
      label: "Last name",
      name: "lastName",
      placeHolder: "Last name",
      type: "text",
      value: form.lastName,
      onChange: handleChange,
    },
    {
      label: "Email",
      name: "email",
      placeHolder: "Email",
      type: "text",
      value: form.email,
      onChange: handleChange,
    },
    {
      label: "Password",
      name: "password",
      placeHolder: "Password",
      type: "password",
      value: form.password,
      onChange: handleChange,
    },
  ];

  return (
    <div className="">
      <div className="flex flex-1 h-screen">
        <div className="h-screen flex-[10]">
          <img
            src="https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="computers"
            className="w-full h-full"
          />
        </div>
        <div className="flex-[2] flex flex-col justify-between md:px-4 2xl:px-10 py-3">
          <div className="w-40 mt-4">
            <img
              src="https://cdn.svgporn.com/logos/datasette.svg?response-content-disposition=attachment%3Bfilename%3Ddatasette.svg"
              alt="logo"
              className="max-w-full max-h-full"
            />
          </div>
          <div>
            <form action="" className="mb-20" onSubmit={handleRegister}>
              {formFields.map((item, index) => (
                <div key={index.toString()}>
                  <TextField
                    className="text-[16px] text-gray-800 leading-3 w-full border-[0.5px] border-slate-400 px-3 rounded-md outline-none py-2 focus:border-slate-600 ease-in-out"
                    placeholder={item.placeHolder}
                    name={item.name}
                    value={item.value}
                    onChange={item.onChange}
                    label={item.label}
                    errorMessages={errors[item.name]?.map(
                      (err) => err?.message
                    )}
                    type={item.type}
                  />
                </div>
              ))}

              <div className="mt-[36px]">
                <button
                  type="submit"
                  className="px-10 py-4 rounded-md text-xl bg-green-600 text-white font-medium leading-3 w-full border-[0.5px] border-green-500"
                >
                  Register
                </button>
              </div>
              <div className="mt-[36px]">
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="px-10 py-4 rounded-md text-xl bg-slate-200 text-gray-800 font-medium leading-3 w-full border-[0.5px] border-slate-500"
                >
                  Login
                </button>
              </div>
            </form>
            <Copyright />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
