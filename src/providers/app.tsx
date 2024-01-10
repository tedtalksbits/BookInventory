import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { HomeIcon, LoopIcon } from '@radix-ui/react-icons';
import brokenRobotImg from '@/assets/images/robot-broken.png';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter as Router } from 'react-router-dom';
type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
};

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
  return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='animate-spin' />
    </div>
  );
};

export type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingScreen />}>
        <Router>{children}</Router>
      </Suspense>
      <Toaster richColors closeButton />
    </ErrorBoundary>
  );
};
