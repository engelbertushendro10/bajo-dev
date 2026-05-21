'use client';

import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@/lib/UserContext';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <UserProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: { background: '#1e293b', color: '#f8fafc', borderRadius: '10px' },
            }}
          />
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}