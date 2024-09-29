import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import Home from "./Pages/Home.jsx";

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route index element={<Home />}/>
        {/* catch all 404 and redirect back to home */}
        <Route path="/*" element={<Home/>}/>
    </Route>
)) 
  return <RouterProvider router={router}/>
};

export default App;
