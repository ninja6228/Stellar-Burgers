import { Provider } from 'react-redux';
import { createRoot } from "react-dom/client";
import App from './components/app/app';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import store from './services/store'
import { HashRouter as Router } from 'react-router-dom';

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </DndProvider>
  </>
);

