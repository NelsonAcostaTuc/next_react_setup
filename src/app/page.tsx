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
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newCar, setNewCar] = useState<Omit<Car, 'id' | 'created_at' | 'subsidiary'>>({
    year: 2024,
    model: '',
    brand: '',
    subsidiary_id: 1,
  });

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

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí deberías agregar la lógica para enviar el nuevo coche al backend.
    // Por ejemplo, podrías usar fetch o axios para enviar una solicitud POST.
    console.log('New Car:', newCar);
    // Después de agregar el coche, deberías actualizar el estado y ocultar el formulario.
    setShowAddForm(false);
  };

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
      <div className="flex justify-between mb-6">
        <div className="flex space-x-4">
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
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {showAddForm ? 'Cancel' : 'Add Car'}
        </button>
      </div>
      {showAddForm && (
        <form onSubmit={handleAddCar} className="mb-6 p-4 bg-white rounded-md shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Model:</label>
            <input
              type="text"
              value={newCar.model}
              onChange={e => setNewCar({ ...newCar, model: e.target.value })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Brand:</label>
            <input
              type="text"
              value={newCar.brand}
              onChange={e => setNewCar({ ...newCar, brand: e.target.value })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Year:</label>
            <input
              type="number"
              value={newCar.year}
              onChange={e => setNewCar({ ...newCar, year: parseInt(e.target.value) })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Subsidiary ID:</label>
            <input
              type="number"
              value={newCar.subsidiary_id}
              onChange={e => setNewCar({ ...newCar, subsidiary_id: parseInt(e.target.value) })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Car
          </button>
        </form>
      )}
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