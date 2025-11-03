import React, { useState, useRef } from 'react';

interface OtpInputProps {
  numInputs?: number;
  onComplete: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ numInputs = 4, onComplete }) => {
  const [otp, setOtp] = useState(new Array(numInputs).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.currentTarget.value;
    if (isNaN(Number(value))) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < numInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete if all digits are entered
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', margin: '0 auto'}}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => { inputRefs.current[index] = el; }}
          style={{ width: '40px', height: '40px', textAlign: 'center', fontSize: '20px', border: 'none', borderBottom: '2px solid #930000', outline: 'none', backgroundColor: 'transparent', color: 'black' }}
        />
      ))}
    </div>
  );
};

export default OtpInput;