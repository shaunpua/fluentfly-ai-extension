import HomepageComponent from "./home-page/home-page.component";
import NavbarComponent from "./navbar/navbar.component";
//TODO : make library imports and refactor naming of components
import "./App.css";
import { useEffect } from "react";
import db from "../background-scripts/db/indexDB";

const App = () => {
  useEffect(() => {
    const queryDb = async () => {
      try {
        const chineseWord = await db.entries.limit(10).toArray();
        console.log("DATA RESULT ", chineseWord);
      } catch {
        console.log("ERROR SEARCHING DB");
      }
    };

    queryDb();
  }, []);
  return (
    <div className="w-full flex flex-col overflow-y-auto">
      <NavbarComponent />

      <HomepageComponent />
    </div>
  );
};

export default App;
