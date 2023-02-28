import { Outlet } from "react-router-dom";
import { App } from "../components/App";

export const RootPage = () => {
  return (
    <App>
      <Outlet />
    </App>
  );
};
