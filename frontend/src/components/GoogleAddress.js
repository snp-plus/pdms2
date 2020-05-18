import React from 'react';
import $ from 'jquery';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Input } from 'reactstrap';
import { classnames } from '../utils/helpers.js';

// const google = window.google;

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.autocomplete = null;
    this.google = window.google;
  }
  
  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = selected => {
    const { setAddress, setCity, setState, setLatitude, setLongitude, setCounty, setZip } = this.props.setFunc;
    const { setInputAddress, changeDivState } = this.props;
    const address = selected;

    let latitude, longitude;
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0])
      )
      .then(({ lat, lng }) => {
        latitude = lat;
        longitude = lng;

        const realAddress = address.split(',');
        console.log("real -->", realAddress)
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDDN7gt1rPdo6InIWrZ9cUlEDt07hfUxBw&libraries`;
        fetch(url)
          .then(res => res.json())
          .then(result => {
            if(result.status === "OK") {
              console.log("*&*&*&", result.results[0])
              result.results[0].address_components.map((val) => {
                if(val.types[0] === 'postal_code') {
                  const zip = val.long_name;
                  setZip(zip);
                }
                if(val.types[0] === 'administrative_area_level_2') {
                  const county = val.long_name;
                  setCounty(county.replace("County", "").toUpperCase());
                }
                if(val.types[0] === 'administrative_area_level_1') {
                  const state = val.short_name;
                  setState(state);
                }
                if(val.types[0] === "locality") {
                  const city = val.long_name;
                  setCity(city.toUpperCase());
                }
                let street_number = "", route = "";
                if(val.types[0] === "street_number") {
                  street_number = val.long_name;
                }
                if(val.types[0] === "route") {
                  route = val.long_name;
                }
                setAddress((street_number + route).toUpperCase());
              })
              
              setAddress(realAddress[0].toUpperCase());
              setInputAddress(realAddress[0].toUpperCase());
              // setCity(realAddress[1].toUpperCase());
              // setState(realAddress[2].toUpperCase());
              setLatitude(latitude);
              setLongitude(longitude);
            }
          })        
      })
      .catch(error => {
        console.log('error', error); // eslint-disable-line no-console
      });
      changeDivState();
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };


  render() {
    const { address } = this.state;

    return (
      <div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            if(suggestions.length > 0) {
              $("Demo__autocomplete-container").css ({
                "position": "absolute",  
                "height": `${30*suggestions.length}px`,
                "border": "0"
              }) 
            }

            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <Input bsSize="sm"
                    {...getInputProps({
                      placeholder: 'Input Address ...',
                      className: 'Demo__search-input1',                      
                    })}
                  />
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {
                    suggestions.map(suggestion => {
                      const className = classnames('Demo__suggestion-item', {
                        'Demo__suggestion-item--active': suggestion.active,
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                          style={{background: 'white', border: 'solid 1px rgb(189, 195, 199)'}}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>        
      </div>
    );
  }
}

export default LocationSearchInput;