// src/app/page.tsx
'use client'
import { fetchCars, Car } from '@/services/apiServices';
import React, { useEffect, useState } from 'react';
const HomePage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<string>('');
  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars();
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        setError('Failed to fetch cars');
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = cars;

      if (brandFilter) {
        filtered = filtered.filter(car => car.brand === brandFilter);
      }

      if (yearFilter) {
        filtered = filtered.filter(car => car.year.toString() === yearFilter);
      }

      setFilteredCars(filtered);
    };

    applyFilters();
  }, [brandFilter, yearFilter, cars]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const uniqueBrands = Array.from(new Set(cars.map(car => car.brand)));
  const uniqueYears = Array.from(new Set(cars.map(car => car.year.toString())));

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Cars List</h1>
      <div className="flex justify-center space-x-6 mb-6">
        <label className="block">
          <span className="text-gray-700 font-semibold">Brand:</span>
          <select
            value={brandFilter}
            onChange={e => setBrandFilter(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All</option>
            {uniqueBrands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700 font-semibold">Year:</span>
          <select
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All</option>
            {uniqueYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
              >
                Model
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
              >
                Brand
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
              >
                Year
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
              >
                Subsidiary
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCars.map(car => (
              <tr key={car.id}>
                <td className="px-6 py-4 whitespace-nowrap">{car.model}</td>
                <td className="px-6 py-4 whitespace-nowrap">{car.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap">{car.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p>Name: {car.subsidiary.name}</p>
                  <p>ID: {car.subsidiary.id}</p>
                  <p>Created At: {car.subsidiary.created_at}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;

