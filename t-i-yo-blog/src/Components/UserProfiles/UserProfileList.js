import React, { useEffect, useState } from "react";
import { getallusers } from "../../Managers/UserProfileManager";

export const UserProfileList = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    getallusers().then((theseusers) => setUsers(theseusers));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-4 mb-3 bg-secondary">
    <div className="container-fluid">
                  <div className="col">
                   <div className="row"> 
                   <div className="card text-row">
                    <h3 className="text-center">Users</h3>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>DisplayName</th>
                          <th>Email</th>
                          <th>Password</th>
                          <th>Admin</th>
                        </tr>
                      </thead>
                      <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.displayName}</td>
                          <td>{user.email}</td>
                          <td>{user.password}</td>
                          <td>{user.admin}</td>
                        </tr>                     
                        ))}
                      </tbody>
                    </table>
                   </div>
                   </div>
                </div>
                 </div>
                 </div>
  );
};


/*import React, { useEffect, useState } from "react";
import { Users } from "./UserProfile";
import { getallusers } from "../../Managers/UserProfileManager";

export const UserProfileList = () => {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        getallusers().then((theseusers) => setUsers(theseusers));
    }

    useEffect(() => {
        getUsers();
        }, []);

    return (
        <div className="container">
          <h2 className="row justify-content-center">User Profiles</h2>
        <div className="row justify-content-center">
          <div className="cards-column">
            {console.log(users)}
            {users.map((user) => (
              <UserProfile key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    )
};

export default UserProfileList*/