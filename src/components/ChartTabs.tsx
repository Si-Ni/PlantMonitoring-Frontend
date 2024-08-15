import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ApexChart from "./ApexChart";
import { PlantData } from "../types/global";
import sensorColors from "../data/sensorColors.json";

function ChartTabs(props: { plantData: PlantData[] }) {
  const sensorTypes = Array.from(new Set(props.plantData.flatMap((data) => data.sensors.map((sensor) => sensor.type))));

  const tabs = sensorTypes.map((type) => {
    const sensors = props.plantData.flatMap((data) =>
      data.sensors
        .filter((sensor) => sensor.type === type)
        .map((sensor) => ({
          ...sensor,
          timestamp: data.ts
        }))
    );

    const content = (
      <Card>
        <CardBody>
          <ApexChart
            sensors={sensors}
            color={sensorColors.find((entry) => entry.name === sensors[0].type)?.color || "primary"}
          />
        </CardBody>
      </Card>
    );

    const displayLabel = type.replace(/_/g, " ");

    return {
      id: type,
      label: displayLabel.charAt(0).toUpperCase() + displayLabel.slice(1),
      content
    };
  });

  return (
    <div className="flex w-full justify-center flex-col">
      <Tabs aria-label="Dynamic tabs">
        {tabs.map((tab) => (
          <Tab key={tab.id} title={tab.label}>
            {tab.content}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default ChartTabs;
