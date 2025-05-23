
import { generateApiTableComponent } from './generators/apiTableGenerator';
import { generateTableComponent } from './generators/tableGenerator';
import { generateCardComponent } from './generators/cardGenerator';
import { generateDynamicComponent } from './generators/dynamicComponentGenerator';
import { generateApiSearchComponent } from './generators/apiSearchGenerator';
import { GeneratedComponent } from './types';
import { extractApiUrl } from './services/apiService';

export { type GeneratedComponent } from './types';

export const generateComponent = (prompt: string): GeneratedComponent => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Check for API search requests
  if (lowerPrompt.includes('search') && 
      (lowerPrompt.includes('api') || lowerPrompt.includes('json') || lowerPrompt.includes('http'))) {
    return generateApiSearchComponent(prompt);
  }
  
  // Check for regular API requests with URLs
  else if ((lowerPrompt.includes('api') || lowerPrompt.includes('http')) && 
           (extractApiUrl(prompt) !== 'https://jsonplaceholder.typicode.com/users' || 
           lowerPrompt.includes('jsonplaceholder'))) {
    return generateApiTableComponent(prompt);
  }
  
  // Check if the prompt might contain dynamic component data
  else if (lowerPrompt.includes('components') && 
      (lowerPrompt.includes('chart') || 
       lowerPrompt.includes('table') || 
       lowerPrompt.includes('card') || 
       lowerPrompt.includes('text'))) {
    return generateDynamicComponent(prompt);
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
  
  // Default to card component
  else {
    return generateCardComponent();
  }
};
