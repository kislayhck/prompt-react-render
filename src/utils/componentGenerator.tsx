
import React from 'react';

export interface GeneratedComponent {
  component: React.ReactNode;
  code: string;
}

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

export const generateComponent = (prompt: string): GeneratedComponent => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Check for table references
  if (
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
