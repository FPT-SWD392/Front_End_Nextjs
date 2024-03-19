import ProductDetails from "views/apps/e-commerce/product-details";

type Props = {
    params: {
      id: string;
    };
  };
  
  // Multiple versions of this page will be statically generated
  // using the `params` returned by `generateStaticParams`
  export default function Page({ params }: Props) {
    const { id } = params;
  
    return <ProductDetails id={id} />;
  }
  