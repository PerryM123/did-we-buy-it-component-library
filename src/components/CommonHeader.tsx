import { useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import styles from "./CommonHeader.module.css";

const SITE_NAME = '買ったっけ？！'

const navItems = [
  { label: "買い物リスト", to: "/" },
  { label: "変更履歴", to: "/change-history" },
];

type HeaderLinkProps = {
  to: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  children: ReactNode;
};

const DefaultLink = ({ to, children, ...props }: HeaderLinkProps) => (
  <a href={to} {...props}>
    {children}
  </a>
);

type HeaderProps = {
  LinkComponent?: ComponentType<HeaderLinkProps>;
};

export function CommonHeader({ LinkComponent = DefaultLink }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <LinkComponent to="/" className={styles.logo}>
          { SITE_NAME }
        </LinkComponent>
        <button
          onClick={() => setIsOpen(true)}
          aria-label="メニューを開く"
          className={styles.menuButton}
        >
          &#8801;
        </button>
      </header>
      <div
        onClick={() => setIsOpen(false)}
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
      />
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>{ SITE_NAME }</span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="メニューを閉じる"
            className={styles.closeButton}
          >
            &#x2715;
          </button>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <LinkComponent
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={styles.navLink}
            >
              {item.label}
              <span className={styles.chevron}>&#8250;</span>
            </LinkComponent>
          ))}
        </nav>
      </div>
    </>
  );
}
