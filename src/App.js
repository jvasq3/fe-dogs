
import { useMemo, useState } from 'react';

import { EuiSpacer, EuiPanel } from '@elastic/eui';
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

import './App.css';
import DogCard from './components/DogCard';
import DogFilters from './components/DogFilters';
import DogModal from './components/DogModal';

import useDogs from './hooks/useDogs';

const MODAL_TYPES = [
  'edit',
  'delete',
  'add'
];

function App() {

  const [dogs, editDogProperties, deleteDog, addDog, sortDogs] = useDogs();

  const [enabledAction, setEnabledAction] = useState({});

  // Used for the edit/delete modal. 
  const selectedDog = useMemo(() => {
    if(MODAL_TYPES.includes(enabledAction.type)) {
      return dogs.find(dog => dog.id === enabledAction.id)
    }
  }, [dogs, enabledAction.id, enabledAction.type])


  const filteredDogs = useMemo(() => {
    const { type, value, searchField } = enabledAction;

    if(type === 'search' && value) {
      return dogs.filter(dog => {
        return dog[searchField].search(value) > -1
      })
    }
  }, [dogs, enabledAction])

  const generatedDogsInView = useMemo(() => {
    let dogsInView = enabledAction.type === 'search' ? filteredDogs : dogs;

    return dogsInView.map(dog => {
      return (
        <DogCard onActionClick={(action) => setEnabledAction(action)} key={`${dog.id}-key`} {...dog} />
      )
    })
  }, [dogs, enabledAction.type, filteredDogs]) 

  const handleModalAction = (type, id, data) => {
    if(type === 'add') {
      addDog(data);
    }
    else if(type === 'edit') {
      editDogProperties(id, data)
    }
    else if(type === 'delete') {
      deleteDog(id)
    }

    setEnabledAction({});
  }

  return (
    <div className="App">
      {MODAL_TYPES.indexOf(enabledAction.type) > -1 ? <DogModal onClose={handleModalAction} {...enabledAction} dog={selectedDog} /> : null}
      <DogFilters sortDogs={sortDogs} setEnabledAction={setEnabledAction} searchValue={enabledAction.value ?? ''}/>
      <EuiSpacer/>
      <EuiPanel 
        hasShadow={false}
        hasBorder 
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
        `}
      >
        {generatedDogsInView}
      </EuiPanel>
    </div>
  );
}

export default App;
