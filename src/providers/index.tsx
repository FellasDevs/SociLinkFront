'use client'

import {ThemeProvider} from 'next-themes';
import {ReactNode} from 'react';

import {Toaster} from "@/components/ui/toaster";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export const Providers = ({ children }: { children: ReactNode }) => {
const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}