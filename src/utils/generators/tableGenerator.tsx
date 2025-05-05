
import React from 'react';
import { GeneratedComponent } from '../types';

export const generateTableComponent = (prompt: string): GeneratedComponent => {
  // Extract information from the prompt
  const headerMatch = prompt.match(/header(?:s)? (?:names?|with names?)?(?::-|:)?\s*([^.]+)/i);
  let headers: string[] = [];
  
  if (headerMatch && headerMatch[1]) {
    headers = headerMatch[1]
      .split(/,|and/)
      .map(header => header.trim())
      .filter(header => header.length > 0);
  } else {
    // Default headers if not specified
    headers = ["Name", "Email", "Phone Number"];
  }

  // Generate sample data based on headers
  const sampleData = Array(5).fill(null).map((_, index) => {
    const rowData: Record<string, string> = {};
    headers.forEach(header => {
      const lowerHeader = header.toLowerCase();
      if (lowerHeader.includes('name')) {
        rowData[header] = `User ${index + 1}`;
      } else if (lowerHeader.includes('email')) {
        rowData[header] = `user${index + 1}@example.com`;
      } else if (lowerHeader.includes('phone')) {
        rowData[header] = `(555) 123-${1000 + index}`;
      } else if (lowerHeader.includes('date')) {
        rowData[header] = new Date().toLocaleDateString();
      } else {
        rowData[header] = `Sample ${header} ${index + 1}`;
      }
    });
    return rowData;
  });

  // Generate the component
  const component = (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sampleData.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="px-6 py-4">{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Generate the code
  const headerCode = headers.map(h => `        <th className="px-6 py-3">${h}</th>`).join('\n');
  const rowsCode = sampleData.map((row, rowIndex) => {
    const cellsCode = headers.map(header => `          <td className="px-6 py-4">${row[header]}</td>`).join('\n');
    return `        <tr key={${rowIndex}} className="bg-white border-b hover:bg-gray-50">\n${cellsCode}\n        </tr>`;
  }).join('\n');

  const code = `import React from 'react';

const DataTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-100">
          <tr>
${headerCode}
          </tr>
        </thead>
        <tbody>
${rowsCode}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;`;

  return { component, code };
};
