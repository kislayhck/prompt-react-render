
import React from 'react';
import { GeneratedComponent } from '../types';

export const generateCardComponent = (): GeneratedComponent => {
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
