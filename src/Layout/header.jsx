import Link from "next/link";
import styles from "./header.module.css"; // Import CSS module

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">My website</Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
