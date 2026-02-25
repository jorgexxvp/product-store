import productsData from '@/presentation/toolbox/mocks/Products.json';
import type { ProductRepository } from '@/core/domain/repositories/ProductRepository';
import type { IProductResponse } from '@/core/domain/models/Product';
import { PublicApi } from '@/core/infraestructure/api/Api';

export class ProductApi extends PublicApi implements ProductRepository {
  public GetProducts = async (): Promise<IProductResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    return {
      list: productsData,
    };
  };
}
