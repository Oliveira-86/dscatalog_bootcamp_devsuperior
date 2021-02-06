import React from 'react';
import './styles.scss';
import { ReactComponent as ArrowIcon } from '../../assets/images/Arrow.svg'
import { genarateList } from 'core/utils/list';


type Props = {
    totalPages: number;
    activePage: number;
    onChange: (item: number) => void;
}

const Pagination = ({ totalPages, activePage, onChange }: Props) => {

    const items = genarateList(totalPages);
    const previousClass = totalPages > 0 && activePage > 0 ? 'page-active' : 'page-inactive'; 
    const nextClass = (activePage + 1) < totalPages ? 'page-active' : 'page-inactive';

    return (
        <div className="pagination-container">
            <ArrowIcon 
                className={`pagination-previous ${previousClass}`}
                onClick={() => onChange(activePage - 1)}
            />
            {items.map(item => (
                <div 
                    key={item}
                    className={`pagination-content ${item === activePage ? 'active' : '' }`}
                    onClick={() => onChange(item)}
                >
                    { item + 1 }
                </div>
            ))}

            <ArrowIcon 
                className={`pagination-next ${nextClass}`}
                onClick={() => onChange(activePage + 1)}
            />
        </div>
    );
}

export default Pagination;