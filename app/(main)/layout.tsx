import { Navigation } from "@/src/auth/components/navigation";

export default function MainGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">{children}</main>
    </div>
  );
}
