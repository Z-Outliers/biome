import { authClient } from "@repo/auth/client";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import logo from "@/assets/logo.svg";
import LoadingOverlay from "@/components/LoadingOverlay";
import { LoginForm } from "./login-form";

export default function Login() {
  const { data: authData, isPending } = authClient.useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && authData?.user) navigate("/dashboard");
  }, [isPending, authData?.user, navigate]);

  if (isPending) return <LoadingOverlay show={true} fullscreen={true} />;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-3 self-center font-medium">
          <img src={logo} alt="BioMe Logo" width={72} height={72} />
          <span className="text-2xl font-bold text-primary">BioMe</span>
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
