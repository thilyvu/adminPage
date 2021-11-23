import { reactive } from "vue";
import { API_URL } from "./base";
import VueCookies from "vue-cookies";
export default function useUser() {
  const state = reactive({
    error: null,
    user: null,
    teacherInformation: null,
    studentInformation: null,
    userProfile: null,
    profile: null,
    teacherProfile: null,
  });
  const login = async (data) => {
    try {
      const url = `${API_URL}/users/login-user`;
      const createUserResponse = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then((data) => (state.user = data));
      state.user = createUserResponse;
    } catch (error) {
      state.error = error;
    }
  };
  const registerTeacher = async (data) => {
    try {
      const url = `${API_URL}/users/register-teacher`;
      const createUserResponse = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      state.teacherInformation = createUserResponse;
    } catch (error) {
      state.error = error;
    }
  };
  const registerStudent = async (data) => {
    try {
      const url = `${API_URL}/users/register-user`;
      const createUserResponse = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      state.studentInformation = createUserResponse;
    } catch (error) {
      state.error = error;
    }
  };
  const registerAdmin = async (data) => {
    try {
      const url = `${API_URL}/users/register-super-admin`;
      const createUserResponse = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      state.studentInformation = createUserResponse;
    } catch (error) {
      state.error = error;
    }
  };
  const getUserProfile = async () => {
    try {
      const url = `${API_URL}/users/user-profile`;
      const createUserResponse = await fetch(url, {
        method: "get", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
      });
      state.userProfile = createUserResponse;
    } catch (error) {
      state.error = error;
    }
  };
  const getProfile = async () => {
    try {
      const token = VueCookies.get("token");
      console.log(token);
      const url = `${API_URL}/users/profile`;
      const createUserResponse = await fetch(url, {
        method: "get", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
      });
      state.profile = createUserResponse;
    } catch (error) {
      state.error = error;
    }
  };
  const getTeacherProfile = async () => {
    try {
      const url = `${API_URL}/users/teacher-profile`;
      const createUserResponse = await fetch(url, {
        method: "get", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
      });
      state.teacherProfile = createUserResponse;
    } catch (error) {
      state.error = error;
    }
  };
  const getAdminProfile = async () => {
    try {
      const url = `${API_URL}/users/super-admin-profile`;
      const createUserResponse = await fetch(url, {
        method: "get", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
      });
      state.teacherProfile = createUserResponse;
    } catch (error) {
      state.error = error;
    }
  };

  const logout = async () => {
    try {
      const url = `${API_URL}/users/logout`;
      const createUserResponse = await fetch(url, {
        method: "get", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
      });

      console.log(createUserResponse);
    } catch (error) {
      state.error = error;
    }
  };

  return {
    state,
    login,
    registerTeacher,
    registerStudent,
    getUserProfile,
    getProfile,
    getTeacherProfile,
    registerAdmin,
    logout,
    getAdminProfile,
  };
}
