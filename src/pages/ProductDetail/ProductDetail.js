import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById, addToCart } from '../../store/products/actions';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../store/cart/actions';
import styled from 'styled-components';
import Cart from '../../components/Cart/Cart';
import Header from '../../components/Header/Header';

const ProductDetailContainer = styled.div`
    display: flex;
    padding: 20px;
    justify-content: center;
    align-items: flex-start;

`;
const ImageContainer = styled.div`
    flex: 1;
    text-align: center;
    margin-right: 20px;
`;

const ProductImage = styled.img`
    max-width: 100%;
    height: auto;
    max-height: 500px;
    object-fit: contain;
`;

const DetailsContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const AddToCartButton = styled.button`
    background-color: #2196f3;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #0b7dda;
    }
`;

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.currentProduct);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const cartItems = useSelector((state) => state.cart.items);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);


    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setIsCartOpen(true);
    };
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    useEffect(() => {
        dispatch(fetchProductById(id));
        window.scrollTo(0, 0);
    }, [dispatch, id]);

    const handleIncreaseQuantity = (item) => {
        dispatch(increaseQuantity(item.id));
    };

    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(decreaseQuantity(item.id));
        }

    };

    const handleRemoveFromCart = (productId) => { // Yeni eklenen fonksiyon
        dispatch(removeFromCart(productId));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div>
            <Header onSearch={() => { }} cartItemCount={cartItemCount} onToggleCart={toggleCart} />

            <ProductDetailContainer>
                <ImageContainer>
                    <ProductImage src={`https://picsum.photos/400/300?random=${product.id}`} alt={product.name} />
                </ImageContainer>
                <DetailsContainer>
                    <h2>{product.name}</h2>
                    <p>Brand: {product.brand}</p>
                    <p>Model: {product.model}</p>
                    <p>Price: {product.price} €</p>
                    <p>{product.description}</p>
                    <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
                </DetailsContainer>

            </ProductDetailContainer>
            {isCartOpen && <Cart
                cartItems={cartItems}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
                isOpen={isCartOpen}
                onClose={toggleCart}
                onRemoveFromCart={handleRemoveFromCart} // Yeni eklenen prop
            />}
        </div>
    );
};

export default ProductDetail;