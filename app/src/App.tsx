import { lazy } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import TabMenu from "./components/TabMenu";
import FoodLoggerDialog from "./components/FoodLoggerDialog";

const Tracker = lazy(() => import("@/views/Tracker"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/food-log" replace />} />
          <Route path="/food-log" element={<Tracker />} />
          <Route path="/strategy" element={<Navigate to="/food-log" replace />} />
          <Route path="/more" element={<Navigate to="/food-log" replace />} />
        </Routes>
        <TabMenu />
        <FoodLoggerDialog />
      </BrowserRouter>
    </>
  );
}

export default App;
