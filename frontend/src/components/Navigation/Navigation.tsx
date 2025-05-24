import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

function Navigation(): JSX.Element {
    const sessionUser = useSelector((state: RootState) => state.session.user);
    console.log(sessionUser, 'SESION USER');
    return (
        <nav className="nav-bar">
            <div className="nav-left">
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
                    <ProfileButton />
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
