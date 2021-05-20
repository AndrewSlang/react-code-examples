import React, { useState } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form'
import { withTranslation } from "react-i18next";
import { Card, CardBody, CardTitle, CardSubtitle, Alert, Button, Row, Col } from "reactstrap";
import { withRouter, Link, useHistory } from 'react-router-dom';

import { FORM_REMOVE_USER } from "../../../../consts/forms";
import TextInput from "../../../../components/Common/TextInput";
import ButtonLoadingIcon from '../../../../components/Common/ButtonLoadingIcon';
import {
    deleteAccount as deleteAccountValidator,
} from "../../../../utils/validations";
import { removeUser } from '../../../../store/actions';

const RemoveUserComponent = ({
    removeLoading,
    removeSuccess,
    removeError,
    removeUser,
    handleSubmit,
    invalid,
    t,
}) => {
    const history = useHistory();

    const [visible, setVisible] = useState(false);

    const onSubmit = () => {
        removeUser(history);
    };

    return (
        <Card>
            <CardBody>
                <CardTitle>{t('profile.remove')}</CardTitle>
                {!visible ? (
                    <div className="mt-2">
                        <Link to="#" onClick={(e) => {e.preventDefault(); setVisible(true)}} className="text-muted">{t('profile.remove')}?</Link>
                    </div>
                ) : (
                    <>
                        <CardSubtitle className="mb-3">{t('profile.remove.type-delete')}</CardSubtitle>

                        {removeError && removeError ? <Alert color="danger">{removeError.message}</Alert> : null}

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="form-horizontal"
                            noValidate={true}
                        >
                            <Field
                                name="confirmation"
                                label={t('field.label.confirmation')}
                                placeholder={t('field.placeholder.confirmation')}
                                id={'confirmation'}
                                type="text"
                                component={TextInput}
                                validate={[ deleteAccountValidator ]}
                                row
                            />

                            <Row className="justify-content-end">
                                <Col lg="10">
                                    <div className="button-items">
                                        <Button
                                            type="button" color="light" outline className="waves-effect"
                                            disabled={removeLoading}
                                            onClick={() => setVisible(false)}
                                        >
                                            {t('cancel')}
                                        </Button>

                                        <Button
                                            type="submit"
                                            color="danger"
                                            disabled={removeLoading || invalid}
                                        >
                                            <ButtonLoadingIcon loading={removeLoading} />
                                            {t('profile.remove')}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    </>
                )}
            </CardBody>
        </Card>
    );
};

const mapStateToProps = state => {
    const { removeLoading, removeSuccess, removeError } = state.profile;
    return { removeLoading, removeSuccess, removeError };
};

const mapDispatchToProps = {
    removeUser,
};

const RemoveUserForm = reduxForm({
    form: FORM_REMOVE_USER,
})(RemoveUserComponent);

export const RemoveUser = withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(RemoveUserForm)));