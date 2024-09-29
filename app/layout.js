import {Inter} from 'next/font/google'
import "./globals.css";
import Header from '../components/Header';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: "Scheduler",
  description: "Meeting Scheduling App",
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`inter.className`}>
          <Header />
          <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white ">
            {children}
          </main>
          <footer className="bg-blue-100 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made with ❤️‍🩹 by Sanjula Arora</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
