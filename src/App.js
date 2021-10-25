import TextHeader from "./components/TextHeader/TextHeader";
import styles from './App.module.css';
import GooglePixel from "./components/GooglePixel/GooglePixel";
import MessageApp from "./components/MessageApp/MessageApp";

function App() {
  return (
    <div className={styles.App}>
      {/* Main App Header */}
      <TextHeader />
      {/* Google Pixel Mobile Layout */}
      <GooglePixel>
        {/* Messaging App View */}
        <MessageApp />
      </GooglePixel>
    </div>
  );
}

export default App;
