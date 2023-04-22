import { BrowserRouter, Routes, Route } from "react-router-dom";

import Contacts from "./screens/Contacts";
import Layout from "./components/Layout";
import New from "./screens/New";
import Edit from "./screens/Edit";

// TODO : /charts_and_maps - charts and maps feature

function Test(): JSX.Element {
  return <div>Charts and Maps</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Contacts />} />
          <Route path="new" element={<New />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="charts_and_maps" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
