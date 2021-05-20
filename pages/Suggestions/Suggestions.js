import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Alert } from "reactstrap";
import { withTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import {
    fetchSuggestedPropertyActiveList,
    cleanSuggestedPropertyActiveList,
    suggestedPropertyActiveListSetSort,
    suggestedPropertyActiveListResetSort,
    suggestedPropertyActiveListSetPage,
    suggestedPropertyActiveListSetFilter,
    suggestedPropertyActiveListResetFilter,
} from '../../../../../store/actions';
import { Pagination, SearchInput, PropertyListTable } from '../../../../../components/Custom';
import { SuggestedPropertyFilter } from '../SuggestedPropertyFilter';
import { getActiveStatusOptions } from "../../../../../helpers";

import * as HOC from '../../../../../HOC';
const TableDataLoading = HOC.withTableDataLoading();

const SuggestionsComponent = (props) => {
    const tableKeys = ['vendor', 'sender', 'city', 'address', 'unit', 'price', 'invite_status'];

    const [search, setSearch] = useState(null);

    const filterWarningVisible = useMemo(() => {
        return (props.filter.isActive || search) && props.list.length === 0 && !props.listLoading;
    }, [props.filter, props.list, props.listLoading, search]);

    useEffect(() => {
        let params = {
            page: props.page,
        };

        if (props.filter.isActive) {
            params.filter = props.filter.values;
        }

        if (props.sort.length > 0) {
            params.sort = props.sort;
        }

        if (search) {
            params.filter = {
                ...params.filter,
                keywords: search,
                search_fields: ['sender_name', 'address', 'unit'],
            };
        }

        props.fetchList(params);
    }, [props.filter, props.sort, props.page, search]);

    useEffect(() => {
        return () => {
            props.cleanState();
        }
    }, []);

    const handleSort = useCallback(sortBy => {
        if (!_.isEqual(sortBy, props.sort)) {
            props.setSort(sortBy);
        }
    }, [props.sort]);

    const handlePageChange = (item) => {
        props.setPage(item.selected + 1);
    };

    const handleSearchChange = (value) => {
        props.setPage(1);
        setSearch(value);
    };

    const handleResetFilter = () => {
        props.resetFilter();
    };

    const handleApplyFilter = (values) => {
        props.setFilter(values);
    };

    return (
        <Row>
            <Col lg="12">
                <Card>
                    <CardHeader className="bg-transparent">
                        <Row className="no-gutters justify-content-between">
                            <CardTitle className={'mt-2'}>{props.t('suggested_property.active.your.list')}</CardTitle>

                            <div className="button-items">
                                <SuggestedPropertyFilter
                                    filter={props.filter}
                                    onReset={handleResetFilter}
                                    onApply={handleApplyFilter}
                                    statusOptions={getActiveStatusOptions(props.t)}
                                />
                            </div>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row className={'no-gutters justify-content-between'}>
                            <SearchInput
                                onChange={handleSearchChange}
                                searchFields={
                                    ['search.field.consultants_name', 'search.field.address', 'search.field.unit']
                                }
                                hintExample={'Koningsstraat'}
                            />
                        </Row>

                        <TableDataLoading isLoading={props.listLoading} isFailed={props.listError} error={props.t(props.listError)}>
                            {filterWarningVisible ? (
                                <Alert color="primary">{props.t('property.filter.empty')}</Alert>
                            ) : (
                                <>
                                    <PropertyListTable
                                        keys={tableKeys}
                                        items={props.list}
                                        onSort={handleSort}
                                        sort={props.sort}
                                        isLoading={props.listLoading}
                                    />

                                    <Pagination data={props.meta} onPageChange={handlePageChange} />
                                </>
                            )}
                        </TableDataLoading>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

const mapStateToProps = state => {
    const { list, listLoading, listError, filter, sort, meta, page } = state.suggestedProperty.activeList;
    return {
        list,
        listLoading,
        listError,
        filter,
        sort,
        meta,
        page,
    };
};

const mapDispatchToProps = {
    fetchList: fetchSuggestedPropertyActiveList,
    cleanState: cleanSuggestedPropertyActiveList,
    setSort: suggestedPropertyActiveListSetSort,
    resetSort: suggestedPropertyActiveListResetSort,
    setPage: suggestedPropertyActiveListSetPage,
    setFilter: suggestedPropertyActiveListSetFilter,
    resetFilter: suggestedPropertyActiveListResetFilter,
};

export const Suggestions = withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SuggestionsComponent)));