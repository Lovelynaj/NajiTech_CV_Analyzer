

import {data, Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => ([
    {title: 'Cvmind | Review'},
    {name: 'description', content: 'Detailed overview of your CV'},
])

const Resume = () => {
    //using puterStore
    const {auth, isLoading, fs, kv} = usePuterStore();
    //How to extract the resume id using useParams() from react-router
    const {id} = useParams();

    //states for the [imageUrl, resumeUrl and feedback] all set to empty strings
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null); //to fix nulll later...

    //get Navigate() from react-router
    const navigate = useNavigate();

    //Checking the Authentication
    //we redirect the user to their specific resume page with their specific id
    //if they are already authenticated.
    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate(`/auth?next=/resume/${id}`);
        }
    }, [isLoading, navigate]);


    //let use useEffect to load the imageUrl && resumeUrl
    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);
            if(!resume) return;
            const data = JSON.parse(resume);


            //A: RESUME BLOB
            //You can read file using Blob
            //A Blob (Binary Large Object) is a built-in JavaScript object that represents immutable raw binary data,
            // such as files, images, audio, or video.
            // It's used primarily in web development to handle file-like objects, especially for reading, writing, or uploading data.
            // It's often used to:
            // Store file data (text, images, etc.), Create downloadable content, Pass binary data around (e.g., for APIs or file uploads)
            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;
            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            //from the pdfBlob above, we can extract the resumeUrl
            const resumeUrl = URL.createObjectURL(pdfBlob);
            //then we can set a state and use them here..
            //states for the [imageUrl, resumeUrl and feedback] is set above
            //and now we can store it
            setResumeUrl(resumeUrl);


            //B: IMAGE BLOB
            //repeat same for the images
            const imageBlob = await fs.read(data.imagePath);
            // console.log("Image path:", data.imagePath);

            if(!imageBlob) return;
            // const actualImageBlob = new Blob([imageBlob], { type: 'image/png' });
            //from the imageUrl above, we can extract the resumeUrl
            const imageUrl = URL.createObjectURL(imageBlob);
            //then we can set a state and use them here..
            //states for the [imageUrl] is set above
            //and now we can store it
            setImageUrl(imageUrl);

            //setFeedback(data.feedback);


            //-------------------------------------------------------------------------------------->
            //HELP FROM CHATGPT....
            //C: TRANSFORM RAW FEEDBACK INTO EXPECTED STRUCTURE
            if (data.feedback) {
                const raw = data.feedback;

                // Map the raw keys from backend to expected `Feedback` interface
                const mappedFeedback: Feedback = {
                    overallScore: raw.overall_rating || 0,
                    ATS: {
                        score: raw.ats_compatibility || 0,
                        tips: raw.detailed_feedback?.ats_tips || [],
                    },
                    toneAndStyle: {
                        score: raw.tone_and_style || 0,
                        tips: raw.detailed_feedback?.tone_tips || [],
                    },
                    content: {
                        score: raw.content_relevance || 0,
                        tips: raw.detailed_feedback?.content_tips || [],
                    },
                    structure: {
                        score: raw.format_and_design || 0,
                        tips: raw.detailed_feedback?.structure_tips || [],
                    },
                    skills: {
                        score: raw.skills_match || 0,
                        tips: raw.detailed_feedback?.skills_tips || [],
                    },
                };

                // now pass correctly structured feedback
                setFeedback(mappedFeedback);
            } else {
                console.error("No feedback data found");
            }

            //-------------------------------------------------------------------------------------------->


            //check your data results
            console.log({resumeUrl, imageUrl, feedback: data.feedback});
        }

        //call the loadResume
        loadResume();
    }, [id]); //the id to fetch


    return (
        <main className="!pt-0 ">
            <nav className="resume-nav">
                <Link className="back-button" to="/">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>

            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                {/*//RESUME IMAGE  (LEFT-SIDE) SECTION*/}
                <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                {/*//fetch the image from PuterStorage*/}
                                <img src={imageUrl} alt="CV-image" title="resume" className="w-full h-full object-contain rounded-2xl" />
                            </a>
                        </div>
                    )}

                </section>

                {/*//RESUME REVIEW (RIGHT-SIDE) SECTION*/}
                <section className="feedback-section">
                    <h2 className="text-4xl !text-black font-bold">CV Review</h2>
                    {/*check if feeback is accessible*/}
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            {/*//SHOW CV SUMMARY*/}
                            <Summary feedback={feedback} />

                            {/*//SHOW CV ATS SCORE*/}
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />

                            {/*//SHOW CV DETAILS*/}
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        <img src="/images/resume-scan-2.gif" className="w-full"/>
                    )}

                </section>
            </div>
        </main>
    )
}
export default Resume
