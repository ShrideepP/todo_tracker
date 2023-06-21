import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineAim, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useCookies } from 'react-cookie';

const NavigationMenu = () => {

    const [menu, setMenu] = useState(false);

    const toggleMenu = () => setMenu(!menu);

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
        <nav className={`w-full min-h-[12.5vh] px-6 md:px-12 lg:px-20 relative flex items-center ${cookie.access_token ? 'justify-between' : 'justify-center'}`}>
            <img src="/logo.svg" width={150} alt="logo" />
            {cookie.access_token && (
                <>
                    <button type="button" onClick={toggleMenu} className="md:hidden">
                        {menu ? (
                            <MdClose color="#F5F5F5" size={30} />
                        ) : (
                            <HiOutlineMenuAlt3 color="#F5F5F5" size={30} />
                        )}
                    </button>

                    {menu && (
                        <div style={{ border: '0.5px solid rgba(255,255,255,.2)' }} className="w-2/5 md:hidden py-4 px-6 mr-6 absolute top-full right-0 flex flex-col gap-1 bg-background rounded-lg">
                            <NavLink style={activeLink} to="/">
                                <button onClick={toggleMenu} className="py-2 flex items-center gap-x-2">
                                    <AiOutlineAim size={18} />
                                    <span className="text-xs font-semibold tracking-widest uppercase">Goals</span>
                                </button>
                            </NavLink>
                            <NavLink style={activeLink} to="/profile">
                                <button onClick={toggleMenu} className="py-2 flex items-center gap-x-2">
                                    <AiOutlineUser size={18} />
                                    <span className="text-xs font-semibold tracking-widest uppercase">Profile</span>
                                </button>
                            </NavLink>
                            <NavLink style={activeLink} to="/sign-in">
                                <button onClick={signOut} className="py-2 flex items-center gap-x-2">
                                    <AiOutlineLogout size={18} />
                                    <span className="text-xs font-semibold tracking-widest uppercase">Sign Out</span>
                                </button>
                            </NavLink>
                        </div>
                    )}

                    <div className="hidden md:flex items-center gap-x-8">
                        <NavLink style={activeLink} to="/">
                            <button className="flex items-center gap-x-2">
                                <AiOutlineAim size={18} />
                                <span className="text-xs font-semibold tracking-widest uppercase">Goals</span>
                            </button>
                        </NavLink>
                        <NavLink style={activeLink} to="/profile">
                            <button className="flex items-center gap-x-2">
                                <AiOutlineUser size={18} />
                                <span className="text-xs font-semibold tracking-widest uppercase">Profile</span>
                            </button>
                        </NavLink>
                        <NavLink style={activeLink} to="/sign-in">
                            <button onClick={signOut} className="flex items-center gap-x-2">
                                <AiOutlineLogout size={18} />
                                <span className="text-xs font-semibold tracking-widest uppercase">Sign Out</span>
                            </button>
                        </NavLink>
                    </div>
                </>
            )}
        </nav>
    );

};

export default NavigationMenu;
