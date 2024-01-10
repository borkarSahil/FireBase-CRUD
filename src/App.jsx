import { useState } from "react";

import Movies from "./components/movies";
import Auth from "./components/auth";

function App() {
  return (
    <>
      <div>
        Auth
        <Auth />
        <div>
          <Movies />
        </div>
      </div>
    </>
  );
}

export default App;
