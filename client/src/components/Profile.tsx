import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {

    const Auth = useContext(AuthContext);

    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    return (
        <section className="w-full min-h-[87.5vh] grid place-items-center">
            <form noValidate className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-[30%] space-y-10">
                <h2 className="text-center text-4xl text-dominant font-light tracking-widest uppercase">
                    Profile
                </h2>
                <div className="space-y-4">
                    <input type="text" readOnly value={name ? name : Auth?.credentials.name} className="w-full h-12 px-5 text-sm text-dominant placeholder:text-compliment tracking-wider font-semibold outline-none border border-compliment bg-transparent rounded-full" />
                    <input type="email" readOnly value={email ? email : Auth?.credentials.email} className="w-full h-12 px-5 text-sm text-dominant placeholder:text-compliment tracking-wider font-semibold outline-none border border-compliment bg-transparent rounded-full" />
                    <div>
                        <Link to="/profile/edit">
                            <button type="submit" style={{background: 'linear-gradient(45deg, rgba(168,85,247,1) 0%, rgba(244,63,94,1) 100%)'}} className="w-full h-12 grid place-items-center rounded-full">
                                <span className="text-xs text-dominant font-bold tracking-widest uppercase">
                                    Update Credentials
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
                <p className="text-center text-sm text-compliment font-semibold">
                    Delete Account? <button type="button" className="text-dominant font-bold hover:underline">Click here</button>
                </p>
            </form>
        </section>
    );
    
};

export default Profile;
