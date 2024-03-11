import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './common.css';


// TODO: add getListing to get all listing information
const SuggestionsBox = (props) => {
   
    let [index, setIndex] = useState(0);

    let incrementIndex = () => {
        if((index + 1) === props.suggestions.length){
            setIndex(0);
        }else{
            setIndex(index + 1);
        }
    }

    return (<div className='suggestions-container'>
                <h3 className="column-header">Suggestions</h3>
                <p className='suggestions-paragraph'>{ props.suggestions[index] }</p>
                <Button variant="dark" onClick={() => incrementIndex()}>Next</Button>
            </div>
    );
}

export default SuggestionsBox;