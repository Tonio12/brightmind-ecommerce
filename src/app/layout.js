import { CartContextProvider } from "./Components/CartContext";
import "./globals.css";
import NavBar from "./Components/NavBar";

export const metadata = {
  title: "Bright Mind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CartContextProvider>
        <body>
          <NavBar />
          {children}
        </body>
      </CartContextProvider>
    </html>
  );
}
