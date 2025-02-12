import React from 'react';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #2196f3;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  margin-right: 1rem;
  flex: 1;
  max-width: 400px;
`;

const CartIconContainer = styled.div`
  position: relative;
  cursor: pointer;
    display: flex;
    align-items: center;

`;
const CartCount = styled.span`
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.1rem 0.4rem;
  font-size: 0.8rem;
  position: absolute;
  top: -5px;
  right: -5px;

`;
const UserName = styled.span`
    margin-right: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
`;

const Header = ({ onSearch, cartItemCount, onToggleCart }) => {
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <HeaderContainer>
      <Logo onClick={handleLogoClick}>Vardabit</Logo>
      <SearchInput type="text" placeholder="Search..." onChange={handleSearchChange} />
      <CartIconContainer onClick={onToggleCart}>
      <UserName>
              {/* Buraya giriş yapmış kullanıcının adını yazdırabilirsiniz */}
              {/* Eğer giriş yapma özelliği yoksa, sabit bir isim yazabilirsiniz */}
              Kerem
            </UserName>
        <FaShoppingCart size={24} />
        {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
      </CartIconContainer>
    </HeaderContainer>
  );
};

export default Header;