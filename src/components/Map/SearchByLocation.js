import React, { useState } from "react";
import { TextField, List, ListItem, ListItemButton } from "@mui/material";
import axios from "axios";

const NominatimBaseURL = "https://nominatim.openstreetmap.org/search";

const SearchByLocation = ({ onAddPoint }) => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Function to handle the search input change
  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(NominatimBaseURL, {
          params: {
            q: value,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Function to handle the selection of a suggestion
  const handleSelectSuggestion = (location) => {
    const { lat, lon, display_name } = location;
    onAddPoint({ name: display_name, lat: parseFloat(lat), lng: parseFloat(lon) });
    setSearchValue("");
    setSuggestions([]);
  };

  return (
    <div>
      <TextField
        label="Search Location"
        variant="outlined"
        fullWidth
        value={searchValue}
        onChange={handleSearchChange}
      />
      {suggestions.length > 0 && (
        <List>
          {suggestions.map((location, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={() => handleSelectSuggestion(location)}>
                {location.display_name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default SearchByLocation;
