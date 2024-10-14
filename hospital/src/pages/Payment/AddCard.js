import React, { useState } from 'react';

const AddCardForm = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Card Details Submitted: ', formData);
    // Add logic to process the card details
  };

  return (
    <form onSubmit={handleSubmit} className="add-card-form">
      <h2>Add Card Details</h2>

      {/* Cardholder Name */}
      <div className="form-group">
        <label htmlFor="cardholderName">Cardholder Name</label>
        <input
          type="text"
          id="cardholderName"
          name="cardholderName"
          value={formData.cardholderName}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Card Number */}
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          maxLength="16"
          required
        />
      </div>

      {/* Expiration Date */}
      <div className="form-group">
        <label htmlFor="expiryDate">Expiration Date</label>
        <input
          type="month"
          id="expiryDate"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* CVV */}
      <div className="form-group">
        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={formData.cvv}
          onChange={handleInputChange}
          maxLength="3"
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddCardForm;
