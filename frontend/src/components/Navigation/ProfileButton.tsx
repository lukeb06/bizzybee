import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from '../../redux/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useAppSelector } from '../../redux/store';

function ProfileButton(): JSX.Element {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = useAppSelector(store => store.session.user);
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

    const closeMenu = () => setShowMenu(false);

    const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(thunkLogout());
        closeMenu();
    };

    return (
        <div className="profile-button-container">
            <button onClick={e => toggleMenu(e)} className="profile-button">
                <FaUserCircle size={32} style={{ color: '#7d7a85' }} />
            </button>
            {showMenu && (
                <ul className={'profile-dropdown'} ref={ulRef}>
                    {user ? (
                        <>
                            <li className="item user-name">Hello, {user.username}</li>
                            <li className="item user-email">{user.email}</li>
                            <button className="item logout-button" onClick={e => logout(e)}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <OpenModalMenuItem
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </>
                    )}
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;
