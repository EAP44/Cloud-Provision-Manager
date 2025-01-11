import { useNavigate } from "react-router";
import SearchRes from "./SearchRes";
import { useEffect, useState } from "react";

export default function SearchInput({ placeholder, searchData, Selected, icon, iconadd, path }) {
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const matchedData = searchData.find((item) => item.name.toLowerCase() === input.toLowerCase());
        Selected(matchedData ? matchedData.service_id ||matchedData.client_id  : null);
    }, [input, searchData, Selected]);

    const handleResultClick = (value) => {
        setInput(value);
        setSearchResults([]);
    };

    const handleInputChange = (value) => {
        const lowerCaseInput = value.toLowerCase();
        setInput(value);
        const results = searchData.filter((element) => {
            return element.name && element.name.toLowerCase().includes(lowerCaseInput);
        });
        setSearchResults(results);
    };

    const SearchInputStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '880px',
        marginTop: '15px',
        padding: '5px',
        borderRadius: '4px',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
        border: 'none',
        backgroundColor: '#EEEEEE'
    };

    const InputContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        marginBottom: '0px'
    };

    const inputStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        height: '100%',
        fontSize: '1rem',
        flex: '1',
        marginLeft: '5px',
        outline: 'none'
    };

    const iconStyle = {
        borderLeft: '1px solid #ccc',
        padding: '5px',
        cursor: 'pointer'
    };

    return (
        <div className="SearchInput" style={SearchInputStyle}>
            <div style={InputContainerStyle}>
                <i className={icon}></i>
                <input 
                    placeholder={placeholder} 
                    style={inputStyle} 
                    value={input} 
                    onChange={(e) => handleInputChange(e.target.value)} 
                    required
                />
                <i className={iconadd} style={iconStyle} onClick={() => navigate(path)}></i>
            </div>
            <SearchRes searchResults={searchResults} handleResultClick={handleResultClick} />
        </div>
    );
}
