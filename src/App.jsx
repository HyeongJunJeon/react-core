import styles from "./App.module.css";
import Survey from "./components/survey/Survey";
import Header from "./components/header";
function App() {
  return (
    <main className={styles.container}>
      <Header />
      <Survey />
    </main>
  );
}

export default App;
