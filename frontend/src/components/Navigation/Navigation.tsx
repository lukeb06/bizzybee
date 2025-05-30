import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import { CiSearch } from 'react-icons/ci';
import { useState, useRef, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IFilteredBusiness } from '../../redux/types/business';
import { thunkGetAllBusinesses } from '../../redux/business';


function Navigation(): JSX.Element {
    const sessionUser = useSelector((state: RootState) => state.session.user);
      const dispatch = useDispatch();
        const navigate = useNavigate();
        const [isLoaded, setIsLoaded] = useState(false);
        const filters: IFilteredBusiness={}
        const [name, setName] = useState('');
        const [category, setCategory] = useState('');
        const [min_price, setMin_price] = useState('');
        const [max_price, setMax_price] = useState('');
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
        function submitHandler(e: FormEvent){
            filters['name']=name
            filters['category']=category
            filters['min_price']=min_price
            filters['max_price']=max_price
            dispatch(thunkGetAllBusinesses(filters))
            navigate("/business/search", {state: filters})
        }

    return (
        <nav className="nav-bar">
            <div className="nav-left">
                <NavLink to="/">
                <img src="https://static-00.iconduck.com/assets.00/yelp-icon-2048x2048-ys10gku9.png" alt="yelp logo" className="yelp-logo"/>
                </NavLink>
            </div>
            <form className="search-bar-form" onSubmit={(e)=>{
                e.preventDefault()
                submitHandler(e)
            }}>
                <div>
                <input className="name-category-filter" onChange={e =>{ 
                    setName(e.target.value)}
                }></input>
                <input className="name-category-filter"onChange={e =>{ setCategory(e.target.value)
                    }
                }></input>
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
