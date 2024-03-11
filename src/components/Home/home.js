import { useState, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import Products from "../Products/products";
import "./home.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Home = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    products: null,
    errorMsg: null,
  });

  useEffect(() => {
    const getProduct = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        products: null,
        errorMsg: null,
      });

      const apiUrl = "https://fakestoreapi.com/products";
      const options = {
        method: "GET",
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response.ok) {
        setApiResponse((prevData) => ({
          ...prevData,
          status: apiStatusConstants.success,
          products: data,
        }));
      } else {
        setApiResponse((prevData) => ({
          ...prevData,
          status: apiStatusConstants.failure,
          errorMsg: data.error_msg,
        }));
      }
    };

    getProduct();
  }, []);

  const renderLoader = () => {
    return (
      <div>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  };

  const renderFailure = () => {
    return (
      <>
        <p>Page not Found</p>
      </>
    );
  };

  const renderProducts = () => {
    const { products } = apiResponse;
    return (
      <>
        <div className="product-container">
          <Products products={products} />
        </div>
      </>
    );
  };

  const renderProductDetails = () => {
    const { status } = apiResponse;

    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoader();
      case apiStatusConstants.success:
        return renderProducts();
      case apiStatusConstants.failure:
        return renderFailure();
    }
  };
  return <>{renderProductDetails()}</>;
};

export default Home;
