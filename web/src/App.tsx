import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ListPosts} from "./Pages/list-posts";
import {ViewPost} from "./Pages/viewPost";
import {NavBar} from "./components/nav-bar";

export const App = ()=> {
  return (
      <>
          <NavBar />
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<ListPosts />} />
                  <Route path='/post/:id' element={<ViewPost />} />
              </Routes>
          </BrowserRouter>
      </>

  );
};
