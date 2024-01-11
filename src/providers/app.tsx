import { Button } from '@/components/ui/button';
import { HomeIcon, LoopIcon } from '@radix-ui/react-icons';
import brokenRobotImg from '@/assets/images/robot-broken.png';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from '@/components/ui/loading';
type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div className='flex flex-col items-center justify-center h-full space-y-4'>
      <div className='text-3xl font-bold leading-loose'>Error</div>
      <img src={brokenRobotImg} />
      <div className='text-lg font-medium'>
        {import.meta.env.DEV ? error.message : 'Oops! Something went wrong.'}
      </div>
      <div className='flex gap-4'>
        <Button variant='secondary' onClick={resetErrorBoundary}>
          <LoopIcon className='h-4 w-4 mr-2' /> Try again
        </Button>
        <Button
          onClick={() => {
            window.location.assign('/');
          }}
        >
          <HomeIcon className='h-4 w-4 mr-2' /> Go home
        </Button>
      </div>
    </div>
  );
};

const LoadingScreen = () => {
  return <Loading className=' h-screen' />;
};

export type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingScreen />}>
        <QueryClientProvider client={queryClient}>
          <Router>{children}</Router>
        </QueryClientProvider>
      </Suspense>
      <Toaster richColors closeButton />
    </ErrorBoundary>
  );
};
