/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// eslint-disable-next-line react/prop-types
export default function InputFileUpload( {selectedCourse} ) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isFileLoaded, setIsFileLoaded] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    setIsFileLoaded(true);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('evidence_image', selectedFile);

    const token = localStorage.getItem('token');

    const HomePageRandomPathURL = `http://localhost:4000/evidence?name=${encodeURIComponent(selectedCourse)}`;

    const response = await fetch(HomePageRandomPathURL, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  
    if (!response.ok) {
      console.error('Error uploading file:', response.statusText);
    } else {
      alert('File uploaded successfully');
      window.location.reload();
    }
  };


  return (
    <div>
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            Upload file
            <VisuallyHiddenInput type="file" accept = ".png, .jpg. jpeg" onChange={handleFileChange} />
        </Button>
        {fileName && <p>Archivo cargado: {fileName}</p>}
        {isFileLoaded && selectedCourse.length === 0 && <p>Favor de seleccionar curso</p>}
        {isFileLoaded && selectedCourse.length > 0 &&(
            <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            >
            Submit file
            </Button>
        )}
        </div>
  );
}