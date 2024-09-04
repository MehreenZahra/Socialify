import React, { useState } from 'react';
import CustomInput from '../textInputs/CustomInput';
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

  const handleInputChange = (field: keyof FormData) => (value: string | string[]) => {
    setFormData(prev => {
      if (field === 'interests') {
        const newInterests = Array.isArray(value) ? value : [value];
        return { ...prev, [field]: newInterests };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleInterestsChange = (value: string | string[]) => {
    setFormData(prev => {
      const updatedInterests = Array.isArray(value)
        ? value
        : prev.interests.includes(value)
          ? prev.interests.filter(interest => interest !== value)
          : [...prev.interests, value];
      return { ...prev, interests: updatedInterests };
    });
  };

  return (
    <div className="rightbar">
      <div className="login-container">
        <h2>Signup</h2>
        <form className="login-form">
          <div className="form-group">
            <CustomInput
              type="text"
              label="Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange('name')}
            />
          </div>
          <div className="form-group">
            <CustomInput
              type="email"
              label="Email"
              placeholder='john@gmail.com'
              value={formData.email}
              onChange={handleInputChange('email')}
            />
          </div>
          <div className="form-group">
            <CustomInput
              placeholder='*********'
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange('password')}
            />
          </div>
          <div className="form-group">
            <CustomInput
              type="date"
              label="Date of Birth"
              value={formData.dob}
              onChange={handleInputChange('dob')}
            />
          </div>
          <div className="form-group">
            <CustomInput
              type="select"
              label="Gender"
              value={formData.gender}
              onChange={handleInputChange('gender')}
              options={['Male', 'Female', 'Other']}
            />
          </div>
          <div className="form-group">
            <CustomInput
              type="select"
              label=""
              value={formData.interests}
              onChange={(value) => handleInputChange('interests')(value)}
              options={['Sports', 'Music', 'Movies', 'Books', 'Travel', 'Gardening', 'Coding']}
              multiple={true}
            />
          </div>
          {/* <div className="selected-interests">
            <p>Selected Interests:</p>
            <ul>
              {formData.interests.map(interest => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div> */}
          <div className="form-group">
            <CustomInput
              type="textarea"
              label="Comments"
              value={formData.comments}
              onChange={handleInputChange('comments')}
              multiline
              rows={4}
            />
          </div>
          <button className="login-button">SIGNUP</button>
        </form>
        <div className="forgot-password">
          <a href="#">Already have Account?</a>
        </div>
      </div>
    </div>
  );
};

export default Signup2;