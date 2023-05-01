import { EuiButtonIcon, EuiCard } from "@elastic/eui";

import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

import CardLabel from "./CardLabel";

const DogCard = (props) => {
    const { name, breed, owner, size, description, id, onActionClick } = props;

    //TODO add an empty results view 
    return (
        <div className='dog-card'>
            <EuiCard
                title={name}
                hasBorder
                css={css`height: 100%`}
                footer={
                    <div className="footer-row">
                        <EuiButtonIcon
                            iconSize="l"
                            size="m"
                            aria-label='Edit Dog'
                            iconType='gear'
                            onClick={() => onActionClick({ type: 'edit', id })}
                        />
                        <EuiButtonIcon
                            iconSize="l"
                            size="m"
                            aria-label='Delete Dog'
                            iconType='trash'
                            onClick={() => onActionClick({ type: 'delete', id })}
                        />
                    </div>
                }
            >
                <div className="card-body">
                    <div className="card-description">
                        {description}
                    </div>
                    <CardLabel label='Breed' value={breed} />
                    <CardLabel label='Owner' value={owner} />
                    <CardLabel label='Size' value={size} />
                </div>
            </EuiCard>
        </div>
    )
}

export default DogCard;