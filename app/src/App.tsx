import { lazy } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import TabMenu from "@/components/TabMenu";
import FoodLoggerDialog from "@/components/Dialog/FoodLoggerDialog";
import { useOpenFoodDex } from "@/hooks/useOpenFoodDex";
import { DEFAULT_CONTRY_CODE_FROM_CATALOG, getLocelizedIndexUrl } from "./constants";

const Tracker = lazy(() => import("@/views/Tracker"));
// Finland @todo: Make some onboarding flow to ask for contry
const HARD_CODED_COUNTRY_CODE = "fi";

function App() {
  // Install the global index
  useOpenFoodDex(getLocelizedIndexUrl(DEFAULT_CONTRY_CODE_FROM_CATALOG));
  // Install the local indexes
  useOpenFoodDex(getLocelizedIndexUrl(HARD_CODED_COUNTRY_CODE));
  return (
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
  );
}

export default App;
