import { createContext, useContext, useState } from "react";

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {

    // Здесь будут все значения фильтра
    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: "",
        minWeight: "",
        maxWeight: "",
    });

    // Обновить один фильтр
    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Удалить один фильтр
    const removeFilter = (key) => {
        setFilters(prev => ({ ...prev, [key]: "" }));
    };

    // Сбросить все фильтры
    const resetFilters = () => {
        setFilters({
            minPrice: "",
            maxPrice: "",
            minWeight: "",
            maxWeight: "",
        });
    };

    // Проверить, есть ли активные фильтры
    const isActive = Object.values(filters).some(val => val !== "");

    return (
        <FilterContext.Provider value={{
            filters,
            updateFilter,
            removeFilter,
            resetFilters,
            isActive
        }}>
            {children}
        </FilterContext.Provider>
    );
};

// Хук для использования
export const useFilter = () => useContext(FilterContext);