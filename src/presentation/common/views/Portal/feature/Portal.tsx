import { Card } from '@/presentation/common/components/Card/Card';
import { Loading } from '@/presentation/common/components/Loading';
import { useProducts } from '@/presentation/common/stores';

export const Portal = () => {
  const { filterData, loading } = useProducts();

  return (
    <div className="w-full h-full bg-[#f4f5f8] p-4 rounded">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filterData?.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      {loading && <Loading />}
    </div>
  );
};
