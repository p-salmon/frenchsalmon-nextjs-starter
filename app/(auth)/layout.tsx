export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout provides a clean layout for auth pages without navigation
  return <div className="min-h-screen">{children}</div>;
}
