import { ClerkProvider, SignIn, SignInButton } from "@clerk/nextjs";
import "./globals.css";
import Header from "./components/Header";
import { NavigationMenuDemo } from "./components/Categories";
import ContextWrapper from "@/global/context/page";

export const metadata = {
  title: "Sindhvirsa",
  description: "Culture Redefined",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <html lang="en">
        <ClerkProvider>
          <ContextWrapper>
        <body>
        
          <Header />
          <NavigationMenuDemo />
          
          {children}
          
        </body>
        </ContextWrapper>
        </ClerkProvider>
      </html>
    
  );
}
