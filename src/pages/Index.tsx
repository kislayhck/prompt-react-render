
import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../components/ui/resizable";
import ChatPanel from "../components/ChatPanel";
import ComponentPreview from "../components/ComponentPreview";
import { generateComponent, GeneratedComponent } from "../utils/componentGenerator";

const Index = () => {
  const [currentComponent, setCurrentComponent] = useState<GeneratedComponent>({
    component: (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Your generated component will appear here</p>
      </div>
    ),
    code: '// Your component code will appear here\n// Try a prompt like "Create a table with name, email, and phone number"',
  });

  const handlePrompt = (prompt: string) => {
    try {
      const generated = generateComponent(prompt);
      setCurrentComponent(generated);
    } catch (error) {
      console.error("Error generating component:", error);
      
      setCurrentComponent({
        component: (
          <div className="flex items-center justify-center h-full text-red-500">
            <p>Error generating component. Please try again.</p>
          </div>
        ),
        code: '// Error generating component\n// Please try another prompt',
      });
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 bg-purple-700 text-white shadow-md">
        <h1 className="text-2xl font-bold">React Component Generator</h1>
      </header>
      
      <ResizablePanelGroup direction="horizontal" className="flex-1 h-[calc(100vh-4rem)]">
        <ResizablePanel defaultSize={30} minSize={20}>
          <ChatPanel onSendPrompt={handlePrompt} />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={70}>
          <ComponentPreview component={currentComponent.component} code={currentComponent.code} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
