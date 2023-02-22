export const GET_MY_OWN_PROFILE = "GET_MY_OWN_PROFILE";
export const GET_PROFILES = "GET_PROFILES";
export const GET_EXPERIENCES = "GET_EXPERIENCES";
export const ADD_EXPERIENCE = "ADD_EXPERIENCE";
export const PUT_EXPERIENCE = "PUT_EXPERIENCE";
export const DELETE_EXPERIENCE = "DELETE_EXPERIENCE";
export const GET_POSTS = "GET_POSTS";

const getOptions = (method) => {
  return {
    method: method,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YzNDZlNDgzODFmYzAwMTNmZmZhZDkiLCJpYXQiOjE2NzY4ODg0NzAsImV4cCI6MTY3ODA5ODA3MH0.AYIsvNXcD-Xnx3yf_2zgpkcNNyuB19GZwp9jMm6Y6Jc",
      "Content-Type": "application/json",
    },
  };
};

export const getMyProfileAsync = () => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/me",
        getOptions("GET")
      );

      if (res.ok) {
        let fetchProfile = await res.json();
        dispatch({
          type: GET_MY_OWN_PROFILE,
          payload: fetchProfile,
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProfilesAsync = () => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/",
        getOptions("GET")
      );

      if (res.ok) {
        let fetchedProfiles = await res.json();
        console.log(fetchedProfiles);
        dispatch({
          type: GET_PROFILES,
          payload: fetchedProfiles,
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getExperiencesAsync = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`,
        getOptions("GET")
      );

      if (res.ok) {
        let fetchedExperiences = await res.json();
        console.log(fetchedExperiences);
        dispatch({
          type: GET_EXPERIENCES,
          payload: fetchedExperiences,
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addExperienceAsync = (userId, data, handleClose) => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`,
        { ...getOptions("POST"), body: JSON.stringify(data) }
      );

      if (res.ok) {
        let addedExperience = await res.json();

        console.log(addedExperience);
        handleClose();
        dispatch(getExperiencesAsync(userId));
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const putExperiencesAsync = (userId, expId, experience) => {
  return async (dispatch) => {
    try {
      let res = await fetch(
        `https:striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}`,
        { ...getOptions("PUT"), body: JSON.stringify(experience) }
      );
      if (res.ok) {
        let fetchedPutExperience = await res.json();
        dispatch({
          type: PUT_EXPERIENCE,
          payload: fetchedPutExperience,
        });
        alert("Your experience has been updated");
      } else {
        alert("something went wrong updating");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteExperienceAsync = (userId, expId) => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch(
        `https:striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}`,
        { ...getOptions("DELETE") }
      );

      if (res.ok) {
        dispatch({
          type: DELETE_EXPERIENCE,
        });
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPostAsync = () => {
  return async (dispatch, getState) => {
    try {
      let res = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/ `,
        getOptions("GET")
      );

      if (res.ok) {
        let fetchedPost = await res.json();
        console.log(fetchedPost);
        dispatch({
          type: GET_POSTS,
          payload: fetchedPost,
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
