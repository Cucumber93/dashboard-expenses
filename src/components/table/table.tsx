

interface Column<T> {
  key: keyof T;
  label: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

/**
 * Generic, reusable table component
 */
function Table<T extends Record<string, any>>({ columns, data }: TableProps<T>) {
  console.log('table data: ',data)
  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full">
        <thead className="bg-[#0C9AFF] text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="text-left px-4 py-2 text-sm font-semibold"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-all duration-200"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="px-4 py-2 text-sm text-gray-700"
                  >
                    {String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
