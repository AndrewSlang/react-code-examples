import React from 'react';
import { connect } from "react-redux";
import { Card, CardBody } from "reactstrap";

import placeholder from '../../../../assets/images/custom/avatar-placeholder.png';
import { updateAvatar, removeAvatar } from '../../../../store/actions';
import { ValidationErrors } from '../../../../components/Custom';
import { UploadImage } from '../UploadImage';

const UploadAvatarComponent = ({
    avatarLoading,
    avatarSuccess,
    avatarError,
    user,
    updateAvatar,
    removeAvatar,
}) => {
    const handleUpload = (file) => {
        updateAvatar(file);
    }

    const handleRemove = () => {
        removeAvatar();
    };

    return (
        <Card>
            <CardBody>
                <UploadImage
                    id={'avatar'}
                    image={user?.avatar}
                    placeholder={placeholder}
                    labelUpload={'photo.upload'}
                    labelUploadNew={'photo.upload.new'}
                    labelRemove={'photo.remove'}
                    loading={avatarLoading}
                    onUpdate={handleUpload}
                    onRemove={handleRemove}
                />

                {avatarError && <ValidationErrors data={avatarError} />}
            </CardBody>
        </Card>
    );
};

const mapStateToProps = state => {
    const { avatarLoading, avatarSuccess, avatarError } = state.profile;
    const user = state.user.data;
    return { avatarLoading, avatarSuccess, avatarError, user };
};

const mapDispatchToProps = {
    updateAvatar,
    removeAvatar,
};

export const UploadAvatar = connect(mapStateToProps, mapDispatchToProps)(UploadAvatarComponent);