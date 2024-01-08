import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages";
import Detail from "./pages/todos/Detail";
import Today from "./pages/todos/Today";
import UpComing from "./pages/todos/UpComing";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Index />} index />
        <Route element={<Detail />} path="/detail/:id" />
        <Route element={<Today />} path="/today" />
        <Route element={<UpComing />} path="/upcoming" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
