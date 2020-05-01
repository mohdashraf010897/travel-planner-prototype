import _ from "lodash";

const INITIAL_STATE = {
  transfers: {
    1: {
      firstName: "Yogesh",
      lastName: "Sharma",
      vehicleType: "Premium",
      vehicleQuantity: 5,
      adults: 4,
      children: 2,
      pickup: "Palam",
      drop: "Samosa Bhandar",
      dateTime: "2020-05-24T02:05",
      milliSecondsToSort: 1593050820000,
    },
    2: {
      firstName: "Lalit",
      lastName: "Kumar",
      vehicleType: "Van",
      vehicleQuantity: 6,
      adults: 10,
      children: 20,
      pickup: "Dominoz",
      drop: "Subway",
      dateTime: "2020-05-24T02:05",
      milliSecondsToSort: 1592964300000,
    },
  },
  transfersCount: 2,
};

const sortTransfers = (transfers) => {
  const sortedTransfers = Object.values(transfers).sort((a, b) => {
    return a.milliSecondsToSort - b.milliSecondsToSort;
  });
  return sortedTransfers;
};

const transferReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SAVE_TRANSFER":
      return {
        ...state,
        transfers: sortTransfers({
          ...state.transfers,
          [action.payload.id]: action.payload.transfer,
        }),
        transfersCount: state.transfersCount + 1,
      };

    case "DELETE_TRANSFER":
      return {
        ...state,
        transfers: sortTransfers(_.omit(state.transfers, [action.payload])),
        transfersCount: state.transfersCount - 1,
      };
    default:
      return state;
  }
};

export default transferReducer;
