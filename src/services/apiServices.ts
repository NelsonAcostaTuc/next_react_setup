// src/services/apiService.ts
export interface Car {
    year: number;
    model: string;
    brand: string;
    subsidiary_id: number;
    id: number;
    created_at: string;
    subsidiary: {
      name: string;
      id: number;
      created_at: string;
    };
  }
  
  export const fetchCars = async (): Promise<Car[]> => {
    const response = await fetch('http://localhost:8000/cars');
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    const data: Car[] = await response.json();
    return data;
  };
  