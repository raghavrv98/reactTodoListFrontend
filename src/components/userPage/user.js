import Navbar from "../navbar/navbar";
import './user.css'

const User = () => {

  return <>
    <Navbar name={sessionStorage.name} />
    <h1 className="welcome-msg" >Hello {sessionStorage.name} !</h1>
    <h1 className="welcome-msg" >Add some new tasks today..</h1>
  </>
};

export default User;