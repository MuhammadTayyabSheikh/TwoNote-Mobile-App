import axios from "axios";
import storage from "../../utilities/storage";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "https://two-note-backend.herokuapp.com/api/users/login/",
      {
        email,
        password,
      },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    storage.setItem("userInfo", JSON.stringify(data));
    console.log(data);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const logout = () => async (dispatch) => {
  storage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT_REQUEST });
}

export const register = (name, email, password, img) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const postDetails = async (img) => {
      if (!img)
        return;
      else {
        let newFile = {
          uri: img,
          type: `test/${img.split(".")[1]}`,
          name: `test/${img.split(".")[1]}`
        }

        const data = new FormData();
        data.append("api_key", '224744376782588');
        data.append("file", newFile);
        data.append("upload_preset", "twoNote");
        data.append("cloud_name", "mainiac");

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        };

        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/mainiac/image/upload",
            data,
            config
          )
          return (res.data.url);
        } catch (error) {
          console.log(error.response && error.response.data.message ? error.response.data.message : error.message)
        }
      }
    };

    img = await postDetails(img);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://two-note-backend.herokuapp.com/api/users/",
      {
        name,
        email,
        password,
        img,
      },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    console.log(data);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    storage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const updateUser = (name, email, password, img) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const postDetails = async (img) => {
      if (!img)
        return;
      else {
        let newFile = {
          uri: img,
          type: `test/${img.split(".")[1]}`,
          name: `test/${img.split(".")[1]}`
        }

        const data = new FormData();
        data.append("api_key", '224744376782588');
        data.append("file", newFile);
        data.append("upload_preset", "twoNote");
        data.append("cloud_name", "mainiac");

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        };

        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/mainiac/image/upload",
            data,
            config
          )
          return (res.data.url);
        } catch (error) {
          console.log(error.response && error.response.data.message ? error.response.data.message : error.message)
        }
      }
    };

    if (img.includes("icon-library") || img.includes("cloudinary")) {
      img = img;
    } else {
      img = await postDetails(img);
    }

    const { userLogin: { userInfo } } = getState();
    // const userInfo = storage.getItem("userInfo");
    console.log(userInfo);
    const token = userInfo._id || (JSON.parse(userInfo._W)).token;
    console.log("Update User Action", `Bearer ${token}`);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.post(
      "https://two-note-backend.herokuapp.com/api/users/profile/",
      {
        name,
        email,
        password,
        img,
      },
      config
    );
    console.log(data);
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    storage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}