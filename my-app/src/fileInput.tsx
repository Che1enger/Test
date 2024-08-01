import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FileInputWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'stretch',
});

const UploadButton = styled(Button)({
  borderRadius: '4px 0 0 4px',
  border: '1px solid black',
  padding: '14px 15px',
  minWidth: '83px',
  textTransform: 'none',
  fontWeight: 'normal',
  color: 'black',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#000000',
    color: 'white',
  },
});

const FileNameDisplay = styled(Typography)({
  flexGrow: 1,
  padding: '14px 10px',
  textAlign: 'left',
  border: '1px solid #D0CFCF',
  borderLeft: 'none',
  borderRadius: '0 4px 4px 0',
  color: '#7E7E7E',
  backgroundColor: 'white',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const HiddenInput = styled('input')({
  display: 'none',
});

interface CustomFileInputProps {
  onChange: (file: File | null) => void;
  error?: string;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({ onChange, error }) => {
  const [fileName, setFileName] = useState('Upload your photo');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange(file);
    } else {
      setFileName('Upload your photo');
      onChange(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <FileInputWrapper>
        <UploadButton onClick={handleButtonClick}>
          Upload
          <HiddenInput
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg,.jpeg"
          />
        </UploadButton>
        <FileNameDisplay>{fileName}</FileNameDisplay>
      </FileInputWrapper>
      {error && (
        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default CustomFileInput;
