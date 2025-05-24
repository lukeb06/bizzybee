import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';

function Navigation(): JSX.Element {
    const sessionUser = useSelector((state: RootState) => state.session.user);
    console.log(sessionUser, 'SESION USER');
    return (
        <nav className="nav-bar">
            <div className="nav-left">
                <img src="https://static-00.iconduck.com/assets.00/yelp-icon-2048x2048-ys10gku9.png" alt="yelp logo" className="yelp-logo"/>
                <NavLink to="/">Home</NavLink>
            </div>

            <div className="nav-right">
                <div>
                    {sessionUser && (
                        <NavLink to="/create-business" className="create-biz-link">
                            Add a Business
                        </NavLink>
                    )}
                </div>
                <div>
                    {sessionUser && (
                        <ProfileButton />
                    )}
                </div>
                <div>
                    {!sessionUser && (
                        <div>
                        <NavLink to="/login">Log In</NavLink>
                           <OpenModalButton
                  buttonText="Sign Up"
                  onButtonClick={()=>{
                    }}
                  onModalClose={undefined}
                  modalComponent={<SignupFormModal/>}
                />
                </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
