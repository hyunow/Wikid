import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@components/Header";
import { AuthProvider } from "@context/AuthContext";
import { useAuth } from "@context/AuthContext";
import "@styles/globals.css";
import "@styles/quillCustom.css";
import ProfileIconTest from "@images/image_profile_test.jpg";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Wikid</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </Head>
      <AuthProvider>
        <Header profileIconSrc={ProfileIconTest} />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
