import React from "react";
import { connect } from "react-redux";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import "./transfer-modal.styles.scss";

class TransferModal extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    vehicleType: "",
    vehicleQuantity: 0,
    adults: 0,
    children: 0,
    pickup: "",
    drop: "",
    dateTime: "",
  };

  componentDidMount() {
    if (this.props.editId !== null && this.props.editTransfer !== null) {
      this.setState({ ...this.props.editTransfer }, () => {
        console.log("Only for Developer");
      });
    }
  }

  handleChange = ({ currentTarget: input }) => {
    this.setState({ [input.name]: input.value });
  };

  handleIncrement = (name) => {
    this.setState({ [name]: this.state[name] + 1 });
  };

  handleDecrement = (name) => {
    this.setState({ [name]: this.state[name] - 1 });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let myDateTime = new Date(this.state.dateTime);
    const milliSecondsToSort = myDateTime.getTime();
    // console.log(milliSecondsToSort);

    if (this.props.editId === null) {
      console.log("I am called for new ");
      this.props.saveTransfer({
        transfer: { ...this.state, milliSecondsToSort: milliSecondsToSort },
        id: this.props.transfersCount + 1,
      });
    } else {
      this.props.saveTransfer({
        transfer: { ...this.state, milliSecondsToSort: milliSecondsToSort },
        id: this.props.editId,
      });
    }
    this.props.toggleModal();
  };

  render() {
    const { toggleModal } = this.props;
    // console.log(this.props.transfersCount, editId);
    return (
      <div className="modal-wrapper">
        <div className="modal-content">
          <span className="btn-close" onClick={toggleModal}>
            X
          </span>
          <h3>Transfer Services</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="name">
              <div className="first-name">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  required
                />
              </div>
              <div className="last-name">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                  required
                />
              </div>
            </div>
            <div className="vehicle">
              <label htmlFor="vehicle">Vehicle Type</label>
              <select
                id="vehicle"
                onChange={this.handleChange}
                name="vehicleType"
                value={this.state.vehicleType}
                required
              >
                <option></option>
                <option value="Standard">
                  Standard
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  &#xf0c0; upto 2 persons
                </option>
                <option value="Premium">
                  Premium
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  &#xf0c0; upto 4 personss
                </option>
                <option value="Luxury Coaches">
                  Luxury Coaches
                  &emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  &#xf0c0; upto 4 persons
                </option>
                <option value="Van">
                  Van
                  &emsp;&emsp;&emsp;&emsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  &#xf0c0; upto 8 persons
                </option>
              </select>
              <span className="vehicle-quantity">
                <div className="container">
                  <div onClick={() => this.handleDecrement("vehicleQuantity")}>
                    -
                  </div>
                  <span name="vehicleQuantity">
                    {this.state.vehicleQuantity}
                  </span>
                  <div onClick={() => this.handleIncrement("vehicleQuantity")}>
                    +
                  </div>
                </div>
              </span>
            </div>
            <div className="passengers">
              <label htmlFor="">Passenger Count</label>
              <div className="passengers__count">
                <span className="adultCount">
                  Adults{" "}
                  <div className="quantityAdult">
                    <div onClick={() => this.handleDecrement("adults")}>-</div>
                    <span name="adults">{this.state.adults}</span>
                    <div onClick={() => this.handleIncrement("adults")}>+</div>
                  </div>
                </span>
                <span className="childrenCount">
                  Children{" "}
                  <div className="quantityChildren">
                    <div onClick={() => this.handleDecrement("children")}>
                      -
                    </div>
                    <span name="children">{this.state.children}</span>
                    <div onClick={() => this.handleIncrement("children")}>
                      +
                    </div>
                  </div>
                </span>
              </div>
            </div>

            <div className="pickup">
              <label htmlFor="pickupLocation">Pickup Location</label>
              <GooglePlacesAutocomplete
                idPrefix="pickup"
                placeholder="Enter pickup location..."
                initialValue={this.state.pickup}
                onSelect={({ description }) =>
                  this.setState({ pickup: description })
                }
                renderSuggestions={(
                  active,
                  suggestions,
                  onSelectSuggestion
                ) => (
                  <div className="suggestions-container">
                    {suggestions.map((suggestion) => (
                      <div
                        className="suggestion"
                        onClick={(event) =>
                          onSelectSuggestion(suggestion, event)
                        }
                      >
                        {suggestion.description}
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
            <div className="drop">
              <label htmlFor="dropLocation">Drop Location</label>
              <GooglePlacesAutocomplete
                idPrefix="drop"
                placeholder="Enter drop location..."
                initialValue={this.state.drop}
                onSelect={({ description }) =>
                  this.setState({ drop: description })
                }
                renderSuggestions={(
                  active,
                  suggestions,
                  onSelectSuggestion
                ) => (
                  <div className="suggestions-container">
                    {suggestions.map((suggestion) => (
                      <div
                        className="suggestion"
                        onClick={(event) =>
                          onSelectSuggestion(suggestion, event)
                        }
                      >
                        {suggestion.description}
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>

            <div className="date-time">
              <label htmlFor="datetime">Date/ Time</label>
              <input
                type="datetime-local"
                id="datetime"
                name="dateTime"
                value={this.state.dateTime}
                onChange={this.handleChange}
                required
              />
            </div>

            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transfersCount: state.transferReducer.transfersCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveTransfer: (newTransfer) =>
      dispatch({
        type: "SAVE_TRANSFER",
        payload: newTransfer,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferModal);
