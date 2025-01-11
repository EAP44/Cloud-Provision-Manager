import React from "react";

export default function SearchRes({ searchResults, handleResultClick }) {
    const SearchResultStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '5px',
        borderBottom: '1px solid #ccc'
    };

    const NameStyle = {
        marginLeft: '2px',
        marginBottom: '4px',
        fontSize: '14px',
        color: '#202124',
        cursor: 'pointer',
    };

    const EmailStyle = {
        marginLeft: '5px',
        fontSize: '13px',
        color: '#555555',
    };

    const SearchResLisStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '5px',
        border: 'none',
        backgroundColor: '#EEEEEE',
    };

    const handleAddToInput = (value) => {
        handleResultClick(value);
    };

    return (
        <div className="SearchResList" style={SearchResLisStyle}>
            {searchResults.slice(0, 3).map((result, index) => (
                <div key={index} style={SearchResultStyle} onClick={() => handleAddToInput(result.name)}>
                    <span style={NameStyle}>{result.name}</span>
                    <span style={EmailStyle}>{result.email}</span>
                    <span style={EmailStyle}>{result.provider}</span>
                </div>
            ))}
            {searchResults.length > 3 && (
                <div style={{ marginTop: '5px', textAlign: 'center', color: 'gray' }}>
                    + {searchResults.length - 3} more results
                </div>
            )}
        </div>
    );
}

