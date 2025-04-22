
import Image from "next/image";
import styles from "./page.module.css";
import CloudinaryLinks from "@/app/components/CloudinaryLinks"
import ThirdlightLinks from "@/app/components/ThirdlightLinks";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  return (
      <div>
          <Navbar />
         <h1 className={styles.test}>Cloudinary/ThirdLight PoC</h1>
          <ThirdlightLinks />
          <CloudinaryLinks />
      </div>
  );
}
