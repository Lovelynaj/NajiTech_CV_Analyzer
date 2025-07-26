//AI HELP by Bito AI

import React from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from './Accordion';
import { cn } from "~/utils";

// Feedback type
interface Tip {
    type: 'good' | 'improve';
    tip: string;
    explanation: string;
}

interface Feedback {
    toneAndStyle: { score: number; tips: Tip[] };
    content: { score: number; tips: Tip[] };
    structure: { score: number; tips: Tip[] };
    skills: { score: number; tips: Tip[] };
}

// SVG Icons as inline components
const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
    </svg>
);

const WarningIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M8.257 3.099c.765-1.36 2.68-1.36 3.446 0l6.518 11.596c.75 1.336-.213 3.005-1.723 3.005H3.462c-1.51 0-2.473-1.669-1.723-3.005L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V7a1 1 0 112 0v3a1 1 0 01-1 1z" />
    </svg>
);

const CrossIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-10.464a1 1 0 00-1.414-1.414L10 8.586 7.879 6.464a1 1 0 00-1.414 1.414L8.586 10l-2.121 2.121a1 1 0 101.414 1.415L10 11.414l2.121 2.122a1 1 0 001.415-1.415L11.414 10l2.122-2.121z"
            clipRule="evenodd"
        />
    </svg>
);

// ScoreBadge Component
const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
    let badgeColor = '';
    let textColor = '';
    let IconComponent: React.FC<{ className?: string }>;

    if (score > 70) {
        badgeColor = 'bg-badge-green';
        textColor = 'text-green-600';
        IconComponent = CheckIcon;
    } else if (score > 49) {
        badgeColor = 'bg-badge-yellow';
        textColor = 'text-yellow-600';
        IconComponent = WarningIcon;
    } else {
        badgeColor = 'bg-badge-red';
        textColor = 'text-red-600';
        IconComponent = CrossIcon;
    }

    return (
        <div className={cn("flex items-center gap-2 ml-2 px-4 py-1.5 rounded-full", badgeColor)}>
            <span className={cn("font-medium text-sm", textColor)}>{score}/100</span>
            <IconComponent className={cn("w-4 h-4", textColor)} />
        </div>
    );
};

// Main Details Component
const Details: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
    return (
        <Accordion>
            <AccordionItem>
                <AccordionHeader>
                    <CategoryHeader title="Tone and Style" categoryScore={feedback.toneAndStyle.score} />
                </AccordionHeader>
                <AccordionContent>
                    <CategoryContent tips={feedback.toneAndStyle.tips} />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem>
                <AccordionHeader>
                    <CategoryHeader title="Content" categoryScore={feedback.content.score} />
                </AccordionHeader>
                <AccordionContent>
                    <CategoryContent tips={feedback.content.tips} />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem>
                <AccordionHeader>
                    <CategoryHeader title="Structure" categoryScore={feedback.structure.score} />
                </AccordionHeader>
                <AccordionContent>
                    <CategoryContent tips={feedback.structure.tips} />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem>
                <AccordionHeader>
                    <CategoryHeader title="Skills" categoryScore={feedback.skills.score} />
                </AccordionHeader>
                <AccordionContent>
                    <CategoryContent tips={feedback.skills.tips} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

// CategoryHeader Component
const CategoryHeader: React.FC<{ title: string; categoryScore: number }> = ({ title, categoryScore }) => {
    return (
        <div className="flex justify-between items-center w-full">
            <h3 className="text-base md:text-lg font-semibold">{title}</h3>
            <ScoreBadge score={categoryScore} />
        </div>
    );
};

// CategoryContent Component
const CategoryContent: React.FC<{ tips: Tip[] }> = ({ tips }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {tips.map((tip, index) => {
                const Icon = tip.type === 'good' ? CheckIcon : WarningIcon;
                const bgColor = tip.type === 'good' ? 'bg-green-50' : 'bg-yellow-50';
                const iconColor = tip.type === 'good' ? 'text-green-600' : 'text-yellow-600';

                return (
                    <div key={index} className="flex items-start gap-3 p-4 border rounded-lg bg-white shadow-sm">
                        <Icon className={`w-6 h-6 mt-1 ${iconColor}`} />
                        <div>
                            <h4 className="font-semibold text-sm mb-1">{tip.tip}</h4>
                            <div className={cn('mt-2 p-3 rounded-md text-sm text-gray-700', bgColor)}>
                                {tip.explanation}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Details;




//PROMPT TO USE
// Create a Details React component that is Details.tsx that should:
// Take a feedback prop of type Feedback (assum's it's imported or globally defined)
//
// Display an accordion with 4 sections:
//
// Tone and Style
// Content
// Structure
// Skills
//
// Each section includes:
// A header with a title and score badge
// A content section with tips (each having type: "good" | "improve", tip: string, and explanation: string)
//
//
// Create the following helper components inside the same file:
//
// ScoreBadge: takes a score: number and shows a colored badge with:
// green background and check icon if score > 69
// yellow if > 39
// red otherwise
//
// Text displays {score}/100 with matching text color.
//
// CategoryHeader: takes title: string and categoryScore: number, renders a title and ScoreBadge side by side
//
// CategoryContent: takes an array of tips and renders;
// a two column grid howing each tip with an icon and text
// a list of explanation boxes, styled differently for "good" vs "improve" tips.
//
// Use Tailwind CSS Classes throughout. use cn() utility for class merging.
// Assume Accordion, AccordionItem, AccordionHeader, and AccordionContent are imported from ../Accordion