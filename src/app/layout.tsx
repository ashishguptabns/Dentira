import "./globals.css";

export const metadata = {
  title: "Task Management by Ashish",
  description: "AI first management tool for builders!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
