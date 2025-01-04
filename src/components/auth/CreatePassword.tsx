import { useEffect, useState } from "react";
import logo from "../../assets/logo/new-logo.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../ui/button";
import { useSignupContext } from "@/context/SignupContext";

const FormSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password must mutch",
    path: ["confirm_password"],
  });

function CreatePassword({ setCurr }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const signupCon = useSignupContext();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    signupCon.setUserInfo({ password: data.password });
    setCurr((c: number) => c + 1);
  }

  useEffect(() => {
    if (signupCon.userInfo.password) {
      form.setValue("password", signupCon.userInfo.password);
      form.setValue("confirm_password", signupCon.userInfo.password);
    }
  }, []);
  return (
    <div>
      <img className="w-52 mx-auto" src={logo} alt="" />
      <div className="flex flex-col items-center my-4">
        <div className="text-3xl font-semibold mt-4">Create Password</div>
        <div className="text-center text-sm mt-2 max-w-lg text-gray-600">
          The password length is at least 6 characters
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mx-auto max-w-sm  mt-16">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="full_name"
                        placeholder="Enter your password"
                        className={"!rounded-3xl shadow !bg-[#F0F0FF] "}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <FaEye
                            className="h-4 w-4"
                            aria-hidden="true"
                            color="#A1A9B5"
                          />
                        ) : (
                          <FaEyeSlash
                            className="h-4 w-4"
                            aria-hidden="true"
                            color="#A1A9B5"
                          />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id="last_name"
                        placeholder="Confirm your password "
                        className={"!rounded-3xl  shadow !bg-[#F0F0FF]"}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <FaEye
                            className="h-4 w-4 "
                            aria-hidden="true"
                            color="#A1A9B5"
                          />
                        ) : (
                          <FaEyeSlash
                            className="h-4 w-4"
                            aria-hidden="true"
                            color="#A1A9B5"
                          />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className=" px-7 py-2 mt-4 shadow rounded-3xl bg-primary text-white  ">
              Get Started
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreatePassword;
