import { HomeClient } from "@/app/components/home/HomeClient";
import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <HomeClient />
    </div>
  );
}
