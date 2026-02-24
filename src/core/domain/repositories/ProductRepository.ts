import type { IProductResponse } from '@/core/domain/models/Product';

export interface ProductRepository {
  GetProducts: () => Promise<IProductResponse>;
}
