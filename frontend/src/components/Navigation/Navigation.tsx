import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';

function Navigation(): JSX.Element {
    const sessionUser = useSelector((state: RootState) => state.session.user);

    return (
        <nav className="nav-bar">
            <div className="nav-left">
                <NavLink to="/">
                <img src="https://static-00.iconduck.com/assets.00/yelp-icon-2048x2048-ys10gku9.png" alt="yelp logo" className="yelp-logo"/>
                </NavLink>
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
                        <NavLink to="/login" className="login-link">Log In</NavLink>
                           <OpenModalButton
                  buttonText="Sign Up"
                  className="sign-up-button"
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
