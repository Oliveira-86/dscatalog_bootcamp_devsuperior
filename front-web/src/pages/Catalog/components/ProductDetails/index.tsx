import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../../core/assets/images/Arrow.svg'
import { Link } from 'react-router-dom'
import './styles.scss';
import ProductPrice from '../../../../core/components/ProductPrice';
import { Product } from '../../../../core/types/Product';
import { makeResquest } from '../../../../core/utils/request';
import ProductDescriptionLoader from '../Loaders/ProductDescriptionLoader';
import ProductInfoLoader from '../Loaders/ProductInfoLoader';

type ParamsType = {
    productId: string;
}

const ProductDetails = () => {

    const { productId } = useParams<ParamsType>();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        makeResquest({ url: `/products/${productId}` })
            .then(response => setProduct(response.data))
            .finally(() => setIsLoading(false));
    }, [productId]);

    return (
        <div className="product-details-container">
            <div className="card-base border-radius-20 product-details">
                <Link to="/products" className="product-details-goback">
                    <ArrowIcon className="icon-goback" />
                    <h1 className="text-goback">voltar</h1>
                </Link>
                <div className="product-details-info ">                   
                        {isLoading ? <ProductInfoLoader /> : (
                            <div className="product-details-info-content">
                                <div className="product-details-card text-center">
                                    <img src={product?.imgUrl} alt={product?.name} className="product-image" />
                                </div>
                                <div className="product-info-field">
                                    <h1 className="product-details-name">
                                        {product?.name}
                                    </h1>
                                    {product?.price && <ProductPrice price={product?.price} />}
                                </div>
                            </div>
                        )}                   
                    <div className="product-details-card">
                        {isLoading ? <ProductDescriptionLoader /> : (
                            <>
                                <h1 className="product-description-title">
                                    Descrição do Produto
                                </h1>
                                <p className="product-description-text">
                                    {product?.description}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductDetails;

// text-center é um propriedade do bootstrap
//row é uma propriedade do bootstrap
//col-6 é uma propriedade do bostrap que divide a div em 12 colunas, nesse caso essa div vai ocupar a metade do área