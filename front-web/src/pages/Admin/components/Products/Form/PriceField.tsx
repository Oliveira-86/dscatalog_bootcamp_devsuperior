import { Control, Controller } from "react-hook-form"; //Para intregar um biblioteca de terceiros com react-hook-form usamos o controller
import CurrencyInput from 'react-currency-input-field';
import { FormState } from './';

type Props = {
    control: Control<FormState>;
}

const PriceField = ({ control }: Props) => (
    <Controller 
        name="price"
        rules={{ required: "Campo obrigatório" }}
        defaultValue=""
        //control é a forma do react-hook-form conectar aos components
        control={control}
        //quando é usado umafunção diferente do onChange, precisando usar o render
        render={({ value, onChange }) => (
            <CurrencyInput 
                placeholder="Preço"
                className="form-control input-base"
                value={value}
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                onValueChange={onChange}
            />
        )}
    />
);

export default PriceField;