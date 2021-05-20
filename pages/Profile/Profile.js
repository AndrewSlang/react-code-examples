import React, { useEffect } from 'react';
import { Container, Row, Col } from "reactstrap";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { PageTitle } from '../../components/Custom';
import { useTitle } from "../../hooks";
import {
    UploadAvatar,
    EditProfile,
    ChangePassword,
    RemoveUser,
    SocialLinks,
    UploadCompanyLogo,
} from './components';
import { cleanProfilePageInfo } from '../../store/actions';
import { ROLE_MANAGER } from '../../consts/roles';

const ProfileComponent = (props) => {
    useTitle(props.t('title.profile'));

    useEffect(() => {
        return () => {
            props.cleanProfilePageInfo()
        };
    }, []);

    const isManager = props.user?.role === ROLE_MANAGER;

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <PageTitle title={props.t('profile')} />

                    <Row>
                        <Col lg={isManager ? '6' : '12'}>
                            <UploadAvatar />
                        </Col>

                        {isManager && (
                            <Col lg="6">
                                <UploadCompanyLogo />
                            </Col>
                        )}
                    </Row>

                    <h4 className="card-title mb-4">{props.t('profile.edit')}</h4>
                    <EditProfile />

                    <h4 className="card-title mb-4">{props.t('social_accounts')}</h4>
                    <SocialLinks />

                    <h4 className="card-title mb-4">{props.t('password')}</h4>
                    <ChangePassword />

                    <h4 className="card-title mb-4">{props.t('deactivation')}</h4>
                    <RemoveUser />
                </Container>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user.data,
    };
};

const mapDispatchToProps = {
    cleanProfilePageInfo,
};

export const Profile = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ProfileComponent));