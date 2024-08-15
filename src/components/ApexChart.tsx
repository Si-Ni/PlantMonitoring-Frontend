import ReactApexChart from "react-apexcharts";

function ApexChart({ sensors, color }: { sensors: any; color: string }) {
  const groupedSensors = sensors.reduce(
    (acc: any, sensor: any) => {
      if (!acc[sensor.type]) {
        acc[sensor.type] = [];
      }
      const dataPoint = { x: sensor.timestamp * 1000, y: sensor.value };
      if (isNaN(dataPoint.x) || isNaN(dataPoint.y)) {
        console.warn("Invalid data point:", dataPoint);
      }
      acc[sensor.type].push(dataPoint);
      return acc;
    },
    {} as Record<string, { x: number; y: number }[]>
  );

  const series = Object.keys(groupedSensors).map((type) => ({
    name: type.toUpperCase(),
    data: groupedSensors[type]
  }));

  const options = {
    chart: {
      background: "transparent",
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom",
        theme: "dark"
      }
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
