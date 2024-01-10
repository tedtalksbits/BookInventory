import { AppLayout } from '@/components/layout/AppLayout';
import { Index } from '@/features/book-management/pages/Index';
import { Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<Index />} />
      </Route>
    </Routes>
  );
};
