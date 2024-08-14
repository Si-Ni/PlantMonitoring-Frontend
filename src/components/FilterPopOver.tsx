import { getLocalTimeZone, now, parseAbsoluteToLocal } from "@internationalized/date";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Select,
  SelectItem,
  DatePicker,
  DateValue
} from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { useState } from "react";

function FilterPopOver(props: { plantNames: string[] }) {
  const [dateFrom, setDateFrom] = useState<DateValue | null>(null);
  const [dateTo, setDateTo] = useState<DateValue | null>(null);

  const clearFilters = () => {
    setDateFrom(null);
    setDateTo(null);
  };

  const content = (
    <PopoverContent className="w-[240px] bg">
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <p className="text-small font-bold text-foreground" {...titleProps}>
            Filters
          </p>
          <div className="mt-2 flex flex-col gap-2 w-full">
            <Select
              isRequired
              label="Plant name"
              placeholder="Select a plant"
              defaultSelectedKeys={props.plantNames.length > 0 ? ["0"] : undefined}
              className="max-w-xs"
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
            <Button color="primary" variant="flat">
              Search
            </Button>
          </div>
        </div>
      )}
    </PopoverContent>
  );

  return (
    <Popover showArrow offset={10} placement="bottom" backdrop="blur">
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
