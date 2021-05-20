import React, { useState, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Media, Spinner } from "reactstrap";
import { Link } from 'react-router-dom';

const UploadImageComponent = ({
    id = 'img-upload',
    image,
    placeholder,
    labelUpload = 'photo.upload',
    labelUploadNew = 'photo.upload.new',
    labelRemove = 'photo.remove',
    loading,
    onUpdate,
    onRemove,
}) => {
    const { t } = useTranslation();

    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const inputRef = useRef();

    const handleImageSelected = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setSelectedPhoto(reader.result);
            }
        };
        reader.readAsDataURL(file);

        onUpdate(file);

        if (inputRef.current) {
            inputRef.current.value = null;
        }
    };

    const selectPhoto = (event) => {
        event.preventDefault();

        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const removePhoto = () => {
        onRemove();
    };

    useEffect(() => {
        if (image) {
            setSelectedPhoto(null)
        }
    }, [image]);

    return (
        <Media>
            <div className="mr-3 avatar-select-wrap">
                <label htmlFor={id} className={'avatar-label'}>
                    <img src={selectedPhoto ? selectedPhoto : image ? image : placeholder} alt="" className="avatar-md rounded-circle img-thumbnail avatar-cover" />
                </label>
                <input
                    type='file'
                    id={id}
                    style={{ display: 'none' }}
                    onChange={handleImageSelected}
                    ref={inputRef}
                    accept="image/png, image/jpeg"
                />
                <div className={'avatar-loading'} style={{ display: loading ? 'flex' : 'none' }}>
                    <Spinner size={'sm'} color="primary" />
                </div>
            </div>
            <Media body className="align-self-center">
                <div className={'flex-column'} style={{ display: !loading ? 'flex' : 'none' }} >
                    <div className={'mt-1'}>
                        <Link to="#" className="text-primary" onClick={selectPhoto}>{image ? t(labelUploadNew) : t(labelUpload) }</Link>
                    </div>

                    {image && (
                        <div className={'mt-1'}>
                            <Link to="#" className="text-primary" onClick={removePhoto}>{t(labelRemove)}</Link>
                        </div>
                    )}
                </div>
            </Media>
        </Media>
    );
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = {
};

export const UploadImage = connect(mapStateToProps, mapDispatchToProps)(UploadImageComponent);