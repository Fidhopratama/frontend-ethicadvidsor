export default function Table({ columns, data }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left border-b">
          {columns.map((col, i) => (
            <th key={i} className="p-3 text-gray-600">
              {col}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b hover:bg-gray-50">
            {Object.values(row).map((val, j) => (
              <td key={j} className="p-3">
                {val}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}