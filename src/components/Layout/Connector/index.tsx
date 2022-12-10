import { ConnectButton } from "web3uikit";
import styles from "./Connector.module.css";

export default function Header() {
  return (
    <div className={styles.connector}>
      <h1 className={styles.h1}>Decentralized Patents Dapp</h1>
      <div className={styles.Connectbutton}>
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
