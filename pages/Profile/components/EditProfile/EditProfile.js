import React from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form'
import { withTranslation } from "react-i18next";
import { Card, CardBody, Alert, Button, Row, Col, } from "reactstrap";

import { FORM_EDIT_PROFILE } from "../../../../consts/forms";
import TextInput from "../../../../components/Common/TextInput";
import ButtonLoadingIcon from '../../../../components/Common/ButtonLoadingIcon';
import { LanguageSelectField } from '../../../../components/Custom';
import {
    required as requiredValidator,
} from "../../../../utils/validations";
import * as normalize from '../../../../utils/normalize';
import * as format from '../../../../utils/format';
import { editProfile } from '../../../../store/actions';
import { ROLE_CONSULTANT, ROLE_MANAGER } from '../../../../consts/roles'

const EditProfileComponent = ({
    editProfileLoading,
    editProfileSuccess,
    editProfileError,
    handleSubmit,
    user,
    editProfile,
    t,
}) => {
    const onSubmit = (values) => {
        let params = {
            ...values,
        };

        if (values.phone) {
            params.phone = values.phone.replace(/[^0-9]/g, '');
        }

        editProfile(params);
    };

    return (
        <Card>
            <CardBody>
                {editProfileSuccess && editProfileSuccess ? <Alert color="success">{t(editProfileSuccess)}</Alert> : null}
                {editProfileError && editProfileError.message ? <Alert color="danger">{editProfileError.message}</Alert> : null}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form-horizontal"
                    noValidate={true}
                >
                    <Field
                        name="email"
                        label={t('field.label.email')}
                        placeholder={t('field.placeholder.email')}
                        id={'email'}
                        type="email"
                        component={TextInput}
                        disabled
                        row
                    />

                    <Field
                        name="name"
                        label={t('field.label.fullname')}
                        placeholder={t('field.placeholder.fullname')}
                        id={'name'}
                        type="text"
                        component={TextInput}
                        validate={[ requiredValidator ]}
                        row
                    />

                    <Field
                        name="company_name"
                        label={t('field.label.company')}
                        placeholder={t('field.placeholder.company')}
                        id={'company'}
                        type="text"
                        component={TextInput}
                        disabled={user.role === ROLE_CONSULTANT}
                        validate={user.role === ROLE_MANAGER ? [ requiredValidator ] : []}
                        row
                    />

                    <Field
                        name="phone"
                        label={t('field.label.phone')}
                        placeholder={t('field.placeholder.phone')}
                        id={'phone'}
                        type="text"
                        component={TextInput}
                        normalize={normalize.phone}
                        row
                    />

                    <Field
                        name="lang"
                        label={t('field.label.language')}
                        id={'lang'}
                        component={LanguageSelectField}
                        row
                    />

                    <Row className="justify-content-end">
                        <Col lg="10">
                            <Button
                                type="submit"
                                color="primary"
                                disabled={editProfileLoading}
                            >
                                <ButtonLoadingIcon loading={editProfileLoading} />
                                {t('save')}
                            </Button>
                        </Col>
                    </Row>
                </form>
            </CardBody>
        </Card>
    );
};

const mapStateToProps = state => {
    const { editProfileLoading, editProfileSuccess, editProfileError } = state.profile;
    const { data } = state.user;
    return {
        editProfileLoading,
        editProfileSuccess,
        editProfileError,
        user: data,
        initialValues: {
            email: data.email,
            name: data.name,
            company_name: data.company?.name,
            phone: format.phone(data.phone),
            lang: data.lang,
        },
    };
};

const mapDispatchToProps = {
    editProfile,
};

const EditProfileForm = reduxForm({
    form: FORM_EDIT_PROFILE,
})(EditProfileComponent);

export const EditProfile = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(EditProfileForm));