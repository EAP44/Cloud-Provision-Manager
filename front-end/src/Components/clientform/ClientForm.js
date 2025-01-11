import { useEffect, useState } from "react";
import { axiosClient } from "../../API/axios";
import SearchInput from "./SearchBar/SearchInput";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Add } from "../../Redux/Action";

export default function ChooseClient() {
  const [ClientSelected, setClientSelected] = useState(null);
  const [ServiceSelected, setServiceSelected] = useState(null);
  const [Client, setClient] = useState([]);
  const [Service, setService] = useState([]);
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  const Dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosClient.get("/api/client");
      setClient(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosClient.get("/api/service");
      setService(data);
    };
    fetchData();
  }, []);

  const Send = async () => {
    if(ClientSelected && ServiceSelected){
      console.log(ClientSelected,ServiceSelected);
      Dispatch(Add({ client_id: ClientSelected, service_id: ServiceSelected }));
      Navigate("/enter-infos");
    }else{
      setError("Please fill in all required fields.");
    }
  };

  return (
    <div className="ChooseClient-container">
      <h2 className="text-center">Choose Client</h2>
      <form>
        <label>Choose Client</label>
        <SearchInput placeholder="Choose Client..." searchData={Client} Selected={setClientSelected} icon='bi bi-person'iconadd='bi bi-person-add' path='/add-client'/>

        <label>Choose Service</label>
        <SearchInput placeholder="Select Service..." searchData={Service} Selected={setServiceSelected} icon='bi bi-cloud-check'iconadd='bi bi-cloud-plus' path='/add-service'/>

        {error && <p className="error-message text-danger">{error}</p>}
        <button type="button" className="Continue-button" onClick={Send}>Continue</button>
      </form>
    </div>
  );
}
