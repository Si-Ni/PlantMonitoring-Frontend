import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Header from "../components/Header";
import { PlantData, QueryParams } from "../types/global.ts";
import axios from "../api/axios";
import ChartTabs from "../components/ChartTabs.tsx";
import { Progress } from "@nextui-org/react";

const PLANT_NAMES_ROUTE = "/getPlantNames";
const PLANT_DATA_ROUTE = "/getPlantData";

function Dashboard() {
  const [cookies] = useCookies(['apiKey']);
  const [plantNames, setPlantNames] = useState<string[]>([]);
  const [queryParams, setQueryParams] = useState<QueryParams | null>(null);
  const [plantData, setPlantData] = useState<PlantData[]>([]);
  const [currentPlant, setCurrentPlant] = useState<string>("");
  const [isLoadingPlantNames, setIsLoadingPlantNames] = useState<boolean>(true);
  const [isLoadingPlantData, setIsLoadingPlantData] = useState<boolean>(false);

  const apiKey = cookies.apiKey; 

  useEffect(() => {
    if (!apiKey) return;

    setIsLoadingPlantNames(true); 

    axios
      .get(PLANT_NAMES_ROUTE, {
        params: {
          code: apiKey
        }
      })
      .then((res) => {
        setPlantNames(res.data.plantNames);
        setIsLoadingPlantNames(false); 
      })
      .catch(() => {
        setIsLoadingPlantNames(false); 
      });
  }, [apiKey]); 

  useEffect(() => {
    if (!queryParams || !apiKey) return; 

    setIsLoadingPlantData(true); 
    axios
      .get(PLANT_DATA_ROUTE, {
        params: {
          ...queryParams,
          code: apiKey,
          limit: 10000
        }
      })
      .then((res) => {
        setCurrentPlant(res.data.data[0]?.plantName || "");
        setPlantData(res.data.data[0]?.measurements || []);
        setIsLoadingPlantData(false); 
      })
      .catch(() => {
        setIsLoadingPlantData(false); 
      });
  }, [queryParams, apiKey]); 

  return (
    <>
      <Header
        plantNames={plantNames}
        setQueryParams={setQueryParams}
        currentPlant={currentPlant}
        isLoadingPlantNames={isLoadingPlantNames}
      />
      <div className="flex justify-center">
        <div className="w-9/12 mt-20">
          {isLoadingPlantData ? (
            <div className="flex w-full full-h justify-center mt-20">
              <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md" />
            </div>
          ) : (
            plantData.length !== 0 && <ChartTabs plantData={plantData} />
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
