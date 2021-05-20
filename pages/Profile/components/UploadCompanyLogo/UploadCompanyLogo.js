import React from 'react';
import { connect } from "react-redux";
import { Card, CardBody } from "reactstrap";

import placeholder from '../../../../assets/images/custom/placeholder-logo.png';
import { updateCompanyLogo, removeCompanyLogo } from '../../../../store/actions';
import { ValidationErrors } from '../../../../components/Custom';
import { UploadImage } from '../UploadImage';

const UploadCompanyLogoComponent = ({
    updateCompanyLogoLoading,
    updateCompanyLogoLoadingError,
    user,
    updateCompanyLogo,
    removeCompanyLogo,
}) => {
    const handleUpload = (file) => {
        updateCompanyLogo(file);
    }

    const handleRemove = () => {
        removeCompanyLogo();
    };

    return (
        <Card>
            <CardBody>
                <UploadImage
                    id={'company-logo'}
                    image={user?.company?.avatar}
                    placeholder={placeholder}
                    labelUpload={'logo.upload'}
                    labelUploadNew={'logo.upload.new'}
                    labelRemove={'logo.remove'}
                    loading={updateCompanyLogoLoading}
                    onUpdate={handleUpload}
                    onRemove={handleRemove}
                />

                {updateCompanyLogoLoadingError && <ValidationErrors data={updateCompanyLogoLoadingError} />}
            </CardBody>
        </Card>
    );
};

const mapStateToProps = state => {
    const { updateCompanyLogoLoading, updateCompanyLogoLoadingError } = state.profile;
    const user = state.user.data;
    return { updateCompanyLogoLoading, updateCompanyLogoLoadingError, user };
};

const mapDispatchToProps = {
    updateCompanyLogo,
    removeCompanyLogo,
};

export const UploadCompanyLogo = connect(mapStateToProps, mapDispatchToProps)(UploadCompanyLogoComponent);