import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { cartItems, subTotal, shiping, tax, total } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const increment = (id) => {
    dispatch({
      type: "addToCart",
      payload: { id },
    });
    dispatch({ type: "calculatePrice" });
  };
  const decrement = (id) => {
    dispatch({
      type: "decrement",
      payload: id,
    });
    dispatch({ type: "calculatePrice" });
  };
  const deletehandler = (id) => {
    dispatch({
      type: "deleteFromCart",
      payload: id,
    });
    dispatch({ type: "calculatePrice" });
  };
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i) => (
            <CardItem
              key={i.id}
              imgSrc={i.imgSrc}
              name={i.name}
              price={i.price}
              qty={i.quantity}
              id={i.id}
              increment={increment}
              decrement={decrement}
              deletehandler={deletehandler}
            />
          ))
        ) : (
          <h1>Not Item Yet</h1>
        )}
      </main>
      <aside>
        <h2>Subtotal: {subTotal}</h2>
        <h2>Shiping: {shiping}</h2>
        <h2>Tax: {tax}</h2>
        <h2>Total: {total}</h2>
      </aside>
    </div>
  );
};

const CardItem = ({
  imgSrc,
  name,
  price,
  qty,
  increment,
  decrement,
  deletehandler,
  id,
}) => (
  <div className="cartitem">
    <img src={imgSrc} alt="item" />
    <article>
      <h3>{name}</h3>
      <p>${price}</p>
    </article>
    <div>
      <button onClick={() => decrement(id)}>-</button>
      <p>{qty}</p>
      <button onClick={() => increment(id)}>+</button>
    </div>
    <AiFillDelete onClick={() => deletehandler(id)} />
  </div>
);

export default Cart;
