
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface ComponentPreviewProps {
  component: React.ReactNode;
  code: string;
}

const ComponentPreview = ({ component, code }: ComponentPreviewProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Component Preview</h2>
      </div>
      <Tabs defaultValue="preview" className="flex-1">
        <div className="border-b px-4">
          <TabsList className="mt-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="flex-1 p-4 overflow-auto">
          <Card className="p-6 min-h-[200px]">
            {component}
          </Card>
        </TabsContent>
        <TabsContent value="code" className="flex-1 overflow-auto">
          <SyntaxHighlighter 
            language="jsx" 
            style={dracula}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              minHeight: '200px'
            }}
            showLineNumbers={true}
            wrapLines={true}
          >
            {code}
          </SyntaxHighlighter>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComponentPreview;
