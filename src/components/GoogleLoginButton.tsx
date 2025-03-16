import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleSignIn: React.FC = () => {
  const handleSuccess = async (credentialResponse: any) => {
    const serverAuthCode = credentialResponse.code;
    const scopes = [
      "email",
      "profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ];
    const deviceToken = "exampleDeviceToken";

    try {
      const response = await axios.get(
        "https://mpiglobal.org/auth/google/callback",
        {
          params: {
            code: serverAuthCode,
            scope: scopes.join(" "),
          },
          data: {
            deviceToken: deviceToken,
          },
        }
      );
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  const googleSignUp = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
    redirect_uri: "https://mpiglobal.org/auth/google/callback",
    flow: "auth-code",
    scope:
      "email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
  });

  return (
    <Button
      type="button"
      onClick={() => googleSignUp()}
      className="flex py-2 shadow rounded-3xl items-center justify-center"
    >
      <FcGoogle size={22} />
      <div className="text-sm">Sign in with Google</div>
    </Button>
  );
};

export default GoogleSignIn;
