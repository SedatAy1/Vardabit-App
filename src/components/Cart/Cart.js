import React from 'react';
import styled from 'styled-components';
import { FaTimes, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import PropTypes from 'prop-types';

// 1. ÖNCE TÜM STIL TANIMLARINI YAPIN (styled-components)
const CartContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background-color: #fff;
  padding: 1.5rem;
  box-shadow: -3px 0 6px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  z-index: 100;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  border-left: 1px solid #ddd;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #2196f3;
`;

const CartTitle = styled.h2`
  margin: 0;
  color: #333;
  font-size: 1.8rem;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #dc3545;
  }
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  color: #777;
  font-style: italic;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:  "imageandname quantity priceandremove";
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;
const ImageAndNameContainer = styled.div`
    grid-area: imageandname;
    display: flex;
    align-items: center;
    position: relative;

`;

const CartItemImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
    margin-right: 1rem;
`;

const ItemName = styled.span`
   font-weight: 500;
  color: #444;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ItemQuantity = styled.div`
  grid-area: quantity;
  display: flex;
  align-items: center;
  justify-self: center;

  button {
    padding: 0.3rem 0.6rem;
    border: 1px solid #ccc;
    background-color: #f8f9fa;
    color: #333;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;

    &:hover {
      background-color: #e2e6ea;
      border-color: #2196f3;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: #f0f0f0;
    }
     &:first-child {
      margin-right: 0.4rem;
    }

    &:last-child {
      margin-left: 0.4rem;
    }
  }

  span {
    margin: 0;
    font-weight: bold;
    font-size: 1.1rem;
    min-width: 25px;
     text-align: center;
  }
`;
const PriceAndRemoveContainer = styled.div`
    grid-area: priceandremove;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;

`;

const ItemPrice = styled.span`
  text-align: right;
  font-weight: bold;
  color: #2196f3;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  line-height: 1;
  transition: transform 0.1s ease-in-out, color 0.1s ease-in-out;

  &:hover {
    color: #c82333;
    transform: scale(1.3);
  }
`;

const TotalPrice = styled.p`
  text-align: right;
  font-weight: bold;
  font-size: 1.4rem;
  margin-top: 1.5rem;
  color: #333;
  padding-top: 1rem;
  border-top: 2px solid #2196f3;
`;

const CheckOutButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  font-weight: bold;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #218838;
  }
`;



// 2. SONRA Cart BİLEŞENİNİ (FONKSİYONUNU) TANIMLAYIN
const Cart = ({ cartItems, onIncreaseQuantity, onDecreaseQuantity, isOpen, onClose, onRemoveFromCart }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContainer isOpen={isOpen}>
      <CartHeader>
        <CartTitle>Cart</CartTitle>
        <CloseButton onClick={onClose}><FaTimes /></CloseButton>
      </CartHeader>
      {cartItems.length === 0 ? (
        <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
      ) : (
        cartItems.map(item => (
          <CartItem key={item.id}>
            <ImageAndNameContainer>
                <CartItemImage src={item.image} alt={item.name} />
                <ItemName>{item.name}</ItemName>
            </ImageAndNameContainer>

            <ItemQuantity>
              <button onClick={() => onDecreaseQuantity(item.id)} disabled={item.quantity <= 1}>
                <FaMinus />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => onIncreaseQuantity(item.id)}>
                <FaPlus />
              </button>
            </ItemQuantity>
            <PriceAndRemoveContainer>
                <ItemPrice>{(item.price * item.quantity).toFixed(2)} €</ItemPrice>
                <RemoveButton onClick={() => onRemoveFromCart(item.id)}><FaTrash /></RemoveButton>
            </PriceAndRemoveContainer>

          </CartItem>
        ))
      )}
      <TotalPrice>Total Price: {totalPrice.toFixed(2)} €</TotalPrice>
      <CheckOutButton>Checkout</CheckOutButton>
    </CartContainer>
  );
};

// 3. PropTypes'ları tanımlayın (isteğe bağlı)
Cart.propTypes = {
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
            image: PropTypes.string
        })
    ).isRequired,
    onIncreaseQuantity: PropTypes.func.isRequired,
    onDecreaseQuantity: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onRemoveFromCart: PropTypes.func.isRequired
};

// 4. Bileşeni export edin
export default Cart;