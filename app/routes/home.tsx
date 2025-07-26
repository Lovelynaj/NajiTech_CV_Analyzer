import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cvmind" },
    { name: "description", content: "Smart CV feedback for your dream job!" },
  ];
}

export default function Home() {

  const {auth, kv} = usePuterStore(); //from puter code we created
  //Handles redirection if the user is already Signed In
  const navigate = useNavigate(); //from react-router
  const [resumes, setResumes] = useState<Resume[]>([]); //from react
  const [loadingResumes, setLoadingResumes] = useState(false); //from react





  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }, [auth.isAuthenticated, navigate]);


  //useEffect to fect all the resumes.
  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      //list() will list all the resumes and * means all.
      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      //parse all the resumes
      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      console.log("parsedResumes: ", parsedResumes);

      //set state
      setResumes(parsedResumes || []);
      setLoadingResumes(false); // after we no longer loading the resumes.
    }
    loadResumes();
  }, []);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Easy Track Your CV  <br/> Applications & Ratings</h1>
        {/*//SHOW LOADING STATE WHILE LOADING OR SHOW UPLOAD BUTTON*/}
        {!loadingResumes && resumes?.length === 0 ? (
            <h2>No CVs found. Upload your first CV to get feedback</h2>
        ) : (
            <h2>Smart AI feedback for every CV you submit — with CVMind.</h2>
        )}
      </div>

      {/*//SHOW LOADING gif-image WHILE LOADING AFTER FIRST TIME-SIGNED IN*/}
      {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img
            src="/images/resume-scan-2.gif"
            className="w-[200px]"/>
          </div>
      )}


      {/*//map an arrays that contains different kinds of CVs.*/}
      {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
      )}

      {/*//CHECK IF YOUR ARE NOT CURRENTLY LOADING, SHOW CV UPLOAD BUTTON*/}
      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">Upload CV</Link>
          </div>
      )}
    </section>
  </main>;
}
