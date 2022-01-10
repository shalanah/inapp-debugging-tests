import "./styles.css";
import InApp from "./InApp";

export default function App() {
  return (
    <div className="App">
      <h1>Hi! 👋 I'm a demo site.</h1>
      <p>
        This content will get covered up if you are testing in an in-app (web
        view) on Android, iOS or another device.
      </p>
      <InApp />
    </div>
  );
}
