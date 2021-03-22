import { useHistory } from 'react-router-dom'
import Card from '../Card';
import { ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeResquest } from 'core/utils/request';
import { useEffect, useState, useCallback } from 'react';
import Pagination from 'core/components/Pagination';
import { toast } from 'react-toastify';
import CardLoader from '../Loardes/ProductCardLoader';

const List = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [ isLoading, setIsLoading] = useState(false);
    const [ activePage, setActivePage ] = useState(0);
    const history = useHistory(); // o useHistory é hook, ou seja, é um função que pode ser usada dentro de um componente.
    
    //Toda vez que há uma mudança de estado ou de Props o componente será re-renderizado.
    //O useCallback fará com que o metodo getProducts seja renderizado apenas quando a dependencia activePage for alterada, ele nao irá criar uma nova referencia a cada re-render ficando assim memorizado(técnica usada pelo useCallback é "memorization" da programação funcional); 
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

//useEffect é usado para acessar o ciclo de vida do componente, ativa o bloco de código em seu escopo
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
                {isLoading ? <CardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Card product={product} key={product.id} onRemove={onRemove} />
                    ))
                )}
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