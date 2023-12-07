'use client'

import {ThemeProvider} from 'next-themes';
import {ReactNode} from 'react';

import {Toaster} from "@/components/ui/toaster";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: { onError: (err) => console.error(err) },
    queries: { throwOnError: false },
  },
});

export const Providers = ({ children }: { children: ReactNode }) => {
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