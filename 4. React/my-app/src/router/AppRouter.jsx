import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import CompaniesPage from "../pages/Companies/CompaniesPage";

import Contact from "../pages/Contact/Contact";
import Company from "../pages/Companies/CompaniesPage";
import CreateMessage from "../pages/Messages/CreateMessage";
import ViewMessages from "../pages/Messages/ViewMessages";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          {/* <Route
            path="/message-board"
            element={<MessageBoard />}
          /> */}

          <Route path="/messages" element={<ViewMessages />} />
          <Route path="/messages/create" element={
            <ProtectedRoute>
              <CreateMessage />
            </ProtectedRoute>
          } />

          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* <Route
            path="/company/zustand"
            element={<Company />}
          /> */}

           <Route path="/company" element={<CompaniesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;