import { useEffect, useState } from "react";

interface ISelectFilter {
  typeDefault: string;
  onFilter: (type:string) => void;
  options: { value: string; label: string }[];
}

export default function SelectFilter(props: ISelectFilter) {
  const [selected, setSelected,] = useState<string>("hourly");
  const { onFilter,typeDefault,options } = props;

  const handleChange = (type:string) => {
    setSelected(type);
    onFilter(type);
  }
  
  useEffect(()=>{
    setSelected(typeDefault || "hourly");
  },[typeDefault])
  
  return (
    <div>
      <select value={selected} onChange={(e) => handleChange(e.target.value)} className="description-text-costom-style text-[#0C9AFF] border border-[#0C9AFF] rounded-[10px] p-1">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
