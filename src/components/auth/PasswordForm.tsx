import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import { resetPassword } from "@/api/auth.api";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import AuthWrapper from "./AuthWrapper";
import logo from "../../assets/logo/new-logo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const NewFormSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password must match",
    path: ["confirm_password"],
  });

export interface ResetPayload {
  email: string;
  token: string;
  password: string;
}

interface ResetSuccessProps {
  onLogin: () => void;
}

const ResetSuccess = ({ onLogin }: ResetSuccessProps) => {
  return (
    <div className="flex flex-col my-auto items-center gap-4">
      <div className="text-2xl font-semibold mt-4 text-center">
        Password Reset Successfully!
      </div>
      <div className="text-center text-sm text-gray-600 max-w-lg">
        Your password has been updated successfully. Please log in with your new
        password.
      </div>
      <Button
        className="px-7 py-2 shadow rounded-3xl mt-2 bg-primary text-white"
        onClick={onLogin}
      >
        Log In
      </Button>
    </div>
  );
};

const PasswordFormComponent = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [resetSuccess, setResetSuccess] = useState(false);

  const form = useForm<z.infer<typeof NewFormSchema>>({
    resolver: zodResolver(NewFormSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (payload: ResetPayload) => resetPassword(payload),
    onSuccess: (response) => {
      toast.success(
        "Password reset successfully. Please log in with your new password."
      );
      //   navigate("/login");
      setResetSuccess(true);
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  function onSubmit(data: z.infer<typeof NewFormSchema>) {
    if (email && token) {
      const payload = {
        email,
        token,
        password: data.password,
      };
      mutate(payload);
    } else {
      toast.error("Missing required parameters for password reset");
    }
  }

  return (
    <AuthWrapper>
      <img className="w-52 mx-auto" src={logo} alt="Logo" />

      {resetSuccess ? (
        <ResetSuccess onLogin={() => navigate("/login")} />
      ) : (
        <>
          <div className="flex flex-col items-center my-4">
            <div className="text-3xl font-semibold mt-4">Create Password</div>
            <div className="text-center text-sm mt-2 max-w-lg text-gray-600">
              The password length is at least 6 characters
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2 mx-auto max-w-sm mt-16">
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
                            className={"!rounded-3xl shadow !bg-[#F0F0FF]"}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                          >
                            {showConfirmPassword ? (
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
                    "Reset Password"
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
        </>
      )}
    </AuthWrapper>
  );
};

export default PasswordFormComponent;
