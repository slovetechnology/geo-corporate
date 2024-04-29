import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FormsRoutes, UserRoutes } from "./routes";
import UserAuth from "./layouts/UserAuth";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      {FormsRoutes.map((item, index) => (
        <Route path={item.path} element={<item.element />} key={index} />
      ))}
      {UserRoutes.map((item, index) => (
        <Route path={item.path} element={<UserAuth> <item.element /> </UserAuth>} key={index} />
      ))}
    </Routes>
    </BrowserRouter>
  )
}

