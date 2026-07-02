

import NavbarComponents from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";


export default function RootLayout({ children }) {
  return (
    <>
   
        <NavbarComponents/>
        
        <div>{children}</div>
        <Footer/>
        </>
        
  );
}
