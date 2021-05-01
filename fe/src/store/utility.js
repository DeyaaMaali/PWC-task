export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};

export const addObjectToStateKey = (state, addedObject, keyName) => {
  let stateKeyAfterAddingObject = [...state[keyName], addedObject];
  return {
    ...state,
    [keyName]: stateKeyAfterAddingObject,
  };
};

export const deleteObjectFromStateKey = (state, object_id, keyName) => {
  let stateKeyAfterDeletingObject = state[keyName].filter(
    (object) => object._id !== object_id
  );
  return {
    ...state,
    [keyName]: stateKeyAfterDeletingObject,
  };
};

export const updateObjectFromStateKey = (state, updatedObject, keyName) => {
  const updatedKeyNameState = state[keyName].map((object) => {
    if (object._id === updatedObject._id) {
      return updatedObject;
    }
    return object;
  });

  return {
    ...state,
    [keyName]: updatedKeyNameState,
  };
};
