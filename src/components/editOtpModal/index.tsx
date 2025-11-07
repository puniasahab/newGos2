import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import OtpInput from './OtpInput';
import { otpApis } from '../../api';
import { setOpenModal } from '../../screens/profile/ProfileSlice';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';


interface OtpModalProps {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    tabSelected?: 'phone' | 'email';
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

const handleModalClose = (dispatch: any) => {
    dispatch(setOpenModal(false));
}


const EditOtpModal: React.FC<OtpModalProps> = ({ tabSelected }) => {
    const dispatch = useAppDispatch();
    const {openModal, userProfile } = useAppSelector((state) => state.profile);
    // const navigate = useNavigate();
    const { phone, email } = userProfile;
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    
    const handleOtpSubmit = async (otp: string) => {
        try {
            const response =   tabSelected === "email" ? await otpApis.verifyEmailOtp(email, otp) : await otpApis.verifyMobileOtp(phone, otp);
            if (response.success) {
                // Handle successful OTP verification for editing profile
                dispatch(setOpenModal(false));
            } else {
                setShowErrorMessage(true);
                setTimeout(() => {
                    setShowErrorMessage(false);
                }, 5000);
            }
        } catch (error) {
            setShowErrorMessage(true);
        }
    };
    const handleOtpSend = async (phoneOrEmail: string) => {
        try {
            const response = await otpApis.sendMobileOtp(phoneOrEmail);
            if (response.success) {
                setShowSuccessMessage(true);
                setCanResend(false);
                setTimer(30);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
        }
    }


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
            <Typography sx = {{textAlign: 'center', fontSize: '14px', color: '#666'}}>We have sent a code to <strong>{tabSelected === 'phone' ? phone : email}</strong></Typography>

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
                    handleOtpSubmit(otp);
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
                  onClick={handleOtpSend.bind(null, tabSelected === 'phone' ? phone : email)}
                >
                  Resend OTP
                </Typography>
              )}
            </div>
          
        </Box>
      </Modal>
    );    
}

export default EditOtpModal;
