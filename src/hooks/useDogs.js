import { useState } from "react";
import initDogs from '../dogs';

const useDogs = () => {
    const [dogs, setDogs] = useState(initDogs);
    // const [sortedDogs, setSortedDogs] = useState([]);


    const editDogProperties = (id, value) => {
        const editedDogs = [...dogs];
        const idx = editedDogs.findIndex(dog => dog.id === id);
        editedDogs[idx] = value;
        //TODO set sorted if sort has been applied
        setDogs(editedDogs);
    }

    const sortDogs = (id) => {
        const newDogs = [...dogs];
        const sortMethod = {
            'sorted-asc': (a,b) => {
                const formatAName = a.name.toLowerCase();
                const formatBName = b.name.toLowerCase();
                if (formatAName === formatBName) {
                    return 0;
                }
    
                return formatAName> formatBName ? 1 : -1
            },
            'sorted-desc': (a,b) => {
                const formatAName = a.name.toLowerCase();
                const formatBName = b.name.toLowerCase();

                if (formatAName === formatBName) {
                    return 0;
                }
    
                return formatAName > formatBName ? -1 : 1
            }
        }

        const sortFunction = sortMethod[id] ? sortMethod[id] : sortMethod['sorted-asc-1'];

        newDogs.sort(sortFunction);
        setDogs(newDogs);
    }

    const deleteDog = (id) => {
        const editedDogs = [...dogs];
        const idx = editedDogs.findIndex(dog => dog.id === id);
        editedDogs.splice(idx, 1);
        setDogs(editedDogs);
    }
    const isUniqueId = (newId) => {
        const ids = Object.values(dogs).reduce((acc, dog) => {
            acc.push(dog.id);
            return acc;
        }, []);

        const foundId = ids.find(id => id === newId);

        return !Boolean(foundId);
    }
    const addDog = (formData) => {
        // TODO provide error for collision of id's/form validation
        if (isUniqueId(formData.id)) {
            const newDogs =  [...dogs, formData]
            //TODO set sorted if sort has been applied
            setDogs(newDogs);
        }
    }

    return [
        dogs,
        editDogProperties,
        deleteDog,
        addDog,
        sortDogs,
    ]
}

export default useDogs;