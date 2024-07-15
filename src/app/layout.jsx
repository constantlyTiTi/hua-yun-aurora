
import { Inter } from "next/font/google";
import "./globals.css";
import { getWebSetting } from "./api/getContentful";
import Header from "./components/Header";
import { Suspense } from "react";
import Loading from "./Loading";
import Footer from "./components/Footer";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import NotFound from "./not-found";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HuaYunAurora",
  description: "Hua Yun Aurora Website",
};

export default async function RootLayout({ children }) {

  const webSettings = await getWebSetting()

  const settings = webSettings?.data?.items[0]?.fields

  return (

    <html lang="en">
      <body className={inter.className}>

        {
          settings &&
          <div className='relative h-screen flex flex-col w-dvw'>
            
              <Suspense fallback={<Loading />}>
              <Header settings = {settings} />
                <ErrorBoundary  fallback={<NotFound />}>
                <div className="flex-1 flex">
                {children}
                </div>
                </ErrorBoundary>
              </Suspense>

              <Footer />

          </div>
        }

      </body>
    </html>

  );
}
