import { BookPlusIcon } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <main className='main-content wrapper'>
      <nav className='navigation flex items-center justify-between shadow-md p-4 full-bleed border-b'>
        <NavLink to='/' className='navigation__logo flex items-center gap-1'>
          <BookPlusIcon className='w-8 h-8 text-primary' />
          <span className='navigation__logo-text text-2xl'>BIM</span>
        </NavLink>
        <div className='navigation__menu'></div>
      </nav>
      <Outlet />
    </main>
  );
};
