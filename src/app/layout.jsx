
import { Inter } from "next/font/google";
import "./globals.css";
import { getWebSetting } from "./api/useContentful";
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
          <div className='h-dvh flex flex-col'>
            <Header header={settings.header} iconHeaderImageUrl={settings.iconHeaderImageUrl} />
            <div className='w-dvw flex h-full'>
              <Suspense fallback={<Loading />}>
                <ErrorBoundary fallback={<NotFound />}>{children}</ErrorBoundary>
              </Suspense>
            </div>
            <Footer />
          </div>
        }
      </body>
    </html>

  );
}
