import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Company from "../pages/Api_Task/App";
import CreateMessage from "../pages/CreateMessage";
import ViewMessages from "../pages/ViewMessages";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

        
          <Route
            path="/"
            element={<Home />}
          />

          {/* <Route
            path="/message-board"
            element={<MessageBoard />}
          /> */}

          <Route path="/messages" element={<ViewMessages />} />
          <Route path="/messages/create" element={<CreateMessage />} />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/company"
            element={<Company />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;