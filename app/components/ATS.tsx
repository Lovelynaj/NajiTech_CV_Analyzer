import React from 'react';

interface Suggestion {
    type: 'good' | 'improve';
    tip: string;
}

interface ATSProps {
    score: number;
    suggestions?: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions = [] }) => {
    // Determine background gradient based on the score
    const gradientClass =
        score > 69
            ? 'from-green-100'
            : score > 49
                ? 'from-yellow-100'
                : 'from-red-100';

    // Determine Icon based on the score
    const iconSrc =
        score > 69
            ? '/icons/ats-good.svg'
            : score > 49
                ? '/icons/ats-warning.svg'
                : '/icons/ats-bad.svg';

    // Determine subtitle based on the score
    const subtitle =
        score > 69
            ? 'Great Job!'
            : score > 49
                ? 'Good Start'
                : 'Needs Improvement';

    return (
        <div className={`bg-gradient-to-b ${gradientClass} to-white rounded-2xl shadow-md w-full p-6`}>
            {/* top section with icon and headline */}
            <div className="flex items-center gap-4 mb-6">
                <img src={iconSrc} alt="ATS Icon" className="w-12 h-12" />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        ATS Score - {score}/100
                    </h2>
                </div>
            </div>

            {/* Description section */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{subtitle}</h3>
                <p className="text-gray-600">
                    This score represents how well your resume is optimized for Applicant
                    Tracking Systems (ATS) used by employers.
                </p>
            </div>

            {/* Suggestions list */}
            <div className="space-y-3 mb-4">
                {suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <img
                            src={
                                suggestion.type === 'good'
                                    ? '/icons/check.svg'
                                    : '/icons/warning.svg'
                            }
                            alt={suggestion.type === 'good' ? 'Check' : 'Warning'}
                            className="w-5 h-5 mt-1"
                        />
                        <p
                            className={
                                suggestion.type === 'good'
                                    ? 'text-green-700'
                                    : 'text-amber-700'
                            }
                        >
                            {suggestion.tip}
                        </p>
                    </div>
                ))}
            </div>

            {/* Closing encouragement */}
            <p className="text-gray-700 italic">
                Keep refining your CV to improve your chance of getting past ATS
                filters and into the hands of recruiters.
            </p>
        </div>
    );
};

export default ATS;








//CHATGPT CODE HELP.
//Create a React component called ATS inside a file named ATS.tsx.
// The component should
//
// Take two props:
//
// score: number (0 - 100)
//
// suggestions: {type: "good" | "improve"; tip: string}[]
//
// Render a card with:
//
// A gradient background based on the score:
//
// from -green-100 if score > 69
//
// from-yellow-100 if score > 49
//
// from-red-100 otherwise
//
// A top section with:
//
// An icon (/icons/ats-good.svg, /icons/ats-warning.svg, or /icons/ats-bad.svg based on score )
//
// A headline showing ATS Score - {score}/100
//
// A description section with:
//
// A subtitle
//
// A gray paragraph of explanation
//
// A list of suggestions, each with an icon (/icons/check.svg or /icons/warning.svg) and a tip
//
// A closing line encouraging improvement