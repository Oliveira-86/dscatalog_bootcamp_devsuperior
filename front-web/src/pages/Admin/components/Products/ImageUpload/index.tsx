import './styles.scss';
import { ReactComponent as UploadPlacenolder } from '../../../../../core/assets/images/upload-placeholder.svg';

const ImageUpload = () => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <div className="upload-container">
            <div className="upload-content">
                <div className="upload-button-container">
                    <input 
                        type="file"
                        id="upload"
                        accept="image/png, image/jpg"
                        onChange={handleChange}
                        hidden
                    />             
                    <label htmlFor="upload">ADICIONAR IMAGEM</label>
                </div>
                <small className="upload-text-helper text-primary">
                    As imagens devem ser  JPG ou PNG e não devem ultrapassar <strong> 5 mb </strong>.
                </small>
            </div>
            <div className="col-6 upload-placeholder">
                <UploadPlacenolder />
                <div className="upload-progress-container">
                    <div className="upload-progress">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageUpload;