
import Body from "./Components/Body";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return <div>
    <Provider store={store}>
      <Body/>
    </Provider>
    
  </div>;
};

export default App;
