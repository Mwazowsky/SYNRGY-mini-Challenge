import PrivateProvider from '../../providers/PrivateProvider';
import Dashboard from '../../layouts/dashboard';
import { BookListContainer } from '../../containers/cars';

export default function List() {
  return (
    <PrivateProvider>
      <Dashboard>
        <BookListContainer />
      </Dashboard>
    </PrivateProvider>
  );
}
