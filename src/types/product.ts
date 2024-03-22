// types
import { Products, Reviews, Address } from 'types/e-commerce';
import { KeyedObject } from 'types';

// ==============================|| TYPES - PRODUCT ||============================== //

export interface ProductCardProps extends KeyedObject {
  id: number;
  color?: string;
  name: string;
  image: string;
  description?: string;
  offerPrice?: number;
  salePrice?: number;
  rating?: number;
  href?: string;
  disabledBuying: boolean;
  createUserArt: string;
  accessToken?: string;
}

export interface ProductStateProps {
  products: Products[];
  product: Products | null;
  relatedProducts: Products[];
  reviews: Reviews[];
  addresses: Address[];
  error: object | string | null;
}
