import ProductDetails from 'views/apps/e-commerce/product-details';
import { GetArtInfo } from '../../../../../../../package/api/Art/GetArtInfo';

type Props = {
  params: {
    id: string;
  };
};

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }: Props) {
  const { id } = params;
  const data = await GetArtInfo({ id: +id });
  return <ProductDetails id={id} art={data} />;
}
