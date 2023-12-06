import PrivateProvider from '../../providers/PrivateProvider';
import Dashboard from '../../layouts/dashboard';
import { BookDetailContainer } from '../../containers/books';

export default function Detail() {
  return (
    <PrivateProvider>
      <Dashboard>
        <BookDetailContainer />
      </Dashboard>
    </PrivateProvider>
  );
}
