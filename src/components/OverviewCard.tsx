import { Icon } from "@iconify/react";

export function OverviewCard() {
  const overviewData = [
    {
      id: "income",
      title: "Income",
      value: 50000,
      icon: <Icon icon="mingcute:currency-baht-2-line" width="24" height="24" className="text-[#0C9AFF]" />,
      unit: 'Baht'
    },
    {
      id: "income",
      title: "Income",
      value: 50000,
      icon: <Icon icon="mingcute:currency-baht-2-line" width="24" height="24" className="text-[#0C9AFF]" />,
      unit: 'Baht'
    },
    {
      id: "income",
      title: "Income",
      value: 50000,
      icon: <Icon icon="mingcute:currency-baht-2-line" width="24" height="24" className="text-[#0C9AFF]"/>,
      unit: 'Baht'
    },
  ];

  function FormatNumber(value: number) {
    if(value === null || value === undefined) return '-';
    return Number(value).toLocaleString('en-US');
  }
  return (
    <div className="grid grid-cols-3 gap-5 ml-10 mr-10 mt-5">
      {overviewData.map((items, id) => (
        <div key={id} className="bg-[#F2FAFF] rounded-[10px] p-2 pl-5 pr-5">
          <div className="flex justify-between">
            <div className="description-text--costom-style text-[#A7A7A7]">{items.title}</div>
            <div>{items.icon}</div>
          </div>
          <div className="flex gap-2 items-end">
            <div className="text-[32px] font-medium">{FormatNumber(items.value)}</div>
            <div className="pb-2 text-[#A7A7A7] description-text--costom-style">{items.unit}</div>
          </div>
          
        </div>
      ))}
    </div>
  );
}
