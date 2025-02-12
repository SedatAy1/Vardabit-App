import React from 'react';
import styled from 'styled-components';
import { FaTimes, FaTrash } from 'react-icons/fa';

const CartContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 100;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CartTitle = styled.h2`
  margin: 0;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #555;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #2196f3;
  }
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  color: #777;
`;

const CartItem = styled.div`
  display: grid; // Grid layout kullan
  grid-template-columns: auto 1fr auto auto; // Sütunlar
  grid-template-areas:  "image name quantity price"
                        "image name quantity remove"; // Alanlar
  gap: 0.5rem; // Sütunlar ve satırlar arası boşluk
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const CartItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  grid-area: image; // Resmi "image" alanına yerleştir
`;

const ItemName = styled.span`
  grid-area: name; // İsmi "name" alanına yerleştir
  margin-right: 0.5rem;

`;

const ItemQuantity = styled.div`
  grid-area: quantity; // Miktarı "quantity" alanına yerleştir
  display: flex;
  align-items: center;
  margin-right: 0.5rem;


  button {
    padding: 0.25rem 0.5rem;
    border: 1px solid #ccc;
    background-color: white;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  span {
    margin: 0 0.5rem;
    font-weight: bold;
  }
`;

const ItemPrice = styled.span`
  grid-area: price; // Fiyatı "price" alanına yerleştir
  text-align: right;
  font-weight: bold;
  color: #2196f3;
`;

const RemoveButton = styled.button`
  grid-area: remove; // Silme butonunu "remove" alanına yerleştir
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  line-height: 1;
  justify-self: end; /* Sağa yasla */


  &:hover {
    color: #c82333;
  }
`;

const TotalPrice = styled.p`
  text-align: right;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 1rem;
  color: #333;
`;

const CheckOutButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #218838;
  }
`;

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
            <CartItemImage src={`https://picsum.photos/60/60?random=${item.id}`} alt={item.name} />
            <ItemName>{item.name}</ItemName>
            <ItemQuantity>
              <button onClick={() => onDecreaseQuantity(item.id)} disabled={item.quantity <= 1}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => onIncreaseQuantity(item.id)}>+</button>
            </ItemQuantity>
            <ItemPrice>{(item.price * item.quantity).toFixed(2)} €</ItemPrice>
            <RemoveButton onClick={() => onRemoveFromCart(item.id)}><FaTrash /></RemoveButton>
          </CartItem>
        ))
      )}
      <TotalPrice>Total Price: {totalPrice.toFixed(2)} €</TotalPrice>
      <CheckOutButton>Checkout</CheckOutButton>
    </CartContainer>
  );
};

export default Cart;