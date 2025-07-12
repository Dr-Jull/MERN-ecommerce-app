import React, { useEffect, useState } from "react";
import CreateStore from "../components/Forms/CreateStore";
import { useNavigate } from "react-router-dom";
import { useCommerceStore } from "../store";
import MyStore from "../components/Store/MyStore";
import ProductCard from "../components/Products/ProductCard";

function CreateStorePage() {
  const navigate = useNavigate();

  const { token, storeId } = useCommerceStore();

  const[storeName, setStoreName] = useState('')
  const[storeLogo, setStoreLogo] = useState()

  useEffect(() => {
    if (!token) {
      return navigate("/auth/login");
    }
  }, []);
  return (
    (!storeId && (
      <div className="flex items-center flex-wrap justify-center">
        <div className="auth w-1/2 min-w-[400px]">
          <CreateStore setStoreName={setStoreName} setStoreLogo={setStoreLogo} />
        </div>
        <div className="graphic w-1/2 p-4 min-w-[400px]">
          <ProductCard product={{store:storeName}} />
        </div>
      </div>
    )) || <MyStore />
  );
}

export default CreateStorePage;
