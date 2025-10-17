'use client';
import { QueryClient, QueryClientProvider, setLogger } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';

const noop = () => {};

const createQueryClient = () =>
  new QueryClient({
    logger:
      process.env.NODE_ENV === 'production'
        ? { log: noop, warn: noop, error: noop }
        : console,
  });

export default function TanStackProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      setLogger({ log: noop, warn: noop, error: noop });
    }
  }, []);

  const [client] = useState(createQueryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
