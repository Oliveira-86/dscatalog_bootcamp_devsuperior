import { makePrivateRequest, makeResquest } from 'core/utils/request';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import BaseForm from '../../BaseForm';
import { useHistory, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import './styles.scss';
import { Category } from 'core/types/Product';

type FormState = {
    name: string;
    price: string;
    imgUrl: string;
    description: string;
    categories: Category[];
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>();
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'Editar produto' : 'Cadastrar um produto'

    useEffect(() => {
        if (isEditing) {
            makeResquest({ url: `/products/${productId}` })
            .then(response => {
                setValue('name', response.data.name);
                setValue('price', response.data.price);
                setValue('imgUrl', response.data.imgUrl);
                setValue('description', response.data.description);
                setValue('categories', response.data.categories);
            })
        }
    }, [productId, isEditing, setValue]);

    useEffect(() => {
        setIsLoadingCategories(true);
        makeResquest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, [])

    const onSubmit = (data: FormState) => {
        makePrivateRequest({ 
            url: isEditing ? `/products/${productId}` : '/products', 
            method: isEditing ? 'PUT' : 'POST', 
            data 
        })
        .then(() => {
            toast.info('Produto salva com sucesso!!');
            history.push('/admin/products');
        })
        .catch(() => {
            toast.error('Erro ao salvar o produto')
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                ref={register({ 
                                    required: "Campo obrigatório",
                                    minLength: { value: 5, message: "O campo deve ter ni mínimo 5 caracteres" },
                                    maxLength: { value: 60, message: "O campo deve ter ni máximo 60 caracteres" }
                                })}
                                name="name"
                                type="text"
                                className="form-control input-base"
                                placeholder="Nome do Produto"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <Controller
                                name="categories"
                                as={Select}
                                rules={{ required: true }}
                                control={control}
                                isLoading={isLoadingCategories}
                                options={categories}
                                getOptionLabel={(option: Category) => option.name}
                                getOptionValue={(option: Category) => String(option.id)}
                                classNamePrefix="categories-select"
                                placeholder="Categorias"
                                isMulti
                            />
                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório
                                </div>
                            )}
                        </div> 
                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo obrigatório" })}
                                name="price"
                                type="number"
                                className="form-control input-base"
                                placeholder="Preço"
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo obrigatório" })}
                                name="imgUrl"
                                type="text"
                                className="form-control input-base"
                                placeholder="Imagem do Produto"
                            />
                             {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-6  mb-5">
                        <textarea
                            ref={register({ required: "Campo obrigatório" })}
                            name="description"
                            className="form-control input-base"
                            placeholder="Descrição"
                            cols={30}
                            rows={10}
                        />
                         {errors.description && (
                                <div className="invalid-feedback d-block">
                                    {errors.description.message}
                                </div>
                            )}
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;