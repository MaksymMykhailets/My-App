import { registerRootComponent } from "expo";
import App from "./screens/App";
import { PostsProvider } from "./screens/PostsContext"; 

const Root = () => (
  <PostsProvider>
    <App />
  </PostsProvider>
);

registerRootComponent(Root);
