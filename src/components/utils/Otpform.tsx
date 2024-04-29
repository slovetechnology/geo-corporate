
import React, { useRef, useState } from 'react'

type Props = {
}
export default function Otpform () {
  const [pinParts, setPinParts] = useState(['', '', '', '']);
  const inputRefs = useRef<any>([]);

//   const handleSubmission = () => {
//     //after validating all fields
//     let values = ''
//     pinParts.map((ele) => {
//       values += ele
//     })
//     continueSetup(values) //pass in the data values
//   }

  const handleInputChange = (index: number, value: string) => {
    const newPinParts = [...pinParts];
    newPinParts[index] = value;

    if (index < 3 && value !== '') {
      inputRefs.current[index + 1].focus();
    }

    setPinParts(newPinParts);
  };

  const handleInputBackspace = (index: number, event: {key: string}) => {
    if (event.key === 'Backspace' && index > 0 && pinParts[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (event: any) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text/plain').slice(0, 6);
    const newPinParts = pastedText.split('').concat(['', '', '', '']).slice(0, 6);
    setPinParts(newPinParts);

    for (let i = 0; i < newPinParts.length; i++) {
      if (newPinParts[i]) {
        inputRefs.current[i].value = newPinParts[i];
        if (i < 5) {
          inputRefs.current[i + 1].focus();
        }
      }
    }
  };



  return (
    <div>
      <div className='grid grid-cols-4 gap-7'>
        {pinParts.map((part, index) => (
          <input
            key={index}
            type="password"
            maxLength={1}
            className='input h-20'
            defaultValue={part}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleInputBackspace(index, e)}
            ref={(input) => (inputRefs.current[index] = input)}
            onPaste={(e) => handlePaste(e)}
          />
        ))}
      </div>
    </div>
  )
}

