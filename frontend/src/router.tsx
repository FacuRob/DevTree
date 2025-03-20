import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayouts from "./layouts/AuthLayouts";
import AppLayout from "./layouts/AppLayout";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayouts />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>

        <Route path="/admin" element={<AppLayout />}>
          {" "}
          //Ruta padre
          <Route index={true} element={<LinkTreeView />} />
          <Route path="profile" element={<ProfileView />} /> //Ruta Hijo -
          /admin/profile
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
