import { ClerkProvider, SignIn, SignInButton } from '@clerk/nextjs';
import './globals.css';

export const metadata = {
  title: 'Sindhvirsa',
  description: 'Culture Redefined',
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    //<ClerkProvider>
      <html lang="en">      
        <body>{children}</body>
      </html>
    //</ClerkProvider>
  );
}
