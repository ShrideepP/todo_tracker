import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Dialog from "./Dialog";

const Profile = () => {

    const Auth = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => setIsOpen(!isOpen);

    const name = localStorage.getItem('name');

    const email = localStorage.getItem('email');

    return (
        <section className="w-full min-h-[87.5vh] grid place-items-center">
            <Dialog isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
            <form noValidate className="w-[90%] sm:w-3/4 md:w-2/4 lg:w-[500px] space-y-8">
                <h2 className="text-center text-2xl md:text-3xl text-dominant font-thin tracking-wider uppercase">
                    Profile
                </h2>
                <div className="space-y-4">
                    <input type="text" readOnly value={name ? name : Auth?.credentials.name} className="w-full h-12 px-5 text-sm text-dominant placeholder:text-compliment tracking-wider font-semibold outline-none border border-compliment bg-transparent rounded-full" />
                    <input type="email" readOnly value={email ? email : Auth?.credentials.email} className="w-full h-12 px-5 text-sm text-dominant placeholder:text-compliment tracking-wider font-semibold outline-none border border-compliment bg-transparent rounded-full" />
                    <div>
                        <Link to="/profile/edit">
                            <button type="submit" className="w-full h-12 grid place-items-center bg-gradient-to-tr from-primary to-secondary rounded-full">
                                <span className="text-xs text-dominant font-bold tracking-widest uppercase">
                                    Update Credentials
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
                <p className="text-center text-sm text-red-500 font-medium tracking-wide">
                    Delete Account? <button onClick={toggleIsOpen} type="button" className="text-dominant font-semibold hover:underline">Click here</button>
                </p>
            </form>
        </section>
    );
};

export default Profile;
