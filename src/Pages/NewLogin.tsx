import AuthWrapper from "@/components/auth/AuthWrapper";
import logo from "../assets/logo/mpi_logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
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
import { login } from "@/api/auth.api";
import { getAxiosErrorMessage } from "@/api/axios";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRole } from "@/RoleContext";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const FormSchema = z.object({
  email: z.string({ required_error: "Email is Required!" }).email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

function NewLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const { setRole, lastAttemptedRoute } = useRole();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      // Set user data in cookies and local storage
      Cookies.set("user_id", data.user.id);
      setRole(data.user.role);
      Cookies.set("role", data.user.role);
      Cookies.set("user_name", `${data.user.firstName} ${data.user.lastName}`);
      Cookies.set("avatar", data.user?.avatar || "");
      localStorage.setItem("authUpdate", Date.now().toString());

      // Handle incomplete registration first
      if (!data.user.isRegistrationComplete) {
        const params = new URLSearchParams();
        params.set("isRegistrationNotComplete", "true");
        navigate(`/signup?${params.toString()}`);
        return;
      }

      // Handle navigation based on user role
      switch (data.user.role) {
        case "coach":
        case "parent":
          navigate("/dashboard");
          break;
        default:
          if (
            data.user?.initialAssessment &&
            Object.keys(data.user.initialAssessment).length > 0
          ) {
            navigate("/progress");
          } else {
            navigate("/assessment");
          }
          break;
      }
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const onSubmit = (data: any) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };
  return (
    <AuthWrapper>
      <>
        <img className="w-52 mx-auto" src={logo} alt="" />
        <div className="flex flex-col items-center">
          <div className="text-2xl font-semibold mt-4">
            Log in to join Mindsight
          </div>
          <div className="text-center text-sm mt-2 max-w-lg text-gray-600">
            If continuing, you have agreed to our Terms of Service and confirm
            you have read our Privacy And Cookie Statement
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mx-auto max-w-sm  mt-10">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your email"
                        className={"!rounded-3xl shadow !bg-[#F0F0FF] "}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          id="password"
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

              <Button className="flex items-center justify-center px-7 py-2 shadow rounded-3xl mt-2 bg-primary text-white  ">
                {isLoading ? (
                  <LoaderCircle
                    style={{
                      animation: "spin 1s linear infinite",
                      fontSize: "2rem",
                      color: "#FFFFFF",
                    }}
                  />
                ) : (
                  "Login"
                )}
              </Button>
              <GoogleLoginButton />
            </div>
          </form>
        </Form>
        <div className="text-sm flex gap-2 justify-center w-full mx-auto mt-4">
          <div>Don't have an account?</div>
          <Link to={"/signup"} className="text-primary">
            Create your account here
          </Link>
        </div>
        <div className="text-sm flex gap-2 justify-center w-full mx-auto mt-4">
          <div>Forgot your password?</div>
          <Link to={"/reset-password"} className="text-primary">
            Reset it here
          </Link>
        </div>
      </>
    </AuthWrapper>
  );
}

export default NewLogin;
