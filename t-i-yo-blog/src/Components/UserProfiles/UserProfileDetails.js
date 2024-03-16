import React, { useEffect, useState } from "react";
import { getuserbyid } from "../../Managers/UserProfileManager";
import { Link, useParams } from "react-router-dom";
import { Card } from "reactstrap";

export const UserProfileDetails = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  const getuser = () => {
    getuserbyid(id)
      .then((thisuser) => setUser(thisuser))
      .catch((error) => console.error("Error fetching user:", error));
  };

  const createdDate = new Date(user.createDateTime);
  const formattedDate = createdDate.toLocaleDateString('en-US');

  useEffect(() => {
    getuser();
  }, [id]);

  // Conditionally render if user data is available
  if (!user.id) {
    return <div>Loading...</div>;
  }

  return (
    <>
       <Card>
        <Link to={`/users/`}><button className="btn btn-primary">Back to User Profile List</button></Link>  
        <div className="text-center">
          <img className="image" id="userImg" src={user.imageLocation} alt={user.displayName} />
        </div>
        <br />
        <p className="row justify-content-center">
          User Name: <strong className="row justify-content-center">{user.name}</strong>
        </p>
        <p className="row justify-content-center">User Display Name: <i className="row justify-content-center">{user.displayName}</i></p>
        <br />
        <div className="row justify-content-center">
          Email: <i className="row justify-content-center">{user.email}</i>
        </div>
        <br />
        <div className="row justify-content-center">
          User Created On: <strong className="row justify-content-center">{formattedDate}</strong>
        </div>
        <br />
      </Card>
    </>
  );
};

export default UserProfileDetails;



/*import React, { useEffect, useState } from "react";
//import { Users } from "UserProfile";
import { getuserbyid } from "../../Managers/UserProfileManager";
import { Link, useParams } from "react-router-dom";
import { Card } from "reactstrap";

export const UserProfileDetails = () => {
    const [user, setUser] = useState([]);
    const { id } = useParams();

    const getusers = () => {
        getuserbyid(id).then((thisuser) => setUser(thisuser));
    }

    const createdDate = new Date(user.createDateTime);
    const formattedDate = createdDate.toLocaleDateString('en-US');

    useEffect(() => {
        getuser();
        }, []);

    return (
      <>
      <Card>
      <Link to={`/users/`}><button className="btn btn-primary">Back to User Profile List</button></Link>  
      <div className="text-center">
      <img className="image" id="userImg" src={user.imageLocation} alt={user.displayName} />

      </div>
      <br />
        <p className="row justify-content-center">
          User Name: <strong className="row justify-content-center">{user.name}</strong>
        </p>
        <p className="row justify-content-center">User Display Name: <i className="row justify-content-center">{user.displayName}</i></p>
        <br />
        <div className="row justify-content-center">
          Email:<i className="row justify-content-center">{user.email}</i>
        </div>
        <br />
        <div className="row justify-content-center">
           User Created On <strong className="row justify-content-center">{formattedDate}</strong>
        </div>
        <br />
      </Card>
      </>
    )
};

export default UserProfileDetails */