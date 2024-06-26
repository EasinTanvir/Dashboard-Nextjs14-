"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./Input";

import { User } from "../../../types/type";
import SubmitButton from "./SubmitButton";
import api from "@/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Alert } from "@mui/material";
import Link from "next/link";
import UnAuthorizedStatus from "../UnAuthorizedStatus";
const AddNewUser = () => {
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: {
      errors,
      isSubmitSuccessful,
      isSubmitting,
      dirtyFields,
      isDirty,
      isValid,
    },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      status: "SUBSCRIBER",
    },
    mode: "onTouched",
  });

  const onSubmitHandler: SubmitHandler<User> = async (datas: User) => {
    try {
      const { data } = await api.post("/api/user/add-user", datas);
      toast.success(data.message);
      reset();
    } catch (err: any) {
      if (err.response.data.email) {
        console.log(err);
        setError("email", { message: err.response.data.email });
      } else {
        toast.error("User create failed");
      }
    }
  };

  return (
    <div className="sm:p-4 p-0  min-h-custom  flex justify-center items-center">
      {status === "authenticated" ? (
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="bg-topBar sm:w-[580px] w-full sm:p-6 p-4 rounded-md"
        >
          <h1 className=" text-xl font-bold  text-center text-white">
            Add New User
          </h1>
          <hr className="my-4" />
          <div className="flex flex-col gap-3">
            <Input
              label="UserName"
              type="text"
              id="username"
              placeholder="type username"
              errors={errors}
              required
              register={register}
              message="UserName is required"
            />
            <Input
              label="Email"
              id="email"
              errors={errors}
              required
              type="email"
              placeholder="type email"
              register={register}
              message="Email is required"
            />
            <Input
              label="Password"
              id="password"
              errors={errors}
              type="password"
              placeholder="type password"
              required
              register={register}
              message="Password is required"
              min={6}
            />
            <Input
              label="Role"
              id="status"
              errors={errors}
              required
              select
              type="select"
              register={register}
            />
          </div>
          <SubmitButton isSubmitting={isSubmitting}>Add New User</SubmitButton>
        </form>
      ) : (
        <>
          <UnAuthorizedStatus text="You Must Need to Login to Add New User" />
        </>
      )}
    </div>
  );
};

export default AddNewUser;
