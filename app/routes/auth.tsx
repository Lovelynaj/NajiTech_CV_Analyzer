import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    {title: 'Cvmind | Auth'},
    {name: 'description', content: 'Log into your account'},
])
const Auth = () => {
    const {isLoading, auth} = usePuterStore(); //from puter code we created

    //Handles redirection if the user is already Signed In

    //new URLSearchParams is a built-in JavaScript class that helps you easily read query parameters.
    //location.search = gives you just the query part of the URL (the bit after the ? in "?next=/"):
    const location = useLocation(); //from reacr-router
    const queryParams = new URLSearchParams(location.search);

    // Back to home if no `next` param
    // const next = queryParams.get('next') || '/';
    const next = queryParams.get('next');

    //from react-router
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) {
            navigate(next);
        }
    }, [auth.isAuthenticated, next, navigate]);


    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col gap-2 items-center text-center">
                        <h1>Welcome</h1>
                        <h2>Sign In to Continue Your Career Path</h2>
                    </div>

                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in...</p>
                            </button>
                        ): (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        <p>Sign Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        <p>Sign In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}
export default Auth
