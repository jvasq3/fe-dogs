import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const DogLabel = (props) => {
    const {
        label,
        value
    } = props;

    return (
        <div className="card-label">
            <div css={css`font-weight: 600`}>
                {label}
            </div>
            <div>
                {value}
            </div>
        </div>
    )
}

export default DogLabel;