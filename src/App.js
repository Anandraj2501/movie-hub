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
import Searchpage from "./Component/Searchpage";
function App() {

  return (
    <div className="root">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Main />}></Route>
          <Route path='/favourites' exact element={<Favourites />}></Route>
          <Route path='/singleitem/:id' exact element={<Singleitem />}></Route>
          <Route path='/search' exact element={<Searchpage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
