import React from 'react';
import $ from 'jquery';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { classnames } from '../utils/helpers.js';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false, 
    };
  }

  handleChange = address => {
    this.setState({ 
      address,
      latitude: null,
      longitude: null,
      errorMessage: '',
     });
  };

  handleSelect = selected => {
    const { params, changeAddress, changeState } = this.props;
    // this.setState({ isGeocoding: true, address: selected });
    const address = selected;
    let latitude, longitude;
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0])
      )
      .then(({ lat, lng }) => {
        // this.setState({
          latitude = lat;
          longitude = lng;
          // isGeocoding: false,
        // });

        const realAddress = address.split(',');
        params.data.address = realAddress[0];
        params.data.city = realAddress[1];
        params.data.state = realAddress[2];
        params.data.longitude = longitude;
        params.data.latitude = latitude;
        const json = JSON.stringify(params.data);
        const httpRequest = new XMLHttpRequest();
        httpRequest.open(
          "PUT",
          "http://localhost:4000/api/updateData",
          true
        );
        httpRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
        httpRequest.send(json);
        params.api.purgeServerSideCache()

      })
      .catch(error => {
        // this.setState({ isGeocoding: false });
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
    const {
      address,
      errorMessage,
      latitude,
      longitude,
      isGeocoding,
    } = this.state;

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

            // if(this.state.address.length > 0) {
            //   $('.Demo__search-input').css ({
            //     "width": "225px"
            //   })
              
            //   $('.Demo__clear-button').css ({
            //     'width': '25px',
            //     'height': '32px'
            //   })
            // } else {
            //   $('.Demo__search-input').css ({
            //     "width": "250px"
            //   });

            //   $('.Demo__clear-button').css ({
            //     'width': '0'
            //   })
            // }

            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'Demo__search-input',                      
                    })}
                    // value={this.props.value}
                  />
                  {/* {this.state.address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                    </button>
                  )} */}
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
                    })}<div>adf</div>
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