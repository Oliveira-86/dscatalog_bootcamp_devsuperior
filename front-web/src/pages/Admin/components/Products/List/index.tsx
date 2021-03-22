import { useHistory } from 'react-router-dom'
import Card from '../Card';
import { ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeResquest } from 'core/utils/request';
import { useEffect, useState, useCallback } from 'react';
import Pagination from 'core/components/Pagination';
import { toast } from 'react-toastify';

const List = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [ isLoading, setIsLoading] = useState(false);
    const [ activePage, setActivePage ] = useState(0);
    const history = useHistory(); // o useHistory é hook, ou seja, é um função que pode ser usada dentro de um componente.
    
    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id'
        }

        setIsLoading(true);
        makeResquest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            }) 
    }, [activePage])

//useEffect é usado para acessar o ciclo de vida do componente
    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja realmente excluir esse produto?')

        if (confirm) {
            makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE' })
                .then(() => {
                    toast.info('Produto removido com sucesso!!');
                    getProducts();
                })
                .catch(() => {
                    toast.error('Erro ao remover o produto')
                })
        }
    }

    return (
        <div className="admin-product-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>
            <div className="admin-list-container">
               {productsResponse?.content.map(product => (
                   <Card product={product} key={product.id} onRemove={onRemove} />
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