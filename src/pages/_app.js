import { ThemeProvider } from "next-themes";
import "../styles/tailwind.css";
import '../styles/signup.module.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;