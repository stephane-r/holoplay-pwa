import { Outlet } from "react-router-dom";
import { App } from "../components/App";

export const DashboardPage = () => {
  return (
    <App>
      <Outlet />
    </App>
  );
};
