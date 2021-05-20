import React from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form'
import { withTranslation } from "react-i18next";
import { Card, CardBody, Alert, Button, Col, Row } from "reactstrap";

import { FORM_CHANGE_PASSWORD } from "../../../../consts/forms";
import TextInput from "../../../../components/Common/TextInput";
import ButtonLoadingIcon from '../../../../components/Common/ButtonLoadingIcon';
import { passwordsValidation } from './validate';
import { changePassword } from '../../../../store/actions';

const ChangePasswordComponent = ({
    passwordLoading,
    passwordSuccess,
    passwordError,
    handleSubmit,
    changePassword,
    t,
}) => {
    const onSubmit = (values) => {
        changePassword(values);
    };

    return (
        <Card>
            <CardBody>
                {passwordSuccess && passwordSuccess ? <Alert color="success">{t(passwordSuccess)}</Alert> : null}
                {passwordError && passwordError ? <Alert color="danger">{passwordError.message}</Alert> : null}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form-horizontal"
                    noValidate={true}
                >
                    <Field
                        name="current_password"
                        label={t('field.label.current-password')}
                        placeholder={t('field.placeholder.current-password')}
                        id={'current_password'}
                        type="password"
                        component={TextInput}
                        translateParams={{ count: 8 }}
                        row
                    />

                    <Field
                        name="password"
                        label={t('field.label.new-password')}
                        placeholder={t('field.placeholder.new-password')}
                        id={'password'}
                        type="password"
                        component={TextInput}
                        translateParams={{ count: 8 }}
                        row
                    />

                    <Field
                        name="password_confirmation"
                        label={t('field.label.confirm-new-password')}
                        placeholder={t('field.placeholder.confirm-new-password')}
                        id={'password_confirmation'}
                        type="password"
                        component={TextInput}
                        translateParams={{ count: 8 }}
                        row
                    />

                    <Row className="justify-content-end">
                        <Col lg="10">
                            <Button
                                type="submit"
                                color="primary"
                                disabled={passwordLoading}
                            >
                                <ButtonLoadingIcon loading={passwordLoading} />
                                {t('password.change')}
                            </Button>
                        </Col>
                    </Row>
                </form>
            </CardBody>
        </Card>
    );
};

const mapStateToProps = state => {
    const { passwordLoading, passwordSuccess, passwordError } = state.profile;
    return { passwordLoading, passwordSuccess, passwordError };
};

const mapDispatchToProps = {
    changePassword,
};

const ChangePasswordForm = reduxForm({
    form: FORM_CHANGE_PASSWORD,
    validate: passwordsValidation,
})(ChangePasswordComponent);

export const ChangePassword = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ChangePasswordForm));