import { authClient } from "@repo/auth/client";
import { headers } from "next/headers"
import { redirect } from "next/navigation";

interface ProtectorProps {
  children: React.ReactNode;
  redirectTo?: string;
  authPage?: boolean;
}

export default async function Protector({
  children,
  authPage = false,
}: ProtectorProps) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers()
    }
  })

  if (!authPage && !session?.data?.user) {
    redirect('/login');
  }

  if(authPage && session?.data?.user) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
