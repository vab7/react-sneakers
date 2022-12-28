import React from "react";
import { ProductSm } from "./Products/ProductSm/ProductSm";
import { Announcement } from "./Announcement";
import { AppContext } from "../App";

export const ShoppingList = ({
  products,
  removeProduct,
  hideShopping,
  fullPrice,
  orderProducts,
}) => {
  const { isOrder } = React.useContext(AppContext);

  const taxPrice = fullPrice === 0 ? 0 : fullPrice * 0.13;
  const sumPrice = taxPrice === 0 ? 0 : taxPrice + fullPrice;
  return (
    <div className="shopping-list-container fixed">
      <div onClick={hideShopping} className="overlay"></div>
      <div className="shopping-list absolute column">
        <span className="shop-text bold">Корзина</span>
        {isOrder ? (
          <Announcement
            img="order.png"
            name="Заказ оформлен!"
            body="Ваш заказ скоро будет передан курьерской доставке"
            color="color-1"
            width="100"
          />
        ) : (
          <>
            {products.length ? (
              <>
                <div className="shop-list column">
                  {products.map((product) => (
                    <ProductSm
                      key={product.id}
                      removeProduct={removeProduct}
                      product={product}
                    />
                  ))}
                </div>
                <div className="make-order column">
                  <div className="text-order column">
                    <div className="total-amount flex">
                      <span className="medium size-2">Итого:</span>
                      <div className="border-dash"></div>
                      <span className="bold size-2">
                        {sumPrice.toFixed(2)} руб.
                      </span>
                    </div>
                    <div className="tax flex">
                      <span className="medium size-2">Налог:</span>
                      <div className="border-dash"></div>
                      <span className="bold size-2">
                        {taxPrice.toFixed(2)} руб.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => orderProducts()}
                    className="btn-order items-c radius-md semi-bold size-2"
                  >
                    Оформить заказ
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 7H14.7143"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.71436 1L14.7144 7L8.71436 13"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <Announcement
                img="empty.jpg"
                name="Корзина пуста"
                body="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
