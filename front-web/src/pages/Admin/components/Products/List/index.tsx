import React from 'react';
import { useHistory } from 'react-router-dom'
import Card from '../Card';
import ProductCard from '../Card';



const List = () => {
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
                <Card />
                <Card />
                <Card />
            </div>
        </div>
        
    )
}

export default List;