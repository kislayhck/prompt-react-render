
import React from 'react';
import DynamicComponentRenderer from '../../components/DynamicComponentRenderer';
import { GeneratedComponent } from '../types';
import { ComponentItem } from '../../components/DynamicComponentRenderer';

export const generateDynamicComponent = (prompt: string): GeneratedComponent => {
  try {
    // For demonstration, we'll create a sample component structure
    const sampleComponents: ComponentItem[] = [
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
    ];

    // Create the component
    const component = <DynamicComponentRenderer components={sampleComponents} />;
    
    // Generate the code
    const code = `import React from 'react';
import DynamicComponentRenderer from './DynamicComponentRenderer';

// Your component data
const componentData = ${JSON.stringify({ components: sampleComponents }, null, 2)};

const DynamicDashboard = () => {
  return <DynamicComponentRenderer components={componentData.components} />;
};

export default DynamicDashboard;`;

    return { component, code };
  } catch (error) {
    console.error("Error generating dynamic component:", error);
    // Import here to avoid circular dependencies
    const { generateCardComponent } = require('./cardGenerator');
    return generateCardComponent(); // Fallback to card component
  }
};
