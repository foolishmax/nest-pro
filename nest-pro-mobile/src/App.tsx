import { useQuery } from '@apollo/client';
import { FIND } from './graphql/demo';

function App() {
  const { loading, data } = useQuery(FIND, {
    variables: {
      id: 21,
    },
  });

  return (
    <div>
      <p>loading: {`${loading}`}</p>
      <p>data: {JSON.stringify(data)}</p>
    </div>
  );
}

export default App;
