import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./contactForm.css"
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
    setIsSubmitted(true);
    navigate('/second-page');
  };

  return (
    <div className="form-container">
      {isSubmitted ? (
        <div className="thank-you-message">
          <h2>Thank you for submitting the form!</h2>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
