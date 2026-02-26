import { useState, useEffect, useCallback } from 'react';

interface IWindow extends Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
}

export const useWebSpeech = () => {
    const [isListening, setIsListening] = useState(false);
    const [interimTranscript, setInterimTranscript] = useState('');
    const [finalTranscript, setFinalTranscript] = useState('');
    const [recognition, setRecognition] = useState<any>(null);

    useEffect(() => {
        const SR = (window as unknown as IWindow).SpeechRecognition || (window as unknown as IWindow).webkitSpeechRecognition;
        if (!SR) { console.warn('Speech Recognition not supported.'); return; }
        const recog = new SR();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = 'en-US';
        recog.onresult = (event: any) => {
            let interim = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) setFinalTranscript(p => p + event.results[i][0].transcript + ' ');
                else interim += event.results[i][0].transcript;
            }
            setInterimTranscript(interim);
        };
        recog.onerror = () => setIsListening(false);
        recog.onend = () => setIsListening(false);
        setRecognition(recog);
    }, []);

    const toggleListening = useCallback(() => {
        if (isListening) { recognition?.stop(); setIsListening(false); }
        else {
            setInterimTranscript('');
            try { recognition?.start(); setIsListening(true); } catch (e) { console.error(e); }
        }
    }, [isListening, recognition]);

    const resetTranscript = useCallback(() => {
        setFinalTranscript(''); setInterimTranscript('');
    }, []);

    return { isListening, interimTranscript, finalTranscript, toggleListening, resetTranscript };
};

// ── Types ─────────────────────────────────────────────────────────────────────
export type Message = { sender: 'ai' | 'user' | 'system'; text: string; timestamp: Date };

export interface PersonalizedQuestion {
    id: number;
    text: string;
    topic: string;
    skill: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    followUps: string[];
}

// ── Resume-personalised question bank ────────────────────────────────────────
const QUESTION_BANK: Record<string, PersonalizedQuestion[]> = {
    React: [
        { id: 1, text: 'You listed React on your resume. Can you explain the difference between controlled and uncontrolled components?', topic: 'Frontend', skill: 'React', difficulty: 'Medium', followUps: ['How do refs relate to uncontrolled components?', 'When would you prefer one over the other?'] },
        { id: 2, text: 'Given your React experience, walk me through how you would optimise a component that re-renders too frequently.', topic: 'Performance', skill: 'React', difficulty: 'Hard', followUps: ['What is the difference between useMemo and useCallback?'] },
    ],
    TypeScript: [
        { id: 3, text: 'Your resume shows TypeScript experience. Can you explain what a generic type is and give me a practical example?', topic: 'Languages', skill: 'TypeScript', difficulty: 'Medium', followUps: ['How are generics different from the any type?'] },
    ],
    'Spring Boot': [
        { id: 4, text: 'You have Spring Boot on your resume. How does dependency injection work in Spring? Walk me through an example.', topic: 'Backend', skill: 'Spring Boot', difficulty: 'Medium', followUps: ['What is the difference between @Component, @Service, and @Repository?'] },
    ],
    'Data Structures': [
        { id: 5, text: 'Given an array of integers, return the two indices that sum to a given target. Walk me through your approach before coding.', topic: 'DSA', skill: 'Data Structures', difficulty: 'Medium', followUps: ['Can you optimise beyond O(N²)?', 'What is the time complexity of your HashMap approach?'] },
    ],
    Python: [
        { id: 6, text: 'Your resume lists Python. What is the difference between a list and a generator in Python, and when would you use each?', topic: 'Languages', skill: 'Python', difficulty: 'Easy', followUps: ['How does lazy evaluation help with large datasets?'] },
    ],
    'System Design': [
        { id: 7, text: 'I see System Design on your resume. Walk me through how you would design a URL shortener like bit.ly.', topic: 'System Design', skill: 'System Design', difficulty: 'Hard', followUps: ['How would you handle 1 million requests per second?', 'Where would you use a cache?'] },
    ],
};

const DEFAULT_QUESTIONS: PersonalizedQuestion[] = [
    { id: 99, text: 'Tell me about yourself and your most challenging technical project.', topic: 'General', skill: 'General', difficulty: 'Easy', followUps: ['What technology choices would you change in hindsight?'] },
    { id: 100, text: 'Given an array of integers, return the two indices that sum to a target value.', topic: 'DSA', skill: 'Data Structures', difficulty: 'Medium', followUps: ['Can you do it in O(N)?'] },
];

function buildPersonalizedQueue(skills: string[]): PersonalizedQuestion[] {
    const queue: PersonalizedQuestion[] = [];
    skills.forEach(skill => {
        const qs = QUESTION_BANK[skill];
        if (qs) queue.push(...qs.slice(0, 1)); // 1 question per skill
    });
    if (queue.length === 0) return DEFAULT_QUESTIONS;
    return queue;
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export const useInterviewWebSocket = (skills: string[] = []) => {
    const [isConnected, setIsConnected] = useState(false);
    const [aiStatus, setAiStatus] = useState<'Listening' | 'Speaking' | 'Thinking'>('Listening');
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<PersonalizedQuestion | null>(null);
    const [questionQueue, setQuestionQueue] = useState<PersonalizedQuestion[]>([]);
    const [questionIdx, setQuestionIdx] = useState(0);
    const [isPersonalized, setIsPersonalized] = useState(false);

    useEffect(() => {
        const queue = buildPersonalizedQueue(skills);
        setQuestionQueue(queue);
        setIsPersonalized(skills.length > 0);

        setTimeout(() => {
            setIsConnected(true);
            setMessages([{ sender: 'system', text: 'WebSocket Connected', timestamp: new Date() }]);
            setAiStatus('Thinking');

            setTimeout(() => {
                const first = queue[0];
                setAiStatus('Speaking');
                setCurrentQuestion(first);
                setMessages(prev => [...prev, { sender: 'ai', text: first.text, timestamp: new Date() }]);
                setTimeout(() => setAiStatus('Listening'), 3000);
            }, 1500);
        }, 800);

        return () => setIsConnected(false);
    }, []);

    const advanceToNextQuestion = useCallback(() => {
        setQuestionIdx(prev => {
            const next = prev + 1;
            if (next < questionQueue.length) {
                const q = questionQueue[next];
                setAiStatus('Thinking');
                setTimeout(() => {
                    setAiStatus('Speaking');
                    setCurrentQuestion(q);
                    setMessages(m => [...m, { sender: 'ai', text: q.text, timestamp: new Date() }]);
                    setTimeout(() => setAiStatus('Listening'), 3000);
                }, 1500);
            }
            return next;
        });
    }, [questionQueue]);

    const sendUserMessage = useCallback((text: string) => {
        if (!text.trim()) return;
        setMessages(prev => [...prev, { sender: 'user', text, timestamp: new Date() }]);
        setAiStatus('Thinking');

        setTimeout(() => {
            const followUps = currentQuestion?.followUps ?? [];
            const hasMore = questionIdx + 1 < questionQueue.length;

            // 50% chance to ask a follow-up, else advance
            if (followUps.length > 0 && Math.random() > 0.5) {
                const fu = followUps[Math.floor(Math.random() * followUps.length)];
                setAiStatus('Speaking');
                setMessages(m => [...m, { sender: 'ai', text: fu, timestamp: new Date() }]);
                setTimeout(() => setAiStatus('Listening'), 2500);
            } else if (hasMore) {
                setMessages(m => [...m, { sender: 'ai', text: "Great, let's move on.", timestamp: new Date() }]);
                setTimeout(() => advanceToNextQuestion(), 1200);
            } else {
                setAiStatus('Speaking');
                setMessages(m => [...m, { sender: 'ai', text: 'That covers our questions for today. Well done! Click "End Interview" to see your report.', timestamp: new Date() }]);
                setTimeout(() => setAiStatus('Listening'), 2500);
            }
        }, 2000);
    }, [currentQuestion, questionIdx, questionQueue, advanceToNextQuestion]);

    return {
        isConnected, aiStatus, messages, currentQuestion,
        questionQueue, questionIdx, isPersonalized,
        sendUserMessage, advanceToNextQuestion,
    };
};
