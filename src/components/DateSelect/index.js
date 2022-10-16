import Icon from "../Icon";
import { ptBR } from "date-fns/locale";
import { addDays, subDays, format } from "date-fns";

function DateSelect({ currentDate, onChange }) {
  const date = new Date(currentDate);

  const prevDay = () => {
    const prevDate = subDays(date, 1);
    onChange(prevDate);
  };

  const nextDay = () => {
    const nextDate = addDays(date, 1);
    onChange(nextDate);
  };

  return (
    <div className="flex items-center justify-center space-x-6 p-4">
      <Icon className="w-6 text-red-500" name="arrowLeft" onClick={prevDay} />
      <span className="font-bold lowercase">
        {format(date, "d 'de' MMMM", { locale: ptBR })}
      </span>
      <Icon className="w-6 text-red-500" name="arrowRight" onClick={nextDay} />
    </div>
  );
}

export default DateSelect;
