import { Provider } from 'react-redux';
import { store } from '../src/store';
import { ProductsPage } from '../src/pages/productsPage';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <ProductsPage />
      </div>
    </Provider>
  );
}

export default App;
