interface ISelectFilter {
  onFilter: (type:string) => void;
}

export default function SelectFilter(props: ISelectFilter) {
  const { onFilter } = props;
  return (
    <div>
      <select onChange={(e) => onFilter(e.target.value)} className="description-text-costom-style text-[#0C9AFF] border border-[#0C9AFF] rounded-[10px] p-1">
        <option value="hourly">Hourly</option>
        <option value="last7days">Last 7 days</option>
        <option value="last30days">Last 30 days</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
}
