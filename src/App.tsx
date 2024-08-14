import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import axios from "./api/axios";

const PLANT_NAMES_ROUTE = "/getPlantNames";

function App() {
  const [plantNames, setPlantNames] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(PLANT_NAMES_ROUTE)
      .then((res) => {
        setPlantNames(res.data.plantNames);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Dashboard plantNames={plantNames} />
    </>
  );
}

export default App;
