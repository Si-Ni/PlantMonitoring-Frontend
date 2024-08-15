import { useEffect, useState } from "react";
import Header from "../components/Header";
import { QueryParams } from "../types/global.ts";
import axios from "../api/axios";

const PLANT_NAMES_ROUTE = "/getPlantNames";
const PLANT_DATA_ROUTE = "/getPlantData";

function Dashboard() {
  const [plantNames, setPlantNames] = useState<string[]>([]);
  const [queryParams, setQueryParams] = useState<QueryParams | null>(null);
  const [plantData, setPlantData] = useState<any[]>([]);
  const [currentPlant, setCurrentPlant] = useState<string>("");

  useEffect(() => {
    axios
      .get(PLANT_NAMES_ROUTE)
      .then((res) => {
        setPlantNames(res.data.plantNames);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!queryParams) return;

    axios
      .get(PLANT_DATA_ROUTE, {
        params: queryParams
      })
      .then((res) => {
        setCurrentPlant(res.data.data[0]?.plantName || "");
        setPlantData(res.data.data[0]?.measurements || []);
        console.log(res.data.data[0]?.measurements);
      })
      .catch(() => {});
  }, [queryParams]);

  return (
    <>
      <Header plantNames={plantNames} setQueryParams={setQueryParams} currentPlant={currentPlant}></Header>
    </>
  );
}

export default Dashboard;
