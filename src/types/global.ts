export type QueryParams = {
  plant: string;
  startTs: number | null;
  endTs: number | null;
};

export type Sensor = {
  _id: string;
  type: string;
  value: number;
  unit: string;
};

export type PlantData = {
  sensors: Sensor[];
  ts: number;
};
