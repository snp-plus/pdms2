import React from 'react';
import $ from 'jquery';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { classnames } from '../utils/helpers.js';
import { dev_url } from '../utils/url';
import { DebounceInput } from 'react-debounce-input';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.google = window.google;
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = selected => {
    const { params, changeAddress, changeState, oldAddress } = this.props;
    const address = selected;
    let latitude, longitude;

    geocodeByAddress(selected)
      .then(res => getLatLng(res[0])
      )
      .then(({ lat, lng }) => {
        latitude = lat;
        longitude = lng;
        
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDDN7gt1rPdo6InIWrZ9cUlEDt07hfUxBw&libraries`;
        fetch(url)
        .then(res => res.json())
        .then(result => {
          if(result.state === "OK") {
            result.result[0].address_components.map(val => {
              if(val.types[0] === 'postal_code') {
                params.data.zip = val.long_name.replace('County', '').toUpperCase();
              }
              if(val.types[0] === 'administrative_area_level_2') {
                params.data.county = val.long_name;
              }
              if(val.types[0] === 'administrative_area_level_1') {
                params.data.state = val.short_name;
              }
              if(val.types[0] === 'locality') {
                params.data.city = val.long_name.toUpperCase();
              }
              
              let street_number = '', route = '';              
              if(val.types[0] === 'street_number') {
                street_number = val.long_name;
              }
              if(val.types[0] === 'route') {
                route = val.long_name;
              }
              params.data.address = (street_number + route).toUpperCase();
            })
          }
        })


        // params.data.address = realAddress[0];
        // params.data.city = realAddress[1];
        // params.data.state = realAddress[2];
        params.data.longitude = longitude;
        params.data.latitude = latitude;
        console.log(")))", params.data);
        const json = JSON.stringify(params.data);
        const httpRequest = new XMLHttpRequest();
        httpRequest.open(
          "PUT",
          `${dev_url}/api/updateData`,
          true
        );
        httpRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
        httpRequest.setRequestHeader('Authorization',localStorage.getItem('token'));
        httpRequest.send(json);
        params.api.purgeServerSideCache();
      })
      .catch(error => {
        console.log('error', error); // eslint-disable-line no-console
      });
      changeAddress();
      changeState();
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

  recover = () => {
    console.log("jao;fjfds;")
    this.props.changeState();
  }

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
              $("div[col-id='address'].ag-cell-focus").css ({
                "position": "absolute",  
                "height": `${30*suggestions.length}px`,
                "border": "0"
              }) 
            }

            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <DebounceInput 
                    debounceTimeout={1000}
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'Demo__search-input2',                      
                    })}                    
                    onBlur={this.recover}
                    autoFocus
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