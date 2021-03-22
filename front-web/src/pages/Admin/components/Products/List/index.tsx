import React from 'react';
import { useHistory } from 'react-router-dom'
import Card from '../Card';
import { ProductsResponse } from 'core/types/Product';
import { makeResquest } from 'core/utils/request';
import { useEffect, useState } from 'react';
import Pagination from 'core/components/Pagination';



const List = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [ isLoading, setIsLoading] = useState(false);
    const [ activePage, setActivePage ] = useState(0);
    
    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 4
        }

        setIsLoading(true);
        makeResquest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            }) 
    }, [activePage]); 
    const history = useHistory(); // o useHistory é hook, ou seja, é um função que pode ser usada dentro de um componente.

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    return (
        <div className="admin-product-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div className="admin-list-container">
               {productsResponse?.content.map(product => (
                   <Card product={product} key={product.id} />
               ))}
                {productsResponse && (
                <Pagination 
                    totalPages={productsResponse?.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />            
            )}
            </div>
        </div>
        
    )
}

export default List;