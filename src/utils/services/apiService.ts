
import { useState, useEffect } from 'react';

export interface ApiRequestOptions {
  url: string;
  searchTerm?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

export interface ApiResponse<T = any> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  responseType?: 'table' | 'chart' | 'card' | null;
}

export const determineResponseType = (data: any[]): 'table' | 'chart' | 'card' => {
  if (data.length === 0) return 'card';
  
  if (data.length >= 3 && Object.keys(data[0]).some(key => 
    typeof data[0][key] === 'number')) {
    return 'chart';
  } else if (data.length > 1) {
    return 'table';
  } else {
    return 'card';
  }
};

export const useApiRequest = <T = any>(options: ApiRequestOptions): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [responseType, setResponseType] = useState<'table' | 'chart' | 'card' | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Handle search term in URL if provided
        let url = options.url;
        if (options.searchTerm) {
          url += url.includes('?') ? '&' : '?';
          url += `q=${encodeURIComponent(options.searchTerm)}`;
        }
        
        const response = await fetch(url, {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          body: options.method !== 'GET' && options.body ? 
            JSON.stringify(options.body) : undefined,
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        const resultArray = Array.isArray(result) ? result : [result];
        
        setData(result as T);
        setResponseType(determineResponseType(resultArray));
        setIsLoading(false);
      } catch (err) {
        setError(`Failed to fetch data: ${err instanceof Error ? err.message : String(err)}`);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [options.url, options.searchTerm, options.method, options.body]);
  
  return { data, isLoading, error, responseType };
};

// Function to extract API URL from a prompt
export const extractApiUrl = (prompt: string): string => {
  const apiUrlMatch = prompt.match(/api\s+(https?:\/\/[^\s]+)/i);
  return apiUrlMatch ? apiUrlMatch[1] : 'https://jsonplaceholder.typicode.com/users';
};

// Function to extract headers from a prompt
export const extractHeaders = (prompt: string): string[] => {
  const headerMatch = prompt.match(/header(?:s)? (?:names?|with names?)?(?::-|:)?\s*([^.]+)/i);
  
  if (headerMatch && headerMatch[1]) {
    return headerMatch[1]
      .split(/,|and/)
      .map(header => header.trim())
      .filter(header => header.length > 0);
  }
  
  // Default headers if not specified
  return ["id", "name", "email"];
};

// Helper function to get chart fields from data
export const getChartFields = (data: any[]): { keyField: string; valueField: string } => {
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

