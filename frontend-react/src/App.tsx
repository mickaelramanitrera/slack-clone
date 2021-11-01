// routes
import Router from './routes';
import Providers from './providers';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}
