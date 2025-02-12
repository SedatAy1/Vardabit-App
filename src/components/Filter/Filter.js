import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  width: 200px;
  padding: 1rem;
  border-right: 1px solid #ddd;
`;

const FilterGroup = styled.div`
  margin-bottom: 1rem;
  border: 1px solid #ddd; // Her grubu bir border içine al
  padding: 0.5rem;
  border-radius: 4px;
`;

const FilterGroupTitle = styled.h4`
  margin-bottom: 0.5rem;
  font-weight: bold;
  border-bottom: 1px solid #ddd; // Başlığın altına çizgi
  padding-bottom: 0.5rem;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const Filter = ({ filters, selectedFilters, onFilterChange }) => {

  // Input alanlarındaki değişiklikleri dinleyen fonksiyon (marka ve model araması için)
  const handleInputChange = (filterType, value) => {
    onFilterChange(filterType, value); // Doğrudan onFilterChange'i çağır
  }

  return (
    <FilterContainer>
      {/* Sıralama (Sort By) */}
      <FilterGroup>
        <FilterGroupTitle>Sort By</FilterGroupTitle>
        <FilterLabel>
          <input
            type="radio"
            name="sort"
            value="oldToNew"
            checked={selectedFilters.sort === 'oldToNew'}
            onChange={() => onFilterChange('sort', 'oldToNew')}
          />
          Old to new
        </FilterLabel>
        {/* ... Diğer sıralama seçenekleri ... */}
         <FilterLabel>
          <input
            type="radio"
            name="sort"
            value="newToOld"
            checked={selectedFilters.sort === 'newToOld'}
            onChange={() => onFilterChange('sort', 'newToOld')}
          />
          New to old
        </FilterLabel>
          <FilterLabel>
          <input
            type="radio"
            name="sort"
            value="highToLow"
            checked={selectedFilters.sort === 'highToLow'}
            onChange={() => onFilterChange('sort', 'highToLow')}
          />
            Price high to low
        </FilterLabel>
        <FilterLabel>
          <input
            type="radio"
            name="sort"
            value="lowToHigh"
            checked={selectedFilters.sort === 'lowToHigh'}
            onChange={() => onFilterChange('sort', 'lowToHigh')}
          />
            Price low to High
        </FilterLabel>
      </FilterGroup>

      {/* Markalar (Brands) */}
      <FilterGroup>
        <FilterGroupTitle>Brands</FilterGroupTitle>
        <SearchInput
          type="text"
          placeholder="Search Brands..."
          value={selectedFilters.brandSearch || ''}  // Arama kutusunun değerini state'ten al
          onChange={(e) => handleInputChange('brandSearch', e.target.value)}
        />
        {filters.brands
          .filter((brand) =>  // Filtreleme burada yapılıyor
            brand.toLowerCase().includes(selectedFilters.brandSearch?.toLowerCase() || '')
          )
          .map((brand) => (
            <FilterLabel key={brand}>
              <input
                type="checkbox"
                name="brand"
                value={brand}
                checked={selectedFilters.brands.includes(brand)}
                onChange={() => onFilterChange('brands', brand)}
              />
              {brand}
            </FilterLabel>
          ))}
      </FilterGroup>

      {/* Modeller (Models) */}
      <FilterGroup>
        <FilterGroupTitle>Models</FilterGroupTitle>
        <SearchInput
          type="text"
          placeholder="Search Models..."
          value={selectedFilters.modelSearch || ''} // Arama kutusunun değerini state'ten al
          onChange={(e) => handleInputChange('modelSearch', e.target.value)}
        />
        {filters.models
        .filter((model) =>
           model.toLowerCase().includes(selectedFilters.modelSearch?.toLowerCase() || '')
        )
        .map((model) => (
          <FilterLabel key={model}>
            <input
              type="checkbox"
              name="model"
              value={model}
              checked={selectedFilters.models.includes(model)}
              onChange={() => onFilterChange('models', model)}
            />
            {model}
          </FilterLabel>
        ))}
      </FilterGroup>
    </FilterContainer>
  );
};

export default Filter;