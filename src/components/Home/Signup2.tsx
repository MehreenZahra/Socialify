import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomInput from '../textInputs/CustomInput';
import CustomSelect from '../textInputs/CustomSelect';
import './Signup2.css';

interface FormData {
  email: string;
  password: string;
  name: string;
  dob: string;
  gender: string;
  interests: string[];
  comments: string;
}

const Signup2: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    dob: '',
    gender: '',
    interests: [],
    comments: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: keyof FormData) => (value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const interestOptions = [
    { value: 'sports', label: 'Sports' },
    { value: 'music', label: 'Music' },
    { value: 'movies', label: 'Movies' },
    { value: 'books', label: 'Books' },
    { value: 'travel', label: 'Travel' },
    { value: 'gardening', label: 'Gardening' },
    { value: 'coding', label: 'Coding' }
  ];

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2>Signup</h2>
        <form className="signup-form">
          <CustomInput
            type="text"
            label="Name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange('name')}
          />
          <CustomInput
            type="email"
            label="Email"
            placeholder='john@gmail.com'
            value={formData.email}
            onChange={handleInputChange('email')}
          />
          <CustomInput
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder='*********'
            value={formData.password}
            onChange={handleInputChange('password')}
            icon={showPassword ? "👁️" : "👁️‍🗨️"}
            onIconClick={togglePasswordVisibility}
          />
          <CustomInput
            type="date"
            label="Date of Birth"
            value={formData.dob}
            onChange={handleInputChange('dob')}
            placeholder="dd/mm/yyyy"
          />
          <CustomSelect
            label="Gender"
            options={genderOptions}
            value={formData.gender}
            onChange={handleInputChange('gender')}
          />
          <CustomSelect
            label="Interests"
            options={interestOptions}
            value={formData.interests}
            onChange={handleInputChange('interests')}
            multiple={true}
            fieldName="interests"
          />
          <CustomInput
            type="textarea"
            label="Comments"
            value={formData.comments}
            onChange={handleInputChange('comments')}
            rows={4}
          />
          <button className="signup-button" type="submit">SIGNUP</button>
        </form>
        <div className="login-link">
          <Link to="/">Already have an Account?</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup2;