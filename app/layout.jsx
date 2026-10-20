import "./globals.css";
import { AppProvider } from "../components/AppProvider";
import { LanguageProvider } from "../components/LanguageProvider";

export const metadata = {
  title: "ShikkhaBondhu | Smart Primary Learning",
  description:
    "An innovative, child-friendly primary education dashboard designed for Bangladesh schools.",
  applicationName: "ShikkhaBondhu",
  openGraph: {
    title: "ShikkhaBondhu — Smart Primary Learning",
    description:
      "Learn, grow, and shine with a friendly digital classroom for Bangladesh primary schools.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <AppProvider>{children}</AppProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
