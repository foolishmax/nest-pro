import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { client } from './apollo';
import './index.css';
import { ROUTE_COMPONENTS, routes } from './router/index.tsx';
import { Login } from './view/index.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/">
          {routes.map((route) => (
            <Route
              path={route.path}
              key={route.key}
              element={ROUTE_COMPONENTS[route.key]()}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
