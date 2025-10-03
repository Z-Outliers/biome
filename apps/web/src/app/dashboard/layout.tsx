import Protector from "@/components/Protector"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protector>
      {children}
    </Protector>
  );
}