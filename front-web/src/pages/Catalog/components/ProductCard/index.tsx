import React from 'react';
import './styles.scss';
import ProductPrice from '../../../../core/components/ProductPrice';
import { Product } from '../../../../core/types/Product';

type Props = {
    product: Product;
}

const ProductCard = ({ product }: Props) => (
    <div className="card-base border-radius-10 product-card">
       <img src={product.imgUrl} alt={product.name} className="product-image-card" />
        <div className="product-text">
            <h6 className="product-name">
                {product.name}
            </h6>
            <ProductPrice price={product.price} />
        </div>  
    </div>
    
);

export default ProductCard;