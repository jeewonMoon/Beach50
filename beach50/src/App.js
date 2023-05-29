import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BeachList from "./pages/BeachList";
import BeachDetail from "./pages/BeachDetail";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route
               path="/"
               element={<Home />}
            />
            <Route
               path="/:area"
               element={<BeachList />}
            />
            <Route
               path="/:area/:name"
               element={<BeachDetail />}
            />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
