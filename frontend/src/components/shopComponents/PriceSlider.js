// import { Slider, Typography } from "@mui/material";
// import { useState } from "react";

// export default function PriceSlider({ value, onChange, min, max }) {
//     const handleChange = (event, newValue) => {
//         onChange(newValue);
//     };

//     return (
//         <div className="w-full px-4">
//             <Typography gutterBottom >
//                 <span className="mb-2 font-poppins font-semibold text-[18px] sm:text-[20px] md:text-[20px] lg:text-[22px] text-mainBlue">Filter by Price:
//                     <span className="font-poppins font-bold text-[20px] sm:text-[22px] md:text-[24px] lg:text-[30px] text-subBlue ml-4">${value[0]} - ${value[1]}</span>
//                 </span>
//             </Typography>
//             <Slider
//                 className="mt-8"
//                 value={value}
//                 onChange={handleChange}
//                 valueLabelDisplay="auto"
//                 min={min}
//                 max={max}
//                 step={1}
//                 sx={{ color: '#1E2A38' }}
//             />
//         </div>
//     );
// }

import { Slider, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function PriceSlider({ value, onChangeComplete, min, max }) {
    // Internal state to track slider position while dragging
    const [localValue, setLocalValue] = useState(value);

    // Sync internal state if parent value changes externally
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (event, newValue) => {
        setLocalValue(newValue);  // update local state during drag for smooth UI
    };

    const handleChangeCommitted = (event, newValue) => {
        onChangeComplete(newValue);  // only update parent on drag release
    };

    return (
        <div className="w-full px-4">
            <Typography gutterBottom>
                <span className="mb-2 font-poppins font-semibold text-[18px] sm:text-[20px] md:text-[20px] lg:text-[22px] text-mainBlue">
                    Filter by Price:
                    <span className="font-poppins font-bold text-[20px] sm:text-[22px] md:text-[24px] lg:text-[30px] text-subBlue ml-4">
                        ${localValue[0]} - ${localValue[1]}
                    </span>
                </span>
            </Typography>
            <Slider
                className="mt-8"
                value={localValue}
                onChange={handleChange}  // updates local state on drag
                onChangeCommitted={handleChangeCommitted}  // updates parent on release
                valueLabelDisplay="auto"
                min={min}
                max={max}
                step={1}
                sx={{ color: '#1E2A38' }}
            />
        </div>
    );
}
