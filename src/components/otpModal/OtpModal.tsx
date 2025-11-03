import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
 import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setOpenModal } from "../../screens/login/LoginSlice"
import OtpInput from './OtpInput';
import { loginApis } from '../../api';
import { useNavigate } from 'react-router-dom';
// import { setTotalTimeTakenForFastestFinger } from '../../utils/commonFunctions';
// import { t } from 'i18next';

interface OtpModalProps {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;

}

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '32px',
};




// import { AppDispatch } from '../../hooks/redux';

const handleModalClose = (dispatch: any) => {
    dispatch(setOpenModal(false));
}

const OtpModal: React.FC<OtpModalProps> = () => {
    const dispatch = useAppDispatch();
    const { phoneNumber, openModal } = useAppSelector((state) => state.login);
    const navigate = useNavigate();
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    
    useEffect(() => {
        let interval: number;
        if (openModal && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [openModal, timer]);

    // const handleResendOtp = () => {
    //     if (canResend) {
    //         // Add your resend OTP logic here
    //         console.log('Resending OTP to:', phoneNumber);
    //         // Reset timer
    //         setTimer(30);
    //         setCanResend(false);
    //     }
    // };
    
    const handleOtpSubmit = async (otp: string, phone: string) => {
        try {
            // Clear any existing error messages when submitting
            setShowErrorMessage(false);
            
            loginApis.verifyOtp(phone, otp)
                .then((response: any) => {
                    if (response.success) {
                        // alert('OTP verified successfully: ' + response.message);
                        // Handle successful OTP verification, e.g., navigate to the next screen
                        dispatch(setOpenModal(false));
                        // Navigate to the next screen or show success message
                        // setTotalTimeTakenForFastestFinger('0');
                        navigate("/home")
                    } else {
                        // Show error message instead of redirecting
                        setShowErrorMessage(true);
                        console.error('Failed to verify OTP:', response.message);
                        navigate("/login");
                        
                        // Hide error message after 5 seconds
                        setTimeout(() => {
                            setShowErrorMessage(false);
                        }, 5000);
                    }
                })
                .catch((error: any) => {
                    setShowErrorMessage(true);
                    console.error('Error verifying OTP:', error);
                    
                    // Hide error message after 5 seconds
                    setTimeout(() => {
                        setShowErrorMessage(false);
                    }, 5000);
                });
        }
        catch(error) {
            setShowErrorMessage(true);
            console.error('Error in OTP submission:', error);
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 5000);
        }
    }

    const handleOtpSend = async (phone: string | null) => {
        try {
            const response = await loginApis.sendOtp(phone, '', '');
            if (response.success) {
                setShowSuccessMessage(true);
                setTimer(30);
                setCanResend(false);
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
                
                // Navigate to OTP verification screen or show success message
            } else {
                console.error('Failed to send OTP:', response.message);
            }
        } catch (error) {
            console.error('Error in sending OTP:', error);
        }
    }

    return (
        <Modal
            open={openModal}
            onClose={() => handleModalClose(dispatch)}
            aria-labelledby="otp-modal-title"
            aria-describedby="otp-modal-description"
            
        >
           <Box sx = {style}>
            <IconButton
              aria-label="close"
              onClick={handleModalClose.bind(null, dispatch)}
              sx={{
                position: 'absolute',
                right: 2,
                top: 2,
                color: (theme: any) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx = {{textAlign: 'center', color: '#930000', fontWeight: 'bold', fontSize: '22px'}}>Enter OTP</Typography>
            <Typography sx = {{textAlign: 'center', fontSize: '14px', color: '#666'}}>We have sent a code to<strong>{phoneNumber}</strong></Typography>

            {showSuccessMessage && (
                <Typography sx={{ 
                    textAlign: 'center', 
                    fontSize: '14px', 
                    color: '#28a745', 
                    marginTop: '10px',
                    fontWeight: 'bold'
                }}>
                    OTP Sent Successfully
                </Typography>
            )}
            
            {showErrorMessage && (
                <Typography sx={{ 
                    textAlign: 'center', 
                    fontSize: '14px', 
                    color: '#dc3545', 
                    marginTop: '10px',
                    fontWeight: 'bold'
                }}>
                    Invalid OTP
                </Typography>
            )}
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <OtpInput
                numInputs={4}
                onComplete={(otp) => {
                    handleOtpSubmit(otp, phoneNumber)
                }}
              />
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              {!canResend ? (
                <Typography sx={{ fontSize: '14px', color: '#666' }}>
                  Resend code in {timer} seconds
                </Typography>
              ) : (
                <Typography 
                  sx={{ 
                    fontSize: '14px', 
                    color: '#4A90E2', 
                    cursor: 'pointer',

                    // textDecoration: 'underline'
                  }}
                  onClick={handleOtpSend.bind(null, phoneNumber)}
                >
                  Resend OTP
                </Typography>
              )}
            </div>
          
        </Box>
      </Modal>
    );
};

export default OtpModal;