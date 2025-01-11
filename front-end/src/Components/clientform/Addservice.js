import { useState } from "react";
import { useNavigate } from "react-router";
import { axiosClient } from "../../API/axios";

export default function Addservice() {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Provider, setProvider] = useState("");
  const [Storage, setStorage] = useState("");
  const [Price, setPrice] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addService = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      
      const data = {
        name: Name,
        description: Description,
        provider: Provider,
        storage: Storage,
        default_canva_mail:"R",
        price: Price,
      };
      const response = await axiosClient.post("/api/service", data);
      if (response.status === 201) {
        navigate("/choose-client");
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const validateForm = () => {
    if (!Name.trim() || !Price.trim()) {
      setError("Please fill in all required fields.");
      return false;
    }

    if (isNaN(parseFloat(Price))) {
      setError("Please enter a valid price.");
      return false;
    }

    setError("");
    return true;
  };

  return (
    <div className="addservice-container">
      <h2 className="text-center">Add Service</h2>
      <form>
        <label>Name</label>
        <input type="text" placeholder="Name" value={Name} onChange={(e) => setName(e.target.value)} />
        <label>Description</label>
        <input type="text" placeholder="Description" value={Description} onChange={(e) => setDescription(e.target.value)} />
        <label>Provider</label>
        <input type="text" placeholder="Provider" value={Provider} onChange={(e) => setProvider(e.target.value)} />
        <label>Storage</label>
        <input type="text" placeholder="Storage" value={Storage} onChange={(e) => setStorage(e.target.value)} />
        <label>Price</label>
        <input type="text" placeholder="Price" value={Price} onChange={(e) => setPrice(e.target.value)} />
        {error && <p className="error-message text-danger">{error}</p>}
        <button type="button" className="send-button" onClick={addService}>Add Service</button>
      </form>
    </div>
  );
}
