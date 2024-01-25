
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { NairaSign } from './functions';

function valuetext(value) {
    return `${value}`;
}

export default function MainPriceRanger({ minprice, maxprice, handlePrice }) {
    const [value, setValue] = React.useState([minprice, maxprice]);

    const handleChange = (event) => {
        setValue(event.target.value);
        handlePrice(event.target.value);
    };

    return (
        <div className="">
            <Box sx={{ width: '100%' }}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    max={maxprice}
                    min={minprice}
                />
            </Box>
            <div className="grid grid-cols-2 gap-3">
                <div className="">{NairaSign}{value[0]?.toLocaleString()}</div>
                <div className="w-fit ml-auto">{NairaSign}{value[1]?.toLocaleString()}</div>
            </div>
        </div>
    );
}