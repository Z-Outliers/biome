import Image from "next/image";
import { LoginForm } from "@/components/login-form";
import Protector from "@/components/Protector"

export default function Login() {
  return (
    <Protector authPage={true}>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a href="/" className="flex items-center gap-3 self-center font-medium">
            <Image src="/logo.svg" alt="BioMe Logo" width={72} height={72} />
            <span className="text-2xl font-bold text-primary">BioMe</span>
          </a>
          <LoginForm />
        </div>
      </div>
    </Protector>
  );
}
