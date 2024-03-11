import Popup from "reactjs-popup";
import { IoMdClose } from "react-icons/io";
import Modal from "../Modal/modal";
import "./products.css";

const Products = (props) => {
  const { products } = props;

  return (
    <ul className="product-lists">
      {products.map((each) => (
        <Popup
          modal
          trigger={
            <li className="product-details">
              <img src={each.image} alt="title" />
              <p>{each.title}</p>
              <p>
                <span>&#8377;</span>
                {each.price}/-
              </p>
            </li>
          }
        >
          {(close) => (
            <div className="modal-backdrop">
              <div className="modal-wrapper">
                <div className="modal-wrapper-top">
                  <h3>{each.title}</h3>
                  <button
                    type="button"
                    className="trigger-button close-icon"
                    onClick={() => close()}
                  >
                    <IoMdClose />
                  </button>
                </div>
                <Modal id={each.id} />
              </div>
            </div>
          )}
        </Popup>
      ))}
    </ul>
  );
};

export default Products;
