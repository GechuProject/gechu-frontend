import styles from "./Icon3D.module.scss";

export function Icon3D({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${styles.wrapper} ${className}`}>{children}</div>;
}
