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

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600 Amphitheatre Parkway, Mountain View, CA&key=AIzaSyDDN7gt1rPdo6InIWrZ9cUlEDt07hfUxBw&libraries`;
        fetch(url)
          .then(res => res.json())
          .then(result => {
            if(result.status === "OK") {
              const county = result.results[0].address_components[4].long_name.replace("County", "");
              const zip = result.results[0].address_components[6].long_name;
              setCounty(county);
              setZip(zip);
              
              setAddress(realAddress[0].toUpperCase());
              setInputAddress(realAddress[0].toUpperCase());
              setCity(realAddress[1].toUpperCase());
              setState(realAddress[2].toUpperCase());
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
              console.log(">>>>", suggestions, getSuggestionItemProps)
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