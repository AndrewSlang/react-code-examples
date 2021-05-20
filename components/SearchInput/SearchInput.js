import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useDebounce } from '../../../hooks';

export const SearchInput = ({
    placeholder = 'search',
    delay = 1000,
    onChange,
    disableInitialCallback = true,
    minLimit = 3,
    hint = true,
    searchFields = [],
    hintExample = '',
    wrapClass = 'app-search',
}) => {
    const { t } = useTranslation();

    const [value, setValue] = useState('');

    const debouncedValue = useDebounce(value, delay);

    const disableInitialStatusRef = useRef(disableInitialCallback);

    useEffect(() => {
        if (!disableInitialStatusRef.current) {
            let searchValue = debouncedValue.trim();

            if (searchValue.length < minLimit) {
                searchValue = null;
            }

            onChange(searchValue);
        }

        disableInitialStatusRef.current = false;
    }, [debouncedValue]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const renderSearchHintFields = () => {
        return searchFields
            .map(item => t(item))
            .join(', ');
    };

    return (
        <div className={wrapClass}>
            <div className={'d-flex'}>
                <div className="position-relative search-block__input-block">
                    <input type="text" className="form-control" placeholder={`${t(placeholder)} ...`} onChange={handleChange} value={value} />
                    <span className="bx bx-search-alt"></span>
                </div>
            </div>
            {debouncedValue && debouncedValue.length < minLimit && (
                <div className={'search-hint text-danger font-weight-bold mt-1'}>{t('search.hint', { count: minLimit })}</div>
            )}
            {hint && (
                <div className={'search-hint text-muted mt-1'}>
                    {t('search.hint.fields')} {renderSearchHintFields()}. {t('search.hint.enter')} {t('search.hint.for_example', { example: hintExample })}
                </div>
            )}
        </div>
    );
};