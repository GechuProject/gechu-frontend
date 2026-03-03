import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <Link href="/" className={styles.logo}>
            <Gamepad2 className={styles.logoIcon} />
            <span className={styles.logoText}>Gechu</span>
          </Link>

          <div className={styles.links}>
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
            <span className={styles.separator}>•</span>
            <a href="#" className={styles.link}>
              개인정보처리방침
            </a>
          </div>

          <p className={styles.copy}>© 2026 Gechu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
