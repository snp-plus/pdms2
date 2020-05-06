import React from 'react';
import $ from 'jquery';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { classnames } from '../utils/helpers.js';
import { dev_url, prd_url } from '../utils/url';
var zipcodes = require('zipcodes');

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = selected => {
    const { params, changeAddress, changeState } = this.props;
    const address = selected;
    let latitude, longitude;
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0])
      )
      .then(({ lat, lng }) => {
        latitude = lat;
        longitude = lng;

        const realAddress = address.split(',');

        params.data.address = realAddress[0];
        params.data.city = realAddress[1];
        params.data.state = realAddress[2];
        params.data.longitude = longitude;
        params.data.latitude = latitude;
        //////////////////////
        const l = zipcodes.lookupByName(realAddress[1], realAddress[2]);
        const httpRequest1 = new XMLHttpRequest();
        httpRequest1.open(
          "GET",
          //"http://api.snp-plus.com/api/insertDelReason",
          `https://www.zipcodeapi.com/rest/PJ7Ha3OkOoK18zRDI37edh6Lwmz5LdNkwCDymlCgNHNWQPuVjE6CMqwypODh1owf/city-zips.json/${realAddress[1]}/${realAddress[2]}`,
          false
        );
        httpRequest1.setRequestHeader('Content-type','application/json; charset=utf-8');
        httpRequest1.onreadystatechange = () => {
          if (httpRequest1.readyState === 4 && httpRequest1.status === 200) {
            console.log("12345", httpRequest1.responseText)
            // updateData(parentGridApi, JSON.parse(httpRequest.responseText));
          }
        };
        // const res = axios.get(`https://www.zipcodeapi.com/rest/PJ7Ha3OkOoK18zRDI37edh6Lwmz5LdNkwCDymlCgNHNWQPuVjE6CMqwypODh1owf/city-zips.json/${realAddress[1]}/${realAddress[2]}
        // `,  {
        //   headers: {
        //     'Content-Type': 'application/json; charset=utf-8',
        //     'Authorization': localStorage.getItem('token')
        //   }
        // });
        // console.log("<<<<<<<", res);
        /////////////////////
        const json = JSON.stringify(params.data);
        const httpRequest = new XMLHttpRequest();
        httpRequest.open(
          "PUT",
          // `${prd_url}/api/updateData`,
          `${dev_url}/api/updateData`,
          true
        );
        httpRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
        httpRequest.setRequestHeader('Authorization',localStorage.getItem('token'));
        httpRequest.send(json);
        params.api.purgeServerSideCache()

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
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'Demo__search-input',                      
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