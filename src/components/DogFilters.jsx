import { EuiPanel, EuiFieldText, EuiSelect, EuiFormLabel, EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { useState } from 'react';
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const EDITABLE_FIELDS = [
    'name',
    'breed',
    'owner',
    'size',
    'description'
]

const LABEL_MAP = {
    name: 'Name',
    breed: 'Breed',
    owner: 'Owner',
    size: 'Size',
    description: 'Description'
}

const DogFilters = (props) => {
    const {
        setEnabledAction,
        sortDogs
    } = props;

    const [searchField, setSearchField] = useState('name');

    const options = EDITABLE_FIELDS.map((field) => {
        return {
            value: field,
            text: LABEL_MAP[field]
        }
    })

    return (
        <EuiPanel
            hasShadow={false}
            hasBorder
        >
            <EuiFlexGroup alignItems='center'>
                <EuiFlexItem>
                    <EuiFlexGroup alignItems='center' direction='row'>
                         <EuiFormLabel css={css`min-width: 3rem;`}>Search</EuiFormLabel>

                        <EuiFieldText
                            onChange={(e) => e.target.value.length ? setEnabledAction({ type: 'search', value: e.target.value, searchField }) : setEnabledAction({})}
                        />
                        <EuiSelect
                            id={'search-select'}
                            options={options}
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                        />
                    </EuiFlexGroup>
                </EuiFlexItem>

                    <EuiButton
                        color='text'
                        fullWidth={false}
                        size='s'
                        //css={css`width: 200px;`}
                        onClick={() => sortDogs('sorted-asc')}
                        iconType='arrowUp'
                    >
                        Sort dogs
                    </EuiButton>

                    <EuiButton
                        color='text'
                        fullWidth={false}
                        size='s'
                        //css={css`width: 200px;`}
                        iconType='arrowDown'
                        onClick={() => sortDogs('sorted-desc')}
                    >
                        Sort dogs
                    </EuiButton>

                <EuiButton
                    size='s'
                    iconType='plusInCircleFilled'
                    onClick={() => setEnabledAction({
                        type: 'add'
                    })}
                >
                    Add dog
                </EuiButton>
            </EuiFlexGroup>

        </EuiPanel>
    );
}

export default DogFilters;