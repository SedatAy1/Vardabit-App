import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addToCart } from '../../store/products/actions';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../store/cart/actions'; // removeFromCart import edildi
import ProductCard from '../../components/ProductCard/ProductCard';
import Cart from '../../components/Cart/Cart';
import Filter from '../../components/Filter/Filter';
import Header from '../../components/Header/Header';
import Pagination from '../../components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
    display: flex;
`;

const ProductListContainer = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 10px;
    padding: 20px;
`;

const ProductList = () => {
    const dispatch = useDispatch();  // eslint-disable-line no-unused-vars
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const cartItems = useSelector((state) => state.cart.items);
    const totalCount = useSelector((state) => state.products.totalCount);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [selectedFilters, setSelectedFilters] = useState({
        sort: '',
        brands: [],
        models: [],
        brandSearch: '',
        modelSearch: '',
    });
    const [filters, setFilters] = useState({ brands: [], models: [] });

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);



    useEffect(() => {
        dispatch(fetchProducts(currentPage, searchQuery, selectedFilters));
    }, [dispatch, currentPage, searchQuery, selectedFilters]);


    useEffect(() => {
        if (products.length > 0) {
            const uniqueBrands = [...new Set(products.map((product) => product.brand))];
            const uniqueModels = [...new Set(products.map((product) => product.model))];
            setFilters({ brands: uniqueBrands, models: uniqueModels });
        }
    }, [products]);


    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        setIsCartOpen(true);
    };

    const handleIncreaseQuantity = (itemId) => { // itemId parametresi
        dispatch(increaseQuantity(itemId)); // itemId'yi dispatch et
    };

    const handleDecreaseQuantity = (itemId) => { // itemId parametresi
        if (cartItems.find(item => item.id === itemId).quantity > 1) { // Doğrudan cartItems'ı kontrol et
            dispatch(decreaseQuantity(itemId));  // itemId'yi dispatch et
        }
    };

    const handleViewDetails = (product) => {
        navigate(`/product/${product.id}`);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };


    const handleFilterChange = (filterType, value) => {
        let updatedFilters;

        if (filterType === 'sort') {
            updatedFilters = { ...selectedFilters, sort: value, brandSearch: '', modelSearch: '' };
        } else if (filterType === 'brands') {
            const newBrands = selectedFilters.brands.includes(value)
                ? selectedFilters.brands.filter((brand) => brand !== value)
                : [...selectedFilters.brands, value];
            updatedFilters = { ...selectedFilters, brands: newBrands, brandSearch: '' };
        } else if (filterType === 'models') {
            const newModels = selectedFilters.models.includes(value)
                ? selectedFilters.models.filter((model) => model !== value)
                : [...selectedFilters.models, value];
            updatedFilters = { ...selectedFilters, models: newModels, modelSearch: '' };
        } else if (filterType === 'brandSearch') {
            updatedFilters = { ...selectedFilters, brandSearch: value };
        } else if (filterType === 'modelSearch') {
            updatedFilters = { ...selectedFilters, modelSearch: value };
        }

        setSelectedFilters(updatedFilters);
    };

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    }


    const totalPages = Math.ceil(totalCount / productsPerPage);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Header onSearch={handleSearch} cartItemCount={cartItemCount} onToggleCart={toggleCart} />
            <PageContainer>
                <Filter filters={filters} selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
                <ProductListContainer>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </ProductListContainer>
                {isCartOpen && <Cart
                    cartItems={cartItems}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                    isOpen={isCartOpen}
                    onClose={toggleCart}
                    onRemoveFromCart={handleRemoveFromCart}
                />}
            </PageContainer>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default ProductList;