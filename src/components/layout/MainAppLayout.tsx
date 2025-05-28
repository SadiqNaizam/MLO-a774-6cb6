import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string; // Optional className for the outermost <main> element
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <main
      className={cn(
        'flex justify-center items-center h-screen bg-background',
        className
      )}
    >
      <Card
        className={cn(
          'w-[400px] shadow-md'
          // bg-card, text-card-foreground, rounded-lg, border are defaults from Shadcn Card.
          // shadow-md overrides Card's default shadow-sm as per Layout Requirements.
          // The Layout Requirements for mainContent specify specific styles:
          // - bg-surface (maps to bg-card)
          // - rounded-lg (default for Card)
          // - shadow-md (specified here)
          // - w-[400px] (specified here)
          // The border from Card default is generally acceptable due to global styles.
        )}
      >
        <CardContent
          className={cn(
            'flex flex-col p-8'
            // Layout Requirements for mainContent specify:
            // - flex flex-col (for internal stacking of children)
            // - p-8 (for padding, overrides CardContent's default p-6)
          )}
        >
          {children}
        </CardContent>
      </Card>
    </main>
  );
};

export default MainAppLayout;
