import { useEffect, useState } from "react";

interface ISelectFilter {
  typeDefault: string;
  onFilter: (type:string) => void;
}

export default function SelectFilter(props: ISelectFilter) {
  const [selected, setSelected] = useState<string>("hourly");
  const { onFilter,typeDefault } = props;

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
        <option value="hourly">Hourly</option>
        <option value="last7days">Last 7 days</option>
        <option value="last30days">Last 30 days</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
}
