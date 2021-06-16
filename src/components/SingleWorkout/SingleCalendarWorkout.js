import React, {Fragment, useState} from 'react';
import { StyledDelete } from '../UI/Wrappers/Wrappers';
import DeleteWorkout from './DeleteWorkout';

const SingleCalendarWorkout = ({item}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    return (
        <Fragment>
            {item.name} - {" "}{new Date(item.date).toTimeString().slice(0, 5)}
            <StyledDelete onClick={() => setIsDeleting(true)} />
            <DeleteWorkout show={isDeleting} close={() => setIsDeleting(false)} item={item} />
        </Fragment>
    )
}

export default SingleCalendarWorkout
