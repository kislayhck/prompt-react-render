
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";

// Define TypeScript interfaces for the component types
export interface TextProps {
  variant: 'heading' | 'subheading' | 'paragraph';
  content: string;
  align?: 'left' | 'center' | 'right';
}

export interface ChartProps {
  chartType: 'bar' | 'line' | 'pie';
  title: string;
  data: Array<Record<string, any>>;
  xKey: string;
  yKey: string;
}

export interface TableProps {
  headers: string[];
  rows: any[][];
  striped?: boolean;
  hoverable?: boolean;
}

export interface CardProps {
  title: string;
  subtitle?: string;
  image?: string;
  content: string;
}

export interface ComponentItem {
  type: 'text' | 'chart' | 'table' | 'card';
  props: TextProps | ChartProps | TableProps | CardProps;
}

export interface DynamicComponentsProps {
  components: ComponentItem[];
}

// Text Component
const TextComponent: React.FC<{ props: TextProps }> = ({ props }) => {
  const { variant, content, align = 'left' } = props;
  const textAlign = align || 'left';

  switch (variant) {
    case 'heading':
      return <h1 className={`text-3xl font-bold mb-4 text-${textAlign}`}>{content}</h1>;
    case 'subheading':
      return <h2 className={`text-xl font-semibold mb-3 text-${textAlign}`}>{content}</h2>;
    case 'paragraph':
      return <p className={`text-base mb-2 text-${textAlign}`}>{content}</p>;
    default:
      return <p className={`text-${textAlign}`}>{content}</p>;
  }
};

// Chart Component
const ChartComponent: React.FC<{ props: ChartProps }> = ({ props }) => {
  const { chartType, title, data, xKey, yKey } = props;

  return (
    <div className="w-full h-80 mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={yKey} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Table Component
const TableComponent: React.FC<{ props: TableProps }> = ({ props }) => {
  const { headers, rows, striped = false, hoverable = false } = props;
  
  return (
    <div className="w-full mb-6 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow 
              key={rowIndex} 
              className={`
                ${striped && rowIndex % 2 === 1 ? 'bg-muted/50' : ''}
                ${hoverable ? 'hover:bg-muted' : ''}
              `}
            >
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Card Component
const CardComponent: React.FC<{ props: CardProps }> = ({ props }) => {
  const { title, subtitle, image, content } = props;

  return (
    <Card className="mb-6 max-w-md mx-auto">
      {image && (
        <div className="w-full">
          <img src={image} alt={title} className="w-full h-auto object-cover" />
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
};

// Main component that renders components based on the JSON structure
const DynamicComponentRenderer: React.FC<DynamicComponentsProps> = ({ components }) => {
  return (
    <div className="space-y-6 p-4">
      {components.map((component, index) => {
        switch (component.type) {
          case 'text':
            return <TextComponent key={index} props={component.props as TextProps} />;
          case 'chart':
            return <ChartComponent key={index} props={component.props as ChartProps} />;
          case 'table':
            return <TableComponent key={index} props={component.props as TableProps} />;
          case 'card':
            return <CardComponent key={index} props={component.props as CardProps} />;
          default:
            return <div key={index}>Unknown component type</div>;
        }
      })}
    </div>
  );
};

export default DynamicComponentRenderer;
