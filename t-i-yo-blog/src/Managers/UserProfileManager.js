const apiUrl = "https://localhost:7088";

export const login = (userObject) => {
  return fetch(`${apiUrl}/api/Users/getbyemail?email=${userObject.email}`)
  .then((r) => r.json())
    .then((users) => {
      if(users.id){
        localStorage.setItem("users", JSON.stringify(users));
        return users
      }
      else{
        return undefined
      }
    });
};

export const getallusers = () => {
  return fetch(`${apiUrl}/api/Users`)
    .then((r) => r.json());
};

export const getuserbyid = (id) => {
  return fetch(`${apiUrl}/api/Users/${id}`)
    .then((r) => r.json());
}

export const logout = () => {
      localStorage.clear()
};

export const register = (userObject) => {
  return  fetch(`${apiUrl}/api/Users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
  .then((response) => response.json())
    .then((savedUsers) => {
      localStorage.setItem("users", JSON.stringify(savedUsers))
    });
};