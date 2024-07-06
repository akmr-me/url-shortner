import "./App.css";
import Header from "./Components/Header";
import Content from "./Components/Content";
import PersistUser from "./Components/Authentication/PersistUser";

function App() {
  return (
    <div className="App">
      <PersistUser>
        <Header />
        <Content />
      </PersistUser>
    </div>
  );
}

export default App;
