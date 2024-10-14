import React, { useState } from 'react';
import { db } from '../../Database/FireBaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const AddCardForm = ({ uid }) => {
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Add card details to Firestore under a "cards" collection
      await addDoc(collection(db, 'cards'), {
        userId: uid,
        cardholderName: formData.cardholderName,
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        createdAt: new Date() // Optionally store the time the card was added
      });

      console.log('Card details added successfully');
      setFormData({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      });
    } catch (error) {
      console.error('Error adding card details:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-card-form">
      <h2>Add Card Details</h2>

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
