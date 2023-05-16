import logo from './logo.svg';
import './App.css';
import Order from './Components/Order';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Order />} />
      </Routes></>
  );
}

export default App;
