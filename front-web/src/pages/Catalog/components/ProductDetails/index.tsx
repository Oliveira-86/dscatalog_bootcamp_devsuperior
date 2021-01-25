import { type } from 'os';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from '../../../../core/assets/images/Arrow.svg'
import { ReactComponent as ProductImage } from '../../../../core/assets/images/product.svg'
import { Link } from 'react-router-dom'
import './styles.scss';
import ProductPrice from '../../../../core/components/ProductPrice';

type ParamsType = {
    productId: string;
}

const ProductDetails = () => {

    const { productId} = useParams<ParamsType>();

    return(
        <div className="product-details-container">
            <div className="card-base border-radius-20 product-details">
                <Link to="/products" className="product-details-goback">
                    <ArrowIcon className="icon-goback"/> 
                    <h1 className="text-goback">voltar</h1>           
                </Link>     
                <div className="row "> 
                    <div className="col-6 pr-5">  
                        <div className="product-details-card text-center"> 
                            <ProductImage className="product-image" />
                        </div>
                        <h1 className="product-details-name">
                            Computador Desktop - Intel Core i7
                        </h1>
                        <ProductPrice price="2.779,00"/>
                    </div>
                    <div className="col-6 product-details-card"> 
                        <h1 className="product-description-title">
                            Descrição do Produto
                        </h1>
                        <p className="product-description-text">
                                Seja um mestre em multitarefas com a capacidade
                                para exibir quatro aplicativos simultâneos na tela.
                                A tela está ficando abarrotada? 
                                Crie áreas de trabalho virtuais para obter mais espaço e trabalhar 
                                com os itens que você deseja. Além disso,
                                todas as notificações e principais configurações 
                                são reunidas em uma única tela de fácil acesso.
                        </p>
                        </div>
                    </div>           
            </div>
           
        </div>
    );
}

export default ProductDetails;

// text-center é um propriedade do bootstrap
//row é uma propriedade do bostrap
//col-6 é uma propriedade do bostrap que divide a div em 12 colunas, nesse caso essa div vai ocupar a metade do área