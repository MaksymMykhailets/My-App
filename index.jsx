import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../My-App/redux/store";
import AppContent from "./screens/App";
import { PostsProvider } from "./screens/PostsContext";

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PostsProvider>
        <AppContent />
      </PostsProvider>
    </PersistGate>
  </Provider>
);

registerRootComponent(Root);
