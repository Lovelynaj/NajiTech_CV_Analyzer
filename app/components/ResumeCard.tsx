import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({resume:{id, companyName, jobTitle, feedback, imagePath}}:{resume: Resume}) => {
//console.log(ResumeCard);
    const {fs} = usePuterStore(); //from puter code we created
    const [resumeUrl, setResumeUrl] = useState('');

    //this helps fetching real data
    useEffect(() => {
        const loadResume =  async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;

            let url = URL.createObjectURL(blob)
            setResumeUrl(url);
        };

        loadResume();
    }, [imagePath]);

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">

            <div className="resume-card-header">
                <div className="flex flex-col gap-2">

                    {/*//CONDITION IF COMPANY NAME AND JOB TITLE IS NOT NULL*/}
                    {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                    {jobTitle  && <h3 className="text-lg text-gray-500 break-words">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="!text-black font-bold">CV</h2>}
                </div>

                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>

            {/*//WILL DISPLAY THOSE IMAGES WITH URL*/}
            {resumeUrl && (
                <div className="gradient-border animate-in fade-in duration-1000">
                    <div className="w-full h-full">
                        <img
                            src={resumeUrl}
                            alt="resume"
                            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"

                        />
                    </div>
                </div>
            )}
        </Link>
    );
};

export default ResumeCard;
