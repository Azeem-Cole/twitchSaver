import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./Reducer";
import App from "./Views/App/App";
import SignUp from "./Views/Signup/SignUp";

const store = configureStore({
  reducer: { rootReducer: rootReducer },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const token = localStorage.getItem("token");

root.render(<Provider store={store}>{token ? <App /> : <SignUp />}</Provider>);

export type RootState = ReturnType<typeof store.getState>;
