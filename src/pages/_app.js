import { ThemeProvider } from "next-themes";
import { SessionProvider } from 'next-auth/react';
import "../styles/tailwind.css";
import '../styles/signup.module.css';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;