import type { ProductRepository } from '@/core/domain/repositories/ProductRepository';

export class ProductUseCase {
  private repo: ProductRepository;

  constructor(repo: ProductRepository) {
    this.repo = repo;
  }

  public async GetProducts() {
    return this.repo.GetProducts();
  }
}
