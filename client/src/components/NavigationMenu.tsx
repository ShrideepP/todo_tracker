import { NavLink } from "react-router-dom";
import { AiOutlineAim, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { useCookies } from 'react-cookie';

const NavigationMenu = () => {

    const [cookie, setCookie] = useCookies(['access_token']);
    
    const signOut = () => {
        setCookie("access_token", "");
        localStorage.clear();
    };

    const activeLink = ({ isActive }:{ isActive: boolean }) => {
        return {
            color: isActive ? "#F5F5F5" : "#A3A3A3",
        };
    };

    return (
        <nav className={`w-full min-h-[12.5vh] px-6 md:px-12 lg:px-20 flex items-center ${cookie.access_token ? 'justify-between' : 'justify-center'}`}>
            <img src="" width={200} alt="logo" />
            {cookie.access_token && (
                <div className="flex items-center gap-x-8">
                    <NavLink style={activeLink} className="text-compliment" to="/">
                        <button className="flex items-center gap-x-2">
                            <AiOutlineAim size={18} />
                            <span className="text-xs font-semibold tracking-widest uppercase">Goals</span>
                        </button>
                    </NavLink>
                    <NavLink style={activeLink} className="text-compliment" to="/profile">
                        <button className="flex items-center gap-x-2">
                            <AiOutlineUser size={18} />
                            <span className="text-xs font-semibold tracking-widest uppercase">Profile</span>
                        </button>
                    </NavLink>
                    <NavLink style={activeLink} className="text-compliment" to="/sign-in">
                        <button onClick={signOut} className="flex items-center gap-x-2">
                            <AiOutlineLogout size={18} />
                            <span className="text-xs font-semibold tracking-widest uppercase">Sign Out</span>
                        </button>
                    </NavLink>
                </div>
            )}
        </nav>
    );

};

export default NavigationMenu;
