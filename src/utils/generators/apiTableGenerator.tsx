
import React, { useEffect, useState } from 'react';
import { GeneratedComponent } from '../types';
import { extractApiUrl, extractHeaders, useApiRequest } from '../services/apiService';

export const generateApiTableComponent = (prompt: string): GeneratedComponent => {
  // Extract API URL and headers from the prompt
  const apiUrl = extractApiUrl(prompt);
  const headers = extractHeaders(prompt);
  
  // Create a component that will fetch and display data
  const ApiDataTable = () => {
    const { data, isLoading, error } = useApiRequest({
      url: apiUrl
    });
    
    if (isLoading) {
      return <div className="flex justify-center items-center py-10">Loading data...</div>;
    }
    
    if (error) {
      return <div className="text-red-500 py-4">{error}</div>;
    }
    
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return <div className="py-4">No data available</div>;
    }
    
    const items = Array.isArray(data) ? data : [data];
    
    return (
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
            {items.map((item, rowIndex) => (
              <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {item[header.toLowerCase()] !== undefined ? 
                      (typeof item[header.toLowerCase()] === 'object' ? 
                        JSON.stringify(item[header.toLowerCase()]) : 
                        String(item[header.toLowerCase()])) : 
                      item[header] !== undefined ?
                        (typeof item[header] === 'object' ?
                          JSON.stringify(item[header]) :
                          String(item[header])) :
                        '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Component to render
  const component = <ApiDataTable />;

  // Generated code
  const code = `import React, { useEffect, useState } from 'react';

const ApiDataTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("${apiUrl}");
        if (!response.ok) {
          throw new Error(\`HTTP error! Status: \${response.status}\`);
        }
        const result = await response.json();
        setData(Array.isArray(result) ? result : [result]);
        setIsLoading(false);
      } catch (err) {
        setError(\`Failed to fetch data: \${err.message}\`);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (isLoading) {
    return <div className="flex justify-center items-center py-10">Loading data...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 py-4">{error}</div>;
  }
  
  if (!data.length) {
    return <div className="py-4">No data available</div>;
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-100">
          <tr>
            ${headers.map(header => `<th className="px-6 py-3">${header}</th>`).join('\n            ')}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
              ${headers.map(header => 
                `<td className="px-6 py-4">
                {item["${header.toLowerCase()}"] !== undefined ? 
                  (typeof item["${header.toLowerCase()}"] === 'object' ? 
                    JSON.stringify(item["${header.toLowerCase()}"]) : 
                    String(item["${header.toLowerCase()}"])) : 
                  item["${header}"] !== undefined ?
                    (typeof item["${header}"] === 'object' ?
                      JSON.stringify(item["${header}"]) :
                      String(item["${header}"])) :
                    '—'}
              </td>`).join('\n              ')}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiDataTable;`;

  return { component, code };
};
