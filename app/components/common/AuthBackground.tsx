import Link from "next/link";
import styles from "./AuthBackground.module.scss";

export function AuthBackground() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid} />
    </div>
  );
}

export function AuthFooterLinks() {
  return (
    <div className={styles.wrapper}>
      <Link href="/" className={styles.link}>
        홈으로
      </Link>
      <span className={styles.separator}>•</span>
      <a href="#" className={styles.link}>
        고객지원
      </a>
      <span className={styles.separator}>•</span>
      <a href="#" className={styles.link}>
        이용약관
      </a>
    </div>
  );
}
