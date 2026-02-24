import { ProductApi } from '@/core/infraestructure/services/ProductApi';

// Repositories
const productApi = new ProductApi();

// Client
export const clientProductApi = productApi;
