import { Card } from '@/presentation/common/components/Card/Card';
import { Loading } from '@/presentation/common/components/Loading';
import { useProducts } from '@/presentation/common/stores';

export const Portal = () => {
  const { filterData, loading } = useProducts();

  return (
    <div className="w-full h-full bg-[#f4f5f8] p-4 rounded">
      <div 
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        aria-live="polite"
        role="region"
        aria-label="Lista de productos"
      >
        {!loading && filterData?.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-10" role="status">No se encontraron productos coincidentes.</p>
        ) : (
          filterData?.map((product) => (
            <Card key={product.id} product={product} />
          ))
        )}
      </div>
      {loading && <Loading />}
    </div>
  );
};
