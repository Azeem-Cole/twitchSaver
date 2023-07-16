import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./Reducers";
import App from "./App";
import SignUp from "./SignUp";

const store = configureStore({
  reducer: { rootReducer: rootReducer },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const token = localStorage.getItem("token");

root.render(<Provider store={store}>{token ? <App /> : <SignUp />}</Provider>);

export type RootState = ReturnType<typeof store.getState>;
