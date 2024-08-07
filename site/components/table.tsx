import { ReactElement } from "react";

interface TableProps {
  headers: string[];
  rows: string[][];
}

export const Table = ({ headers, rows }: TableProps): JSX.Element => (
  <div className="my-6 w-full overflow-y-auto">
    <table className="w-full">
      <thead>
        <tr className="m-0 border-t p-0 even:bg-muted">
          {headers.map((header) => (
            <th
              key={`header-${header}`}
              className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr
            key={`row-${rowIndex}`}
            className="m-0 border-t p-0 even:bg-muted"
          >
            {row.map((cell, cellIndex) => (
              <td
                key={`${headers[rowIndex]}-${cellIndex}`}
                className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
