import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#09090b] text-[#F5F5F0] antialiased">{children}</body>
    </html>
  );
}