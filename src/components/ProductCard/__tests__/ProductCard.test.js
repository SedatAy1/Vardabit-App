import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard'; // Doğru import yolu
import '@testing-library/jest-dom'; // Daha iyi matcher'lar için (örn. toBeVisible, toBeEnabled)

// Mock product verisi (birden fazla senaryo için kullanılabilir)
const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 99.99,
  image: 'test-image.jpg',
  brand: 'Test Brand',
  model: 'Test Model',
  description: 'Test description',
};

// Mock fonksiyonlar (her testte yeniden oluşturulmasın)
const mockAddToCart = jest.fn();
const mockViewDetails = jest.fn();

describe('ProductCard Component', () => {  // Tüm ProductCard testlerini grupla

  beforeEach(() => { // Her testten önce mock fonksiyonlarını resetle
    mockAddToCart.mockReset();
    mockViewDetails.mockReset();
  });

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} onViewDetails={mockViewDetails} />);

    // Ürün bilgilerinin doğru şekilde render edildiğini kontrol et
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('99.99 €')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument(); // Resim alt text'i
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('Test Model')).toBeInTheDocument();
  });

  it('calls onAddToCart when Add to Cart button is clicked', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} onViewDetails={mockViewDetails} />);
    fireEvent.click(screen.getByText('Add to Cart'));

    expect(mockAddToCart).toHaveBeenCalledTimes(1); // Bir kere çağrıldığını doğrula
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct); // Doğru argümanla çağrıldığını doğrula
  });

  it('calls onViewDetails when View Details button is clicked', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} onViewDetails={mockViewDetails} />);
    fireEvent.click(screen.getByText('View Details'));

    expect(mockViewDetails).toHaveBeenCalledTimes(1);
    expect(mockViewDetails).toHaveBeenCalledWith(mockProduct);
  });

  it('renders with empty product details', () => {
    render(<ProductCard product={{}} onAddToCart={mockAddToCart} onViewDetails={mockViewDetails} />);

    // Fiyatın görünmediğini kontrol et (veya varsayılan bir değer gösterildiğini)
    expect(screen.queryByText('€')).toBeNull(); // veya expect(screen.getByText('N/A')).toBeInTheDocument();
    expect(screen.getByAltText('')).toBeInTheDocument(); // Resmin alt text'inin boş olduğunu kontrol et
    // Diğer boş alanlar için de benzer kontroller eklenebilir.
  });

  it('renders product image correctly', () => {
      render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} onViewDetails={mockViewDetails} />);
      const image = screen.getByAltText('Test Product');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'test-image.jpg'); // Doğru src attribute'u
      expect(image).toHaveStyle({ maxWidth: '100%', height: '150px' }); //Stil kontrolü

   });

   it('handles missing image gracefully', () => {
        const productWithoutImage = { ...mockProduct, image: undefined };
        render(<ProductCard product={productWithoutImage} onAddToCart={mockAddToCart} onViewDetails={mockViewDetails} />);

        // Resim yoksa, varsayılan bir resim/placeholder gösterildiğini veya hiç gösterilmediğini kontrol et.
        expect(screen.queryByAltText('Test Product')).toBeNull(); // Alt text'i olan resim olmamalı.
        // Veya varsayılan bir resim/placeholder varsa onun kontrolü:
        // expect(screen.getByAltText('Placeholder Image')).toBeInTheDocument();
    });

    it('Add to Cart button is visible and enabled', () => {
        render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} onViewDetails={mockViewDetails}/>);
        expect(screen.getByText('Add to Cart')).toBeVisible(); // Görünür mü
        expect(screen.getByText('Add to Cart')).toBeEnabled(); // Tıklanabilir mi?
    });
    it('View Details button is visible and enabled', () => {
        render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} onViewDetails={mockViewDetails}/>);
        expect(screen.getByText('View Details')).toBeVisible();
        expect(screen.getByText('View Details')).toBeEnabled();
    });

    it('renders long product name correctly (without overflow)', () => {
        const longNameProduct = { ...mockProduct, name: 'This is a very very very long product name that might cause overflow' };
        render(<ProductCard product={longNameProduct} onAddToCart={mockAddToCart} onViewDetails={mockViewDetails} />);

        const productNameElement = screen.getByText(longNameProduct.name);
        expect(productNameElement).toBeInTheDocument();
        // Burada, CSS'inizin taşmayı nasıl ele aldığını kontrol etmeniz gerekir.
        // Örneğin, text-overflow: ellipsis kullanıyorsanız, ... ile bitip bitmediğini kontrol edebilirsiniz.
        // Veya overflow: hidden kullanıyorsanız, taşmanın görünmediğinden emin olabilirsiniz.
        // Bu kısım, stilinize bağlı olarak değişir.
    });
});