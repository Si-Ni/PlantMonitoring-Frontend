import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { SensorWithTimestamp } from "../types/global";

interface ApexChartProps {
  sensors: SensorWithTimestamp[];
  color: string;
}

function ApexChart({ sensors, color }: ApexChartProps) {
  const groupedSensors = sensors.reduce((acc: Record<string, { x: number; y: number }[]>, sensor: any) => {
    const dataPoint = { x: sensor.timestamp * 1000, y: sensor.value };
    if (!isNaN(dataPoint.x) && !isNaN(dataPoint.y)) {
      if (!acc[sensor.type]) {
        acc[sensor.type] = [];
      }
      acc[sensor.type].push(dataPoint);
    }
    return acc;
  }, {});

  const series = Object.keys(groupedSensors).map((type) => ({
    name: type.toUpperCase(),
    data: groupedSensors[type].sort((a: any, b: any) => a.x - b.x)
  }));

  const options: ApexOptions = {
    chart: {
      background: "#18181B",
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    },
    stroke: {
      curve: "smooth",
      width: 2
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      hover: {
        size: 0
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    yaxis: {
      title: {
        text: `${
          sensors[0].type.replace(/_/g, " ").charAt(0).toUpperCase() + sensors[0].type.replace(/_/g, " ").slice(1)
        } in ${sensors[0].unit}`,
        style: {
          fontSize: "14px"
        }
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "dd MMM yyyy HH:mm"
      }
    },
    tooltip: {
      shared: false,
      hideEmptySeries: false,
      x: {
        show: true,
        format: "dd MMM HH:mm",
        formatter: undefined
      },
      y: {
        formatter: (val: number) => {
          return `${val} ${sensors[0].unit}`;
        },
        title: {
          formatter: (name: string) => name.replace(/_/g, " ")
        }
      },
      fixed: {
        enabled: false
      }
    },
    theme: {
      mode: "dark",
      monochrome: {
        enabled: true,
        color: color
      }
    }
  };

  return (
    <div className="flex justify-center pr-5 pt-5">
      <ReactApexChart className="w-full" options={options} series={series} type="area" height={350} />
    </div>
  );
}

export default ApexChart;
