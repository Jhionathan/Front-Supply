'use client'
import Header from "./components/Header";
import ProtectedRoute from "./components/wapper";

export default function Home() {

  


  return (
    <ProtectedRoute>
      <div className="">
        <Header />
      </div>
    </ProtectedRoute>
  );
}