import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const Tracker = lazy(() => import("@/views/Tracker"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
