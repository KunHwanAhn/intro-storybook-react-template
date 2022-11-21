import { Provider as StoreProvider } from 'react-redux';

import store from './lib/store.js';

import InboxScreen from './components/InboxScreen.jsx';

function App() {
  return (
    <StoreProvider store={store}>
      <InboxScreen />
    </StoreProvider>
  );
}

export default App;
