import { useState, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import { IoIosStar } from "react-icons/io";
import "./modal.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Modal = (props) => {
  const { id } = props;
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  });

  useEffect(() => {
    const getProduct = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        product: null,
        errorMsg: null,
      });

      const apiUrl = `https://fakestoreapi.com/products/${id}`;
      const options = {
        method: "GET",
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setApiResponse((prevData) => ({
          ...prevData,
          status: apiStatusConstants.success,
          product: data,
        }));
      } else {
        setApiResponse((prevData) => ({
          ...prevData,
          status: apiStatusConstants.failure,
          product: data.error_msg,
        }));
      }
    };

    getProduct();
  }, []);

  const renderLoader = () => {
    return (
      <div className="loader">
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

  const renderSingleProduct = () => {
    const { product } = apiResponse;

    return (
      <>
        <div className="content">
          <div className="modal-wrapper-bottom">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-detail">
              <p>{product.description}</p>
              <p>{product.category}</p>
              <p>
                <span>&#8377;</span>
                {product.price}/-
              </p>
              <p className="rating">
                <span>Rating</span>
                {product.rating.rate}
                <span>
                  <IoIosStar color="#0394fc" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderModal = () => {
    const { status } = apiResponse;

    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoader();
      case apiStatusConstants.success:
        return renderSingleProduct();
      case apiStatusConstants.failure:
        return renderFailure();
      default:
        return null;
    }
  };

  return <>{renderModal()}</>;
};

export default Modal;
