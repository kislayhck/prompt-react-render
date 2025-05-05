
import { generateApiTableComponent } from './generators/apiTableGenerator';
import { generateTableComponent } from './generators/tableGenerator';
import { generateFormComponent } from './generators/formGenerator';
import { generateCardComponent } from './generators/cardGenerator';
import { generateDynamicComponent } from './generators/dynamicComponentGenerator';
import { GeneratedComponent } from './types';

export { type GeneratedComponent } from './types';

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
