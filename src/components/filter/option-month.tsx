import { months_options } from "../../utils/period";

interface OptionMonthProps {
    onSelectMonth: (month: number) => void;
    selectedMonth: number;
}
export default function OptionMonth(props:OptionMonthProps) {
    const {onSelectMonth,selectedMonth} = props;
  return (
    <div
      className="
        flex
        gap-[20px]
        overflow-x-auto
        whitespace-nowrap
        scrollbar-hide
        max-w-full
      "
    >
      {months_options.map((month) => (
        <div
          key={month.id}
          className={`
            flex-shrink-0
            cursor-pointer
            font-medium
            text-[14px]
            ${selectedMonth === month.id ? "text-blue-500 border-b-2 border-blue-500 pb-1" : "text-gray-500"}
          `}
          onClick={()=>{
            onSelectMonth(month.id)
        }}
        >
          {month.alias}
        </div>
      ))}
    </div>
  );
}
