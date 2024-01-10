import { AppProvider } from './providers/app';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
