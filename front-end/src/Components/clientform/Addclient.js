import React, { useState } from "react";
import { axiosClient } from "../../API/axios";
import { useNavigate } from "react-router";

export default function AddClient() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState("+212");
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: '' });
    if (name === 'name') setName(value);
    else if (name === 'company') setCompany(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'phone') setPhone(value);
    else if (name === 'address') setAddress(value);
  };

  const addClient = async () => {
    try {
      const newErrors = {};
      if (!name.trim()) newErrors.name = 'Name is required.';
      if (!company.trim()) newErrors.company = 'Company is required.';
      if (!email.trim()) newErrors.email = 'Email is required.';
      else if (!validateEmail(email)) newErrors.email = 'Invalid email format.';
      if (!phone.trim()) newErrors.phone = 'Phone number is required.';
      if (!address.trim()) newErrors.address = 'Address is required.';
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      const data = {
        name:name,
        company:company,
        email:[email],
        phone_number: `(${phoneCode})-${phone}`,
        address:address,
      };
      const response = await axiosClient.post('/api/client', data);
      if (response.status === 201) {
        navigate('/choose-client');
      }
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="addclient-container">
      <h2 className="text-center">Add Client</h2>
      <form>
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" value={name} onChange={handleInputChange} />
          {errors.name && <p className="error-message text-danger">{errors.name}</p>}
          <label>Company</label>
          <input type="text" name="company" placeholder="Company" value={company} onChange={handleInputChange} />
          {errors.company && <p className="error-message text-danger">{errors.company}</p>}
          <label>Email</label>
          <input type="text" name="email" placeholder="Email" value={email} onChange={handleInputChange} />
          {errors.email && <p className="error-message text-danger">{errors.email}</p>}
          <label>Phone Number</label>
          <div className="input-group">
            <select className="country-code" value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}>
              <option>+212</option>
            </select>
            <input type="text" name="phone" placeholder="Phone Number" value={phone} onChange={handleInputChange} />
          </div>
          {errors.phone && <p className="error-message text-danger">{errors.phone}</p>}
          <label>Address</label>
          <input type="text" name="address" placeholder="Address" value={address} onChange={handleInputChange} />
          {errors.address && <p className="error-message text-danger">{errors.address}</p>}
        <button type="button" className="send-button" onClick={addClient}>Add Client</button>
      </form>
    </div>
  );
}
