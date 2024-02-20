//import { useState } from 'react';
import HomepageComponent from "./home-page/home-page.component";
import NavbarComponent from "./navbar/navbar.component";
import "./App.css";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className="w-full flex flex-col overflow-y-auto">
      <NavbarComponent />

      <HomepageComponent />
    </div>
  );
}

export default App;
