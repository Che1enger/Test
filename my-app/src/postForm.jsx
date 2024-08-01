import React, { useState, useEffect } from 'react';
import { getPositions, getToken, registerUser } from './apiHelpers.jsx';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputMask from 'react-input-mask';
import CustomFileInput from './fileInput.tsx'; 
import ButtonWithAction from "./buttonActive.tsx"; 
import './styles/postForm.css';
import successIcon from './img/success-image.svg';  

const SignupForm = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: '',
    photo: null
  });
  const [positions, setPositions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);  

  useEffect(() => {
    const loadPositions = async () => {
      const positionsData = await getPositions();
      setPositions(positionsData);
      if (positionsData.length > 0) {
        setFormData(prevState => ({
          ...prevState,
          position_id: positionsData[0].id.toString()
        }));
      }
    };
    loadPositions();
  }, []);

  useEffect(() => {
    const isValid = validateForm(false);
    setIsFormValid(isValid);
  }, [formData]);

  const validateForm = (showErrors = true) => {
    let errors = {};
    if (formData.name.trim().length < 2 || formData.name.trim().length > 60) {
      errors.name = "Name should be 2-60 characters long";
    }
    if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.email = "Invalid email";
    }
    if (!/^\+380\d{9}$/.test(formData.phone)) {
      errors.phone = "Phone should be in format +380XXXXXXXXX";
    }
    if (!formData.position_id) {
      errors.position_id = "Position is required";
    }
    if (!formData.photo) {
      errors.photo = "Photo is required";
    }

    if (showErrors) {
      setErrors(errors);
    }

    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (file) => {
    setFormData(prevState => ({
      ...prevState,
      photo: file
    }));
    if (file) {
      setErrors(prevErrors => ({ ...prevErrors, photo: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = await getToken();
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const data = await registerUser(formDataToSend, token);
      if (data.success) {
        setIsSubmitted(true);
        onUserAdded();
        setFormData({
          name: '',
          email: '',
          phone: '',
          position_id: positions[0].id.toString(),
          photo: null
        });
        setErrors({});
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    }
  };

  return (
    <section className="signup-section">
      <h2>Working with POST request</h2>
      {isSubmitted ? ( 
        <div className="success-message">
          <p>User successfully registered</p>
          <img src={successIcon} alt="Success" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="signup-form" id="signup-form">
          <TextField
            id="name"
            name="name"
            label="Your name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
          />
          <InputMask
            mask="+380999999999"
            value={formData.phone}
            onChange={handleChange}
          >
            {(inputProps) => (
              <TextField
                id="phone"
                name="phone"
                label="Phone"
                variant="outlined"
                fullWidth
                {...inputProps}
                error={!!errors.phone}
                helperText={errors.phone}
                margin="normal"
              />
            )}
          </InputMask>
          <FormControl component="fieldset" error={!!errors.position_id} margin="normal">
            <FormLabel component="legend">Select your position</FormLabel>
            <RadioGroup
              aria-label="position"
              name="position_id"
              value={formData.position_id}
              onChange={handleChange}
            >
              {positions.map((position) => (
                <FormControlLabel
                  key={position.id}
                  value={position.id.toString()}
                  control={<Radio />}
                  label={position.name}
                />
              ))}
            </RadioGroup>
            {errors.position_id && <p className="error">{errors.position_id}</p>}
          </FormControl>
          <CustomFileInput
            onChange={handleFileChange}
            error={errors.photo}
          />
          <div className="submit-container">
            <ButtonWithAction
              text="Sign up"
              type="submit"
              active={isFormValid}
            />
          </div>
          
          {errors.submit && <p className="error">{errors.submit}</p>}
        </form>
      )}
    </section>
  );
};

export default SignupForm;
