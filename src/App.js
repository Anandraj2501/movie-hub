import Main from "./Component/Main";
import Navbar from "./Component/Navbar";
import Singleitem from "./Component/Singleitem";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";
import Favourites from "./Component/Favourites";
function App() {

  return (
    <div className="root">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Main />}></Route>
          <Route path='/favourites' exact element={<Favourites />}></Route>
          <Route path='/singleitem' exact element={<Singleitem />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
