import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc"; // Import plugin for UTC handling

dayjs.extend(utc); // Enable UTC handling
dayjs.extend(timezone);

type DateType = string | number | Date | Dayjs | null | undefined;

export const dateFormatter = (
  date: DateType,
  formatte: string
): string | null => {
  try {
    if (!date) {
      return null;
    }
    // Parse the incoming date as UTC
    const parsedDate = dayjs.utc(date).tz("Asia/Kolkata");

    // Format the date
    const formattedDate = parsedDate.format(formatte || "DD-MM-YYYY");

    return formattedDate;
  } catch (error) {
    console.log(error);

    return null;
  }
};
