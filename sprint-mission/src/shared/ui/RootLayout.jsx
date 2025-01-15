import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default RootLayout;
