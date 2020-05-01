import React from "react";
import { connect } from "react-redux";

import "./list-item.styles.scss";

class ListItem extends React.Component {
  state = { detailToggler: false };
  render() {
    const {
      transfer: {
        firstName,
        lastName,
        vehicleType,
        vehicleQuantity,
        adults,
        children,
        pickup,
        drop,
        dateTime,
      },
      id,
      toggleModal,
      deleteTransfer,
    } = this.props;
    const clipBoardText = `Name : ${firstName} ${lastName}, Vehicle : ${vehicleType} ${vehicleQuantity}, Pick up: ${pickup}, Drop : ${drop}, dateTime : ${dateTime}`;
    //Below is for display purpose
    const dateTimeFormatted = dateTime.replace("T", " ");
    const dateOnlyFormatted = new Date(
      dateTime.substring(0, 10).replace(/-/g, ",")
    );

    // console.log(id);
    return (
      <div className="item">
        <div className="detail-toggler">
          <h3>{dateOnlyFormatted.toDateString().replace(" ", ", ")}</h3>
          <span
            onClick={() => {
              this.setState({ detailToggler: !this.state.detailToggler });
            }}
          >
            Click Me!!
          </span>
        </div>
        {this.state.detailToggler && (
          <>
            <div className="item__header">
              <h2>
                <span className="fa fa-subway"></span> Transfer Service
              </h2>
              <div className="item__btn-group">
                <span
                  className="fa fa-edit fa-lg"
                  onClick={() => toggleModal(id)}
                ></span>
                <span
                  className="fa fa-remove fa-lg"
                  onClick={() => deleteTransfer(id)}
                ></span>
                <span
                  className="fa fa-copy fa-lg"
                  onClick={() => {
                    navigator.clipboard.writeText(clipBoardText);
                  }}
                ></span>
              </div>
            </div>
            <div className="item__body">
              <span>
                <h4>Pickup Location</h4>
                <p>{pickup}</p>
              </span>
              <span>
                <h4>Service Type</h4>
                <p>We'll choose it for you!</p>
              </span>
              <span>
                <h4>Drop Location</h4>
                <p>{drop}</p>
              </span>
              <span>
                <h4>Start Date</h4>
                <p>{dateTimeFormatted}</p>
              </span>
              <span>
                <h4>Vehicle Types</h4>
                <p>
                  {vehicleType} x{vehicleQuantity}
                </p>
              </span>
              <span>
                <h4>City</h4>
                <p>{pickup}</p>
              </span>
              <span>
                <h4>Passenger Count</h4>
                <p>
                  {children > 0 ? `${children} Children` : ""}{" "}
                  {adults > 0 ? `${adults} Adults` : ""}{" "}
                </p>
              </span>
              <span>
                <h4>Name </h4>
                <p>
                  {firstName} {lastName}{" "}
                </p>
              </span>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTransfer: (id) => dispatch({ type: "DELETE_TRANSFER", payload: id }),
  };
};

export default connect(null, mapDispatchToProps)(ListItem);
