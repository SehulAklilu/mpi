import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-query";
import { getToken } from "@/api/auth.api";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import AuthWrapper from "./AuthWrapper";
import logo from "../../assets/logo/new-logo.svg";

const FormSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
});

export interface TokenPayload {
  email: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationKey: ["getToken"],
    mutationFn: (payload: TokenPayload) => getToken(payload),
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
      navigate("/reset-password"); // Navigate to password reset page
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
  }

  return (
    <AuthWrapper>
      <img className="w-52 mx-auto" src={logo} alt="Logo" />
      <div className="flex flex-col items-center">
        <div className="text-2xl font-semibold mt-4">Reset Your Password</div>
        <div className="text-center text-sm mt-2 max-w-lg text-gray-600">
          Enter the email associated with your account. We'll send you an OTP to
          reset your password.
        </div>
        {isSuccess && (
          <div className="text-center text-sm mt-2 max-w-lg text-green-700">
            We've sent a password reset link to your email. Please check your
            inbox and follow the instructions to reset your password.
          </div>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mx-auto max-w-sm mt-16">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="!rounded-3xl shadow !bg-[#F0F0FF]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="flex items-center justify-center px-7 py-2 shadow rounded-3xl mt-2 bg-primary text-white">
              {isLoading ? (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "2rem",
                    color: "#FFFFFF",
                  }}
                />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div className="text-sm flex gap-2 justify-center w-full mx-auto mt-4">
        <div>Remembered your password?</div>
        <Link to={"/login"} className="text-primary">
          Log In
        </Link>
      </div>
    </AuthWrapper>
  );
};

export default ResetPassword;
