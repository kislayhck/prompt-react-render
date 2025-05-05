import React, { useState } from 'react';
import { GeneratedComponent } from '../types';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Search } from 'lucide-react';
import { extractApiUrl, useApiRequest, getChartFields } from '../services/apiService';

export const generateApiSearchComponent = (prompt: string): GeneratedComponent => {
  // Extract API URL from the prompt
  const apiUrl = extractApiUrl(prompt);
  
  const ApiSearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSearch, setActiveSearch] = useState('');
    
    // We only trigger the API call when the search button is clicked
    const { data, isLoading, error, responseType } = useApiRequest({
      url: apiUrl,
      searchTerm: activeSearch
    });
    
    const handleSearch = () => {
      setActiveSearch(searchTerm);
    };
    
    // Render chart component if data looks numerical
    const renderChart = () => {
      if (!data || !Array.isArray(data)) return null;
      
      const { keyField, valueField } = getChartFields(Array.isArray(data) ? data : [data]);
      if (!keyField || !valueField) return null;
      
      return (
        <Card className="w-full mt-6">
          <CardHeader>
            <CardTitle>Chart Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="aspect-[4/3]" config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={Array.isArray(data) ? data : [data]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={keyField} />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />} 
                  />
                  <Bar dataKey={valueField} fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      );
    };
    
    // Render table with dynamic headers based on data
    const renderTable = () => {
      if (!data || !Array.isArray(data) || data.length === 0) return null;
      
      const headers = Object.keys(data[0]).slice(0, 5); // Limit to first 5 fields
      
      return (
        <Card className="w-full mt-6">
          <CardHeader>
            <CardTitle>Results Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {headers.map((header, index) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, rowIndex) => (
                    <TableRow key={rowIndex} className="hover:bg-muted/50">
                      {headers.map((header, colIndex) => (
                        <TableCell key={colIndex}>
                          {typeof item[header] === 'object' 
                            ? JSON.stringify(item[header]) 
                            : String(item[header] || '')}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      );
    };
    
    // Render card for single item
    const renderCard = () => {
      if (!data || (Array.isArray(data) && data.length === 0)) return null;
      
      const item = Array.isArray(data) ? data[0] : data;
      const fields = Object.entries(item).slice(0, 5); // Limit to first 5 fields
      
      return (
        <Card className="w-full mt-6 max-w-md mx-auto">
          <CardHeader>
            <CardTitle>{item.name || item.title || 'Result Details'}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              {fields.map(([key, value], index) => (
                <div key={index} className="flex justify-between">
                  <dt className="font-medium">{key}:</dt>
                  <dd className="text-gray-500">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value || '')}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      );
    };
    
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">API Search Component</h1>
        
        <div className="flex gap-2">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter search term..."
            className="flex-1"
          />
          <Button 
            onClick={handleSearch} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
        
        {isLoading && (
          <div className="flex justify-center py-10">
            <div className="animate-pulse text-center">
              <p>Loading data...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-600">
            {error}
          </div>
        )}
        
        {!isLoading && !error && (!data || (Array.isArray(data) && data.length === 0)) && activeSearch && (
          <div className="text-center py-8 text-gray-500">
            No results found. Try a different search term.
          </div>
        )}
        
        {!isLoading && !error && data && responseType === 'chart' && renderChart()}
        {!isLoading && !error && data && responseType === 'table' && renderTable()}
        {!isLoading && !error && data && responseType === 'card' && renderCard()}
      </div>
    );
  };

  // Component to render
  const component = <ApiSearchComponent />;

  // Generate the code
  const code = `import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Search } from 'lucide-react';

const ApiSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseType, setResponseType] = useState(null);
  
  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Append search term as query parameter if provided
      const url = searchTerm 
        ? \`${apiUrl}\${${apiUrl}.includes('?') ? '&' : '?'}q=\${encodeURIComponent(searchTerm)}\` 
        : '${apiUrl}';
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      
      const result = await response.json();
      const resultArray = Array.isArray(result) ? result : [result];
      setData(result);
      
      // Determine the best way to display the data
      if (resultArray.length > 0) {
        if (resultArray.length >= 3 && Object.keys(resultArray[0]).some(key => 
          typeof resultArray[0][key] === 'number')) {
          setResponseType('chart');
        } else if (resultArray.length > 1) {
          setResponseType('table');
        } else {
          setResponseType('card');
        }
      }
      
      setIsLoading(false);
    } catch (err) {
      setError(\`Failed to fetch data: \${err.message}\`);
      setIsLoading(false);
    }
  };
  
  // Determine numerical fields for chart
  const getChartFields = () => {
    if (!data.length) return { keyField: '', valueField: '' };
    
    const firstItem = data[0];
    const keys = Object.keys(firstItem);
    
    const nonNumberField = keys.find(key => typeof firstItem[key] !== 'number');
    const numberField = keys.find(key => typeof firstItem[key] === 'number');
    
    return {
      keyField: nonNumberField || keys[0],
      valueField: numberField || keys[1],
    };
  };
  
  // Render functions for each component type
  const renderChart = () => {
    const { keyField, valueField } = getChartFields();
    if (!keyField || !valueField) return null;
    
    return (
      <Card className="w-full mt-6">
        <CardHeader>
          <CardTitle>Chart Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="aspect-[4/3]" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={keyField} />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent />} 
                />
                <Bar dataKey={valueField} fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  };
  
  // Table renderer
  const renderTable = () => {
    if (!data.length) return null;
    
    const headers = Object.keys(data[0]).slice(0, 5);
    
    return (
      <Card className="w-full mt-6">
        <CardHeader>
          <CardTitle>Results Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-muted/50">
                    {headers.map((header, colIndex) => (
                      <TableCell key={colIndex}>
                        {typeof item[header] === 'object' 
                          ? JSON.stringify(item[header]) 
                          : String(item[header] || '')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // Card renderer for single items
  const renderCard = () => {
    if (!data.length) return null;
    
    const item = data[0];
    const fields = Object.entries(item).slice(0, 5);
    
    return (
      <Card className="w-full mt-6 max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{item.name || item.title || 'Result Details'}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            {fields.map(([key, value], index) => (
              <div key={index} className="flex justify-between">
                <dt className="font-medium">{key}:</dt>
                <dd className="text-gray-500">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value || '')}
                </dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">API Search Component</h1>
      
      <div className="flex gap-2">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term..."
          className="flex-1"
        />
        <Button 
          onClick={handleSearch} 
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
      
      {isLoading && (
        <div className="flex justify-center py-10">
          <div className="animate-pulse text-center">
            <p>Loading data...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-600">
          {error}
        </div>
      )}
      
      {!isLoading && !error && data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No results found. Try a different search term.
        </div>
      )}
      
      {!isLoading && !error && data.length > 0 && responseType === 'chart' && renderChart()}
      {!isLoading && !error && data.length > 0 && responseType === 'table' && renderTable()}
      {!isLoading && !error && data.length > 0 && responseType === 'card' && renderCard()}
    </div>
  );
};

export default ApiSearchComponent;`;

  return { component, code };
};
