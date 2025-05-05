
import React from 'react';
import { GeneratedComponent } from '../types';

export const generateFormComponent = (): GeneratedComponent => {
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
