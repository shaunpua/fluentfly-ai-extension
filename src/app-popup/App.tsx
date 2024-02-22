import HomepageComponent from "./home-page/home-page.component";
import NavbarComponent from "./navbar/navbar.component";
//TODO : make library imports and refactor naming of components
import "./App.css";

const App = () => {
  return (
    <div className="w-full flex flex-col overflow-y-auto">
      <NavbarComponent />

      <HomepageComponent />
    </div>
  );
};

export default App;
