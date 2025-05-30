import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import { CiSearch } from 'react-icons/ci';
import { useState, useRef, useEffect } from 'react';


function Navigation(): JSX.Element {
    const sessionUser = useSelector((state: RootState) => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
     const closeMenu = () => setShowMenu(false);
     const ulRef = useRef<any>();
         const toggleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };
       useEffect(() => {
            if (!showMenu) return;
    
            const closeMenu = (e: any) => {
                if (ulRef.current && !ulRef.current.contains(e.target)) {
                    setShowMenu(false);
                }
            };
    
            document.addEventListener('click', closeMenu);
    
            return () => document.removeEventListener('click', closeMenu);
        }, [showMenu]);

    return (
        <nav className="nav-bar">
            <div className="nav-left">
                <NavLink to="/">
                <img src="https://static-00.iconduck.com/assets.00/yelp-icon-2048x2048-ys10gku9.png" alt="yelp logo" className="yelp-logo"/>
                </NavLink>
            </div>
            <form className="search-bar-form">
                <div>
                <input className="name-category-filter"></input>
                <input className="location-filter"></input>
                <button type="submit" className="search-bar-form-submit"><CiSearch/></button>
                </div>
                   <button onClick={e => toggleMenu(e)} className="checkbox-dropdown"></button>
                   {showMenu &&
                    (<ul ref={ulRef}>
                        <li><input type="checkbox" value="1"placeholder='$'></input></li>
                        <li><input type="checkbox" value="2"placeholder='$$'></input></li>
                        <li><input type="checkbox" value="3"placeholder='$$$'></input></li>
                        <li><input type="checkbox" value="4" placeholder='$$$$'></input></li>
                        <li><input type="checkbox" value="5" placeholder='$$$$$'></input></li>
                    </ul>)
                   }
            </form>

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
