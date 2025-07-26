

import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from './ScoreBadge';

//INSIDE COMPONENT
const Category = ({title, score}: {title: string, score: number}) => {

    //Show a specific color based on the score
    const textColor =
        score > 70 ? 'text-green-600'
            :
        score > 49 ? 'text-yellow-600'
            :
            'text-red-600';


    return (
        <div className="resume-summary">
            {/*//RENDERS THE CRITERIA USED TO RATE THE CV*/}
            <div className="category">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-2xl">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-2xl">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    )
}

const Summary = ({feedback}: {feedback: Feedback}) => {
    console.log(feedback);
    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row items-center p-4 gap-8">
                {/*//SHOW OVERALL SCORE*/}
                <ScoreGauge score={feedback.overallScore}/>

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Your CV Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>
            {/*//RENDERS THE CRITERIA USED TO RATE THE CV*/}

            {/*//CV Tone and Style*/}
            {/*Note: The Category above already has a <div tag*/}
            <Category
                title="Tone and Style"
                score={feedback.toneAndStyle.score} />

            {/*//CV Content*/}
            <Category
                title="Content"
                score={feedback.content.score} />

            {/*//CV Structure*/}
            <Category
                title="Structure"
                score={feedback.structure.score} />

            {/*//CV Skills*/}
            <Category
                title="Skills"
                score={feedback.skills.score} />

        </div>


    )
}
export default Summary
