import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Card, CardBody } from "reactstrap";

import { SocialAccountsLink, ValidationErrors } from '../../../../components/Custom';
import { cleanSocialAccountState, linkSocialAccount, unlinkSocialAccount } from '../../../../store/actions';

const SocialLinksComponent = (props) => {

    useEffect(() => {
        return () => {
            props.cleanSocialAccountState();
        };
    }, []);

    const onSocialSuccess = (data) => {
        props.linkSocialAccount(data);
    };

    const handleRemove = ({ id, provider }) => {
        props.unlinkSocialAccount(id, provider);
    };

    return (
        <Card>
            <CardBody>
                {props.linkingError ? <ValidationErrors data={props.linkingError} /> : null}

                <SocialAccountsLink
                    onSuccess={onSocialSuccess}
                    onRemove={handleRemove}
                    pending={props.pending}
                    accounts={props.user?.social_accounts}
                />
            </CardBody>
        </Card>
    );
};

const mapStateToProps = state => {
    const { linkingError, pending } = state.social.linking;

    return {
        user: state.user.data,
        pending,
        linkingError,
    };
};

const mapDispatchToProps = {
    cleanSocialAccountState,
    linkSocialAccount,
    unlinkSocialAccount,
};

export const SocialLinks = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SocialLinksComponent));