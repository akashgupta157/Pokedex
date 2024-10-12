import React from "react";

export default function PokedexTable({ entries }) {
  console.log(entries);
  return (
    <table>
      <thead>
        <tr className="text-left text-lg md:text-xl border-collapse">
          <th className="px-1">Version</th>
          <th className="px-1">Pokédex entry</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, i) => (
          <tr key={i} className="border-b border-collapse hover:bg-gray-100">
            <td className="capitalize font-bold px-1">{entry.version}</td>
            <td className="py-3 px-1 text-justify">{entry.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
