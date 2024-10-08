import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Select,
  SelectItem,
  DatePicker,
  DateValue,
  Spinner
} from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { useEffect, useState } from "react";
import { QueryParams } from "../types/global";

interface FilterPopOverProps {
  plantNames: string[];
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams | null>>;
  isLoadingPlantNames: boolean;
}

function FilterPopOver(props: FilterPopOverProps) {
  const [plantName, setPlantName] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<DateValue | null>(null);
  const [dateTo, setDateTo] = useState<DateValue | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setPlantName(props.plantNames.length > 0 ? props.plantNames[0] : "");
  }, [props.plantNames]);

  const clearFilters = () => {
    setDateFrom(null);
    setDateTo(null);
  };

  const fillSearchParams = () => {
    const queryParams: QueryParams = {
      plant: plantName,
      startTs: dateFrom && new Date(dateFrom.toString()).getTime() / 1000,
      endTs: dateTo && new Date(dateTo.toString()).getTime() / 1000
    };
    props.setQueryParams(queryParams);
    setIsOpen(false);
  };

  const content = (
    <PopoverContent className="w-[240px] bg">
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <div className="flex">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Filters
            </p>
            {props.isLoadingPlantNames && <Spinner className="ml-3" size="sm" />}
          </div>
          <div className="mt-2 flex flex-col gap-2 w-full">
            <Select
              isRequired
              label="Plant name"
              placeholder="Select a plant"
              defaultSelectedKeys={props.plantNames.length > 0 ? ["0"] : undefined}
              className="max-w-xs"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setPlantName(props.plantNames[Number(event.target.value)])
              }
            >
              {props.plantNames.map((plantName, i) => (
                <SelectItem key={i}>{plantName}</SelectItem>
              ))}
            </Select>
            <I18nProvider locale="en-GB">
              <DatePicker
                label="From"
                variant="bordered"
                hideTimeZone
                showMonthAndYearPickers
                hourCycle={24}
                granularity="minute"
                value={dateFrom}
                onChange={(date) => setDateFrom(date)}
              />
            </I18nProvider>
            <I18nProvider locale="en-GB">
              <DatePicker
                label="To"
                variant="bordered"
                hideTimeZone
                showMonthAndYearPickers
                hourCycle={24}
                granularity="minute"
                value={dateTo}
                onChange={(date) => setDateTo(date)}
              />
            </I18nProvider>
            <Button color="danger" variant="flat" onClick={clearFilters}>
              Clear
            </Button>
            <Button color="primary" variant="flat" onClick={fillSearchParams}>
              Search
            </Button>
          </div>
        </div>
      )}
    </PopoverContent>
  );

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen} showArrow offset={10} placement="bottom" backdrop="blur">
      <PopoverTrigger>
        <Button color="primary" variant="flat" className="capitalize">
          Filter
        </Button>
      </PopoverTrigger>
      {content}
    </Popover>
  );
}

export default FilterPopOver;
