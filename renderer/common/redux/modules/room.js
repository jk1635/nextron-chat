const LOAD_ROOM = "LOAD_ROOM";

export const loadRoom = room => ({
  type: LOAD_ROOM,
  currentRoom: room,
});

const initialState = { currentRoom: null };

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ROOM:
      return {
        currentRoom: action.currentRoom,
      };
    default:
      return state;
  }
};
