import TheSquad from "./(section)/about/TheSquad";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <TheSquad />
    </div>
  );
}
