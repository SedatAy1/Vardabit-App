import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;


  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
`;

const ProductName = styled.h3`
    margin-bottom:0.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    color:#333;
    text-align: center;
     height: 3.3rem; /* Limit the height to roughly 3 lines */
    overflow: hidden; /* Hide overflowing text */
    text-overflow: ellipsis; /* Add ellipsis for overflow */
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limit to 3 lines */
    -webkit-box-orient: vertical;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #2196f3;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
    width: 100%;
  justify-content: center; /*Butonları ortala*/

`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #2196f3;
  border-radius: 4px;
  background-color: #2196f3;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
   flex: 1; // Butonları eşit genişlikte yap
  white-space: nowrap; /* Yazı tek satırda kalsın */


  &:hover {
    background-color: white;
    color: #2196f3;
  }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    &.secondary{
      background-color: white;
      color:#2196f3;
       &:hover{
           background-color: #2196f3;
            color:white;
       }
    }
`;

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {

    return (
        <CardContainer onClick={() => onViewDetails(product)}>
            <ImageContainer>
                {/* API'den gelen image URL'sini kullan */}
                <ProductImage src={product.image} alt={product.name} />
            </ImageContainer>
            <ProductName>{product.name}</ProductName>
            <p>{product.brand}</p>
            <p>{product.model}</p>
            <ProductPrice>{product.price} €</ProductPrice>
            <ButtonContainer>
                <Button onClick={(event) => {
                    event.stopPropagation(); // ÖNEMLİ: Tıklamayı durdur
                    onAddToCart(product);
                }} disabled={!product.id}>Add to Cart</Button>
                {/* "View Details" butonu kaldırıldı */}
            </ButtonContainer>
        </CardContainer>
    );
};

export default ProductCard;