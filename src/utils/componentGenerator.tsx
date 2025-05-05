import React, { useEffect, useState } from 'react';
import DynamicComponentRenderer from '../components/DynamicComponentRenderer';

export interface GeneratedComponent {
  component: React.ReactNode;
  code: string;
}

const generateApiTableComponent = (prompt: string): GeneratedComponent => {
  // Extract API URL from the prompt
  const apiUrlMatch = prompt.match(/api\s+(https?:\/\/[^\s]+)/i);
  const apiUrl = apiUrlMatch ? apiUrlMatch[1] : '';
  
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
    headers = ["id", "name", "email"];
  }
  
  // Create a component that will fetch and display data
  const ApiDataTable = () => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          setData(Array.isArray(result) ? result : [result]);
          setIsLoading(false);
        } catch (err) {
          setError(`Failed to fetch data: ${err instanceof Error ? err.message : String(err)}`);
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
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-3">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
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

const generateTableComponent = (prompt: string): GeneratedComponent => {
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

const generateFormComponent = (): GeneratedComponent => {
  const component = (
    <form className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium">Full Name</label>
        <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter your name" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Email Address</label>
        <input type="email" className="w-full p-2 border rounded-md" placeholder="Enter your email" />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Message</label>
        <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="Enter your message"></textarea>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Submit
      </button>
    </form>
  );

  const code = `import React from 'react';

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2 text-sm font-medium">Full Name</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded-md" 
          placeholder="Enter your name" 
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Email Address</label>
        <input 
          type="email" 
          className="w-full p-2 border rounded-md" 
          placeholder="Enter your email" 
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Message</label>
        <textarea 
          className="w-full p-2 border rounded-md" 
          rows={3} 
          placeholder="Enter your message"
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;`;

  return { component, code };
};

const generateCardComponent = (): GeneratedComponent => {
  const component = (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="h-48 bg-gray-200"></div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Card Title</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #tag1
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #tag2
        </span>
      </div>
    </div>
  );

  const code = `import React from 'react';

const ProductCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="h-48 bg-gray-200">
        {/* Image could be added here */}
        {/* <img src="product-image.jpg" alt="Product" /> */}
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Card Title</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #tag1
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #tag2
        </span>
      </div>
    </div>
  );
};

export default ProductCard;`;

  return { component, code };
};

const generateDynamicComponent = (prompt: string): GeneratedComponent => {
  // Parse the prompt as JSON if it contains a components array
  try {
    // For demonstration, we'll create a sample component structure
    const sampleComponents = {
      components: [
        {
          type: "text",
          props: {
            variant: "heading",
            content: "📊 Monthly Sales Dashboard",
            align: "center"
          }
        },
        {
          type: "chart",
          props: {
            chartType: "bar",
            title: "Sales by Month",
            data: [
              { month: "January", sales: 5000 },
              { month: "February", sales: 7500 },
              { month: "March", sales: 6200 }
            ],
            xKey: "month",
            yKey: "sales"
          }
        },
        {
          type: "table",
          props: {
            headers: ["Name", "Email"],
            rows: [
              ["Alice Smith", "alice@example.com"],
              ["Bob Johnson", "bob@example.com"]
            ],
            striped: true,
            hoverable: true
          }
        },
        {
          type: "card",
          props: {
            title: "John Doe",
            subtitle: "Manager",
            image: "https://via.placeholder.com/150",
            content: "john.doe@example.com"
          }
        }
      ]
    };

    // Create the component
    const component = <DynamicComponentRenderer components={sampleComponents.components} />;
    
    // Generate the code
    const code = `import React from 'react';
import DynamicComponentRenderer from './DynamicComponentRenderer';

// Your component data
const componentData = ${JSON.stringify(sampleComponents, null, 2)};

const DynamicDashboard = () => {
  return <DynamicComponentRenderer components={componentData.components} />;
};

export default DynamicDashboard;`;

    return { component, code };
  } catch (error) {
    console.error("Error generating dynamic component:", error);
    return generateCardComponent(); // Fallback to card component
  }
};

export const generateComponent = (prompt: string): GeneratedComponent => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Check if the prompt might contain component data
  if (lowerPrompt.includes('components') && 
      (lowerPrompt.includes('chart') || 
       lowerPrompt.includes('table') || 
       lowerPrompt.includes('card') || 
       lowerPrompt.includes('text'))) {
    return generateDynamicComponent(prompt);
  }
  
  // Check for API references
  else if (lowerPrompt.includes('api') && lowerPrompt.includes('http')) {
    return generateApiTableComponent(prompt);
  }
  
  // Check for table references
  else if (
    lowerPrompt.includes('table') || 
    lowerPrompt.includes('grid') || 
    lowerPrompt.includes('data') ||
    lowerPrompt.includes('header')
  ) {
    return generateTableComponent(prompt);
  }
  
  // Check for form references
  else if (
    lowerPrompt.includes('form') || 
    lowerPrompt.includes('input') || 
    lowerPrompt.includes('submit')
  ) {
    return generateFormComponent();
  }
  
  // Default to card component
  else {
    return generateCardComponent();
  }
};
