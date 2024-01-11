import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import React from 'react';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('flex items-center justify-center', className)}
        ref={ref}
        {...props}
      >
        <Loader className='animate-spin' />
      </div>
    );
  }
);

export default Loading;
