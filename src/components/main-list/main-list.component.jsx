import React from "react";
import { connect } from "react-redux";

import "./main-list.styles.scss";
import ListItem from "../list-item/list-item.component";
import TransferModal from "./../transfer-modal/transfer-modal.component";

class MainList extends React.Component {
  state = { isModalOpen: false, editTransfer: null, editId: null };

  toggleModal = (id = null) => {
    if (id !== null) {
      // console.log("I am called", id);
      const editTransfer = this.props.transfers[id];
      this.setState({
        isModalOpen: !this.state.isModalOpen,
        editId: id,
        editTransfer: editTransfer,
      });
      return;
    }

    this.setState({ isModalOpen: !this.state.isModalOpen });
  };
  render() {
    const { isModalOpen } = this.state;
    const { transfers } = this.props;
    // console.log(transfers);
    return (
      <div className="main">
        {isModalOpen && (
          <TransferModal
            toggleModal={this.toggleModal}
            editId={this.state.editId}
            editTransfer={this.state.editTransfer}
          />
        )}
        <div className="main__header">
          <h1>Your Transfers' List</h1>
          <button
            className="create-transfer"
            onClick={() => this.toggleModal()}
          >
            Create Transfer
          </button>
        </div>
        {transfers &&
          Object.keys(transfers).map((key) => (
            <ListItem
              key={key}
              transfer={transfers[key]}
              id={key}
              toggleModal={this.toggleModal}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transfers: state.transferReducer.transfers,
  };
};

export default connect(mapStateToProps)(MainList);
