import {
  EuiButton,
  EuiButtonEmpty,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiConfirmModal,
  EuiModal,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from '@elastic/eui';
import { useState } from 'react';
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const DogModal = (props) => {
  const {
    type,
    onClose,
    dog
  } = props;

  const initDog = {
    id: '',
    name: '',
    breed: '',
    owner: '',
    size: '',
    description: ''
  }

  /**
   * TODO refactor to only conditional desctructure from different data source 
   */

  const [formData, setFormData] = useState(dog ? { ...dog } : initDog)
  const modalId = `${type}-modal`;
  const validateForm = () => {
    return Object.values(formData).every(data => !!data);
  }

  const isSubmitDisabled = !validateForm();

  //non selectable dogs modal [add]
  if (type === 'add') {
    const { name, id, breed, description, owner, size } = formData;
    const addForm = (
      <EuiForm id={modalId} component="form">
        <EuiFormRow helpText='Id cannot be edited in the future.' label="Id">
          <EuiFieldText
            required
            name='add-id-field'
            value={id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          />
        </EuiFormRow>
        <EuiFormRow label="Name">
          <EuiFieldText
            required
            name='add-name-field'
            value={name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </EuiFormRow>

        <EuiFormRow label="Breed">
          <EuiFieldText
            required
            name='add-breed-field'
            value={breed}
            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
          />
        </EuiFormRow>
        <EuiFormRow label="Owner">
          <EuiFieldText
            required
            name='add-owner-field'
            value={owner}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
          />
        </EuiFormRow>

        <EuiFormRow label="Description">
          <EuiFieldText
            required
            name='add-description-field'
            value={description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </EuiFormRow>

        <EuiFormRow label="Size">
          <EuiFieldText
            required
            name='add-size-field'
            value={size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          />
        </EuiFormRow>

      </EuiForm>
    );


    return (
      <EuiModal css={css`padding: 1rem;`} onClose={() => onClose('cancel')}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Add Dog</EuiModalHeaderTitle>
        </EuiModalHeader>
        {addForm}
        <EuiModalFooter>
          <EuiButtonEmpty onClick={() => onClose('cancel', id)}>Cancel</EuiButtonEmpty>
          <EuiButton disabled={isSubmitDisabled} type="submit" form={modalId} onClick={() => onClose('add', id, formData)} fill>
            Save
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    )
  }

  //selected dog modals [edit, delete]
  const { name, id, breed, description, owner, size } = dog;

  const editForm = (
    <EuiForm id={modalId} component="form">
      <EuiFormRow label="Id">
        <EuiFieldText
          disabled
          name='edit-id-field'
          value={id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
        />
      </EuiFormRow>
      <EuiFormRow label="Name">
        <EuiFieldText
          name='edit-name-field'
          defaultValue={name}
          onChange={(e) => setFormData({ ...dog, name: e.target.value })}
        />
      </EuiFormRow>

      <EuiFormRow label="Breed">
        <EuiFieldText
          name='edit-breed-field'
          defaultValue={breed}
          onChange={(e) => setFormData({ ...dog, breed: e.target.value })}
        />
      </EuiFormRow>
      <EuiFormRow label="Owner">
        <EuiFieldText
          name='edit-owner-field'
          defaultValue={owner}
          onChange={(e) => setFormData({ ...dog, owner: e.target.value })}
        />
      </EuiFormRow>

      <EuiFormRow label="Description">
        <EuiFieldText
          name='edit-description-field'
          defaultValue={description}
          onChange={(e) => setFormData({ ...dog, description: e.target.value })}
        />
      </EuiFormRow>

      <EuiFormRow label="Size">
        <EuiFieldText
          name='edit-size-field'
          defaultValue={size}
          onChange={(e) => setFormData({ ...dog, size: e.target.value })}
        />
      </EuiFormRow>

    </EuiForm>
  );

  if (type === 'edit') {
    return (
      <EuiModal css={css`padding: 1rem;`} onClose={() => onClose('cancel')}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Edit Dog</EuiModalHeaderTitle>
        </EuiModalHeader>
        {editForm}
        <EuiModalFooter>
          <EuiButtonEmpty onClick={() => onClose('cancel', id)}>Cancel</EuiButtonEmpty>
          <EuiButton disabled={isSubmitDisabled} type="submit" form={modalId} onClick={() => onClose('edit', id, formData)} fill>
            Save
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    )
  }

  if (type === 'delete') {
    return (
      <EuiConfirmModal
        title={`Delete ${name}?`}
        onCancel={() => onClose('cancel')}
        onConfirm={() => onClose('delete', id)}
        cancelButtonText="Go back"
        confirmButtonText="Delete Dog"
        buttonColor="danger"
        defaultFocusedButton="confirm"
      >
        <p>{`Are you sure you want to delete ${name}?`}</p>
      </EuiConfirmModal>
    )
  }

  return null;
}

export default DogModal;