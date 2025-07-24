import React, {type FormEvent} from 'react'
import Navbar from "~/components/Navbar";
import {useState} from "react";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/utils";
import {prepareInstructions} from "../../constants";


const Upload = () => {
    //fs = file storage, kv = key value storage functions
    const {auth, isLoading, fs, ai, kv} = usePuterStore();

    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null); // can be file or null

    //handles the uploads
    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleAnalyze = async ({companyName, jobTitle, jobDescription, file} : {companyName: string, jobTitle: string, jobDescription: string, file: File}) => {
        setIsProcessing(true); //shows nicer animation
        setStatusText("Uploading the file...");

        //Uploading the file to our Puter storage
        const uploadedFile = await fs.upload([file]); //fs coming from puterStore

        if(!uploadedFile) return setStatusText("Error: Failed to upload file");

        setStatusText("Converting to image...");

        //Convert the image
        const imageFile = await convertPdfToImage(file);

        if(!imageFile.file) return setStatusText("Error: Failed to convert PDF to image");

        setStatusText("Uploading the image...");

        //also wants to upload the image
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText("Error: Failed to upload image");

        setStatusText("Preparing data...");

        //generate a new id just for the ai analyses
        const uuid = generateUUID() // import this from
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: "",
        }

        await kv.set(`resume: ${uuid}`, JSON.stringify(data));

        setStatusText("Analyzing....");

        //ai feedback
        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })

        ) //This function coming directly from puter

        if(!feedback) return setStatusText("Error: Failed to analyze CV");

        const feedbackText = typeof feedback.message.content === "string" ?
            feedback.message.content
        :
            feedback.message.content[0].text; //to extract the text from the Array

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume: ${uuid}`, JSON.stringify(data));

        setStatusText("Analysis complete, redirecting...");

        console.log(data); //show all the data.

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //prevents the browser default behaviour

        //get access to the entire form
        //allow us to get data without relying on states.
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        //we can then extract the form details like the company-name, job-title etc.
        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        //lets console log and see if we have access to all the data above as well as the file when we uploaded
        // console.log({
        //     companyName, jobTitle, jobDescription, file
        // });

        if(!file) return;

        handleAnalyze({companyName, jobTitle, jobDescription, file})



    }
    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your CV</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full"/>
                        </>
                    ) : (
                            <h2>Drop your CV for an ATS score and improvement tips</h2>
                    )}

                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" id="company-name" name="company-name" placeholder="Company Name" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" id="job-title" name="job-title" placeholder="Job Title" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} id="job-description" name="job-description" placeholder="Job Description" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Upload CV</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button type="submit" className="primary-button">
                                Analyze CV
                            </button>

                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
