import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cvmind" },
    { name: "description", content: "Smart CV feedback for your dream job!" },
  ];
}

export default function Home() {

  const {auth} = usePuterStore(); //from puter code we created
  //Handles redirection if the user is already Signed In
  const navigate = useNavigate(); //from react-router

  // useEffect(() => {
  //   //since not authenticated, we first send users to auth page
  //   // and after authenticate, next page is home page.
  //   if(!auth.isAuthenticated) navigate('/auth?next=/');
  // }, [auth.isAuthenticated]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }, [auth.isAuthenticated, navigate]);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Easy Track Your CV  <br/> Applications & Ratings</h1>
        <h2>Smart AI feedback for every CV you submit — with CVMind.</h2>
      </div>

      {/*//map an arrays that contains different kinds of CVs.*/}
      {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
      )}
    </section>
  </main>;
}
