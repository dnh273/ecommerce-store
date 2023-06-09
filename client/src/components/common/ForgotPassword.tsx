import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authApi from "../../api/authApi";
import { IForgotPassword } from "../../interfaces/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export default function ForgotPassword(props: any) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForgotPassword>();

  const { setForgotPassword } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const [errmessage, setErrmessage] = useState("");
  const [succesmessage, setSuccesmessage] = useState("");

  const handleSubmitForgotPassword = (data: IForgotPassword) => {
    setLoading(true);
    authApi
      .forgotPassword(data)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setSuccesmessage(
            "We've sent you an email with a link to update your password."
          );
        }
      })

      .catch((err) => {
        setLoading(false);
        setErrmessage("No account found with that email.");
      });
  };
  const handleSetForgotPassword = () => {
    setForgotPassword();
  };
  return (
    <div className="w-2/4 box-border max-md:w-full">
      <div>
        <h2 className="text-2xl mb-1">Reset your password</h2>
        <p className=" text-gray-500 mb-5">
          We will send you an email to forgot password.
        </p>
      </div>
      <form onSubmit={handleSubmit(handleSubmitForgotPassword)}>
        <div className="text-red-600 ">
          {errmessage && <p className="">{errmessage}</p>}
          <div className="text-green-600 ">
            {succesmessage && (
              <p className="">
                {succesmessage}
                <span
                  onClick={handleSetForgotPassword}
                  className=" underline ml-2 text-xl"
                >
                  login here
                </span>
              </p>
            )}
          </div>
        </div>

        <input
          className="border border-slate-400 w-full py-3 px-5 "
          id="email"
          placeholder="Email"
          {...register("email", {
            required: true,

            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.email?.type === "required" && (
          <p className="text-red-600 mt-1 text-xs">Enter a valid email</p>
        )}
        {errors.email?.type === "pattern" && (
          <p className="  text-red-600">Please enter a valid email address</p>
        )}
        <div className="mt-6">
          <button className="  border text-xs tracking-[3px] border-slate-400 h-12 w-1/2 hover:bg-red-900 bg-slate-900 text-white  max-[700px]:w-full">
            {loading ? "loading..." : "SUBMIT"}
          </button>
          <p
            onClick={handleSetForgotPassword}
            className="max-[700px]:w-full max-[700px]: mt-4  w-2/4 inline-block text-center cursor-pointer underline"
          >
            Cancel
          </p>
        </div>
      </form>
    </div>
  );
}
