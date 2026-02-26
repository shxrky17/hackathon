import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Download, Brain, MessageSquare, TrendingUp,
    AlertCircle, CheckCircle, Lightbulb, ChevronDown, ChevronUp,
    RefreshCw, BookOpen, Target, Star, GitCompare, ArrowRight,
    Mic, Code2, Cpu, BarChart2, Award, Zap, Volume2, ClipboardList, Users
} from 'lucide-react';
import './Report.css';

// ── Score Data ─────────────────────────────────────────────────────────────────
const reportData = {
    role: 'Frontend Engineer', date: 'February 26, 2026', duration: '43m 12s',

    overall: 88,

    technical: {
        score: 92,
        breakdown: [
            { label: 'Code Correctness', score: 95, max: 100, note: 'All 3 test cases passed on first submit.' },
            { label: 'Time Complexity', score: 90, max: 100, note: 'Correctly identified O(N) solution using HashMap.' },
            { label: 'Space Complexity', score: 80, max: 100, note: 'O(N) space — could explore O(1) two-pointer alternative.' },
            { label: 'Code Readability', score: 88, max: 100, note: 'Clean, well-structured. Minor naming improvements needed.' },
            { label: 'Edge Case Handling', score: 70, max: 100, note: 'Missing null return for no-result scenario.' },
            { label: 'Best Practices', score: 92, max: 100, note: 'No magic numbers, modular logic, correct language idioms.' },
        ],
    },

    communication: {
        score: 85,
        breakdown: [
            { label: 'Problem Articulation', score: 92, max: 100, note: 'Restated the problem clearly and confirmed constraints upfront.' },
            { label: 'Thought Narration', score: 88, max: 100, note: 'Consistently walked through logic before and during coding.' },
            { label: 'Technical Vocabulary', score: 80, max: 100, note: 'Good use of terms like HashMap, complement, iteration.' },
            { label: 'Response to Follow-ups', score: 75, max: 100, note: 'Slightly hesitant under direct complexity-analysis questions.' },
            { label: 'Confidence & Clarity', score: 82, max: 100, note: 'Confident overall; minor uncertainty when pressed on trade-offs.' },
            { label: 'Active Listening', score: 90, max: 100, note: 'Acknowledged and incorporated AI interviewer hints effectively.' },
        ],
    },

    logicalAnalysis: {
        summary: 'The candidate showed a structured approach — quickly moving from brute-force to an optimal O(N) solution and clearly articulating each decision.',
        steps: [
            { phase: 'Problem Understanding', rating: 5, detail: 'Re-stated the problem, confirmed edge cases (empty array, no solution, duplicates).' },
            { phase: 'Initial Approach', rating: 3, detail: 'Started with brute-force O(N²). Recognized inefficiency and self-corrected.' },
            { phase: 'Optimization', rating: 5, detail: 'Arrived at HashMap O(N) solution independently with clear reasoning.' },
            { phase: 'Code Implementation', rating: 4, detail: 'Clean code. Minor issues (unused variable, missing null return). All tests passed.' },
            { phase: 'Communication', rating: 4, detail: 'Narrated well. Slight hesitation explaining Big-O under direct questioning.' },
        ],
    },

    strengths: [
        'Excellent React component lifecycle understanding.',
        'Clear articulation of state management trade-offs.',
        'Arrived at O(N) time complexity independently.',
    ],
    improvements: [
        'Handle edge cases before writing core logic.',
        'More confidence explaining time/space complexity under pressure.',
    ],

    codeAnalysis: {
        issues: ['Missing return null for no-solution case.', 'Variable naming could be more descriptive.'],
        solutions: [
            {
                label: 'Your Submission', tag: 'submitted', timeComplexity: 'O(N)', spaceComplexity: 'O(N)',
                verdict: 'Optimal', verdictColor: 'emerald',
                description: 'Single-pass HashMap approach — checks complement before inserting current element.',
                code: `function twoSum(nums, target) {\n  const map = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map[complement] !== undefined) return [map[complement], i];\n    map[nums[i]] = i;\n  }\n  return null;\n}`,
                highlights: [],
            },
            {
                label: 'Two-Pointer (Sorted)', tag: 'alt1', timeComplexity: 'O(N log N)', spaceComplexity: 'O(1)',
                verdict: 'Space Optimal', verdictColor: 'blue',
                description: 'Sort with index tracking, then converge pointers. O(1) space at cost of sort step.',
                code: `function twoSum(nums, target) {\n  const idx = nums.map((n, i) => [n, i]).sort((a, b) => a[0] - b[0]);\n  let l = 0, r = idx.length - 1;\n  while (l < r) {\n    const s = idx[l][0] + idx[r][0];\n    if (s === target) return [idx[l][1], idx[r][1]];\n    s < target ? l++ : r--;\n  }\n  return null;\n}`,
                highlights: ['O(1) extra space', 'Requires sort step', 'Index remapping needed'],
            },
            {
                label: 'Functional (reduce)', tag: 'alt2', timeComplexity: 'O(N)', spaceComplexity: 'O(N)',
                verdict: 'Idiomatic', verdictColor: 'purple',
                description: 'Declarative rewrite using Array.reduce — no mutation, same complexity as your solution.',
                code: `function twoSum(nums, target) {\n  const { result } = nums.reduce(({ map, result }, num, i) => {\n    if (result) return { map, result };\n    const comp = target - num;\n    if (map[comp] !== undefined) return { map, result: [map[comp], i] };\n    return { map: { ...map, [num]: i }, result: null };\n  }, { map: {}, result: null });\n  return result;\n}`,
                highlights: ['Declarative', 'No mutation', 'Higher memory overhead'],
            },
        ],
    },

    followUpQuestions: [
        { question: 'How would you modify your solution if the same element cannot be used twice?', difficulty: 'Easy', topic: 'Arrays' },
        { question: 'How would you solve this if the array was too large to fit in memory?', difficulty: 'Hard', topic: 'System Design' },
        { question: 'Can you implement the same logic using Array.prototype.reduce?', difficulty: 'Medium', topic: 'Functional JS' },
        { question: 'How would you return ALL pairs that sum to the target, not just the first?', difficulty: 'Medium', topic: 'Data Structures' },
    ],

    personalisation: {
        skills: ['React', 'TypeScript', 'Spring Boot', 'Data Structures'],
        questionsAsked: [
            { skill: 'React', question: 'Controlled vs Uncontrolled components', difficulty: 'Medium' },
            { skill: 'Data Structures', question: 'Two Sum — HashMap approach', difficulty: 'Medium' },
            { skill: 'TypeScript', question: 'Generic types with practical examples', difficulty: 'Medium' },
        ],
    },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const DifficultyBadge: React.FC<{ level: string }> = ({ level }) => {
    const c: Record<string, string> = {
        Easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        Hard: 'bg-red-500/15 text-red-400 border-red-500/30',
    };
    return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${c[level] ?? ''}`}>{level}</span>;
};

const StarRating: React.FC<{ value: number }> = ({ value }) => (
    <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} className={i < value ? 'text-amber-400 fill-amber-400' : 'text-gray-700 fill-gray-700'} />
        ))}
    </div>
);

const verdictCls: Record<string, string> = {
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
};

const ScoreBar: React.FC<{ score: number; max: number; color: string }> = ({ score, max, color }) => {
    const pct = (score / max) * 100;
    return (
        <div className="h-2 w-full rounded-full bg-gray-800 overflow-hidden">
            <div
                className={`h-full rounded-full transition-all duration-700 ${color}`}
                style={{ width: `${pct}%` }}
            />
        </div>
    );
};

// ── Component ─────────────────────────────────────────────────────────────────
const Report: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [expandedStep, setExpandedStep] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [generatingMore, setGeneratingMore] = useState(false);
    const [extraQuestions, setExtraQuestions] = useState<typeof reportData.followUpQuestions>([]);

    const generateMoreQuestions = () => {
        setGeneratingMore(true);
        setTimeout(() => {
            setExtraQuestions([
                { question: 'How would your solution handle negative numbers?', difficulty: 'Easy', topic: 'Edge Cases' },
                { question: 'Describe how you would unit-test the twoSum function.', difficulty: 'Medium', topic: 'Testing' },
            ]);
            setGeneratingMore(false);
        }, 1800);
    };

    const allQuestions = [...reportData.followUpQuestions, ...extraQuestions];
    const sol = reportData.codeAnalysis.solutions[activeTab];

    const SectionHeader: React.FC<{ icon: React.ReactNode; bg: string; title: string; sub: string }> = ({ icon, bg, title, sub }) => (
        <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>{icon}</div>
            <div><h2 className="text-xl font-bold">{title}</h2><p className="text-sm text-gray-500">{sub}</p></div>
        </div>
    );

    return (
        <div className="report-container animation-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors" onClick={() => navigate('/dashboard')}>
                    <ChevronLeft size={20} /> Back to Dashboard
                </button>
                <button className="secondary-btn flex items-center gap-2 !py-2 text-sm"><Download size={16} /> Export PDF</button>
            </div>

            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Interview <span className="gradient-text">Feedback Report</span></h1>
                <p className="text-gray-400">Session #{id} · {reportData.role} · {reportData.date} · {reportData.duration}</p>
            </div>

            {/* ── Overall Score Banner ──────────────────────────────────────── */}
            <div className="glass-panel p-8 mb-6 flex items-center gap-10">
                {/* Big ring */}
                <div className="relative w-32 h-32 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1f2937" strokeWidth="2.5" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none" stroke="url(#og)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={`${reportData.overall}, 100`} />
                        <defs><linearGradient id="og" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient></defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">{reportData.overall}</span>
                        <span className="text-xs text-gray-500">/ 100</span>
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                        Overall Score <Award size={22} className="text-amber-400" />
                    </h2>
                    <p className="text-gray-400 text-sm mb-5">Strong performance. Two minor areas to address before your next interview.</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                                <Code2 size={16} className="text-violet-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Technical</p>
                                <p className="font-bold text-violet-300">{reportData.technical.score}<span className="text-gray-600 font-normal text-xs">/100</span></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center shrink-0">
                                <Volume2 size={16} className="text-blue-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Communication</p>
                                <p className="font-bold text-blue-300">{reportData.communication.score}<span className="text-gray-600 font-normal text-xs">/100</span></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
                                <Brain size={16} className="text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Logical Reasoning</p>
                                <p className="font-bold text-indigo-300">89<span className="text-gray-600 font-normal text-xs">/100</span></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                <Zap size={16} className="text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Problem Speed</p>
                                <p className="font-bold text-emerald-300">85<span className="text-gray-600 font-normal text-xs">/100</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SECTION 1: Technical Score Breakdown ─────────────────────── */}
            <section className="glass-panel p-8 mb-6">
                <SectionHeader
                    icon={<Code2 size={20} className="text-violet-400" />}
                    bg="bg-violet-500/20 border border-violet-500/30"
                    title="Technical Score Breakdown"
                    sub={`Overall Technical: ${reportData.technical.score}/100`}
                />
                <div className="space-y-5">
                    {reportData.technical.breakdown.map((item, i) => (
                        <div key={i} className="grid grid-cols-[1fr_60px] gap-4 items-start">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-200">{item.label}</span>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm font-bold ${item.score >= 85 ? 'text-emerald-400' : item.score >= 70 ? 'text-amber-400' : 'text-red-400'}`}>
                                            {item.score}%
                                        </span>
                                    </div>
                                </div>
                                <ScoreBar score={item.score} max={item.max}
                                    color={item.score >= 85 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : item.score >= 70 ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 'bg-gradient-to-r from-red-500 to-red-400'} />
                                <p className="text-xs text-gray-500 mt-1.5">{item.note}</p>
                            </div>
                            <div className={`text-center py-1.5 rounded-lg text-xs font-bold border ${item.score >= 85 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : item.score >= 70 ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                                {item.score >= 85 ? 'Good' : item.score >= 70 ? 'Fair' : 'Weak'}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SECTION 2: Communication Score Breakdown ─────────────────── */}
            <section className="glass-panel p-8 mb-6">
                <SectionHeader
                    icon={<Volume2 size={20} className="text-blue-400" />}
                    bg="bg-blue-500/20 border border-blue-500/30"
                    title="Communication Score Breakdown"
                    sub={`Overall Communication: ${reportData.communication.score}/100`}
                />
                <div className="space-y-5">
                    {reportData.communication.breakdown.map((item, i) => (
                        <div key={i} className="grid grid-cols-[1fr_60px] gap-4 items-start">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-200">{item.label}</span>
                                    <span className={`text-sm font-bold ${item.score >= 85 ? 'text-emerald-400' : item.score >= 70 ? 'text-amber-400' : 'text-red-400'}`}>
                                        {item.score}%
                                    </span>
                                </div>
                                <ScoreBar score={item.score} max={item.max}
                                    color={item.score >= 85 ? 'bg-gradient-to-r from-blue-500 to-blue-400' : item.score >= 70 ? 'bg-gradient-to-r from-amber-500 to-amber-400' : 'bg-gradient-to-r from-red-500 to-red-400'} />
                                <p className="text-xs text-gray-500 mt-1.5">{item.note}</p>
                            </div>
                            <div className={`text-center py-1.5 rounded-lg text-xs font-bold border ${item.score >= 85 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : item.score >= 70 ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                                {item.score >= 85 ? 'Good' : item.score >= 70 ? 'Fair' : 'Weak'}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SECTION 3: Resume-Personalised Summary ───────────────────── */}
            <section className="glass-panel p-8 mb-6">
                <SectionHeader
                    icon={<ClipboardList size={20} className="text-amber-400" />}
                    bg="bg-amber-500/20 border border-amber-500/30"
                    title="Resume-Personalised Question Summary"
                    sub="Questions tailored to your skill profile"
                />
                <div className="space-y-3">
                    {reportData.personalisation.questionsAsked.map((q, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                                <BarChart2 size={14} className="text-amber-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-200 font-medium">{q.question}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Matched to your <span className="text-amber-400 font-medium">{q.skill}</span> experience</p>
                            </div>
                            <DifficultyBadge level={q.difficulty} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SECTION 4: AI Logical Reasoning ──────────────────────────── */}
            <section className="glass-panel p-8 mb-6">
                <SectionHeader
                    icon={<Brain size={20} className="text-indigo-400" />}
                    bg="bg-indigo-500/20 border border-indigo-500/30"
                    title="AI Logical Reasoning Analysis"
                    sub="Your step-by-step thought process"
                />
                <div className="mb-6 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-gray-300 text-sm leading-relaxed">
                    <span className="font-semibold text-indigo-300">AI Summary: </span>{reportData.logicalAnalysis.summary}
                </div>
                <div className="space-y-3">
                    {reportData.logicalAnalysis.steps.map((step, idx) => (
                        <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors overflow-hidden">
                            <button className="w-full flex items-center justify-between p-4 text-left" onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}>
                                <div className="flex items-center gap-4">
                                    <span className="w-7 h-7 rounded-full bg-gray-800 text-gray-400 text-xs font-bold flex items-center justify-center shrink-0">{idx + 1}</span>
                                    <span className="font-medium text-gray-200">{step.phase}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <StarRating value={step.rating} />
                                    {expandedStep === idx ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                                </div>
                            </button>
                            {expandedStep === idx && (
                                <div className="px-4 pb-4 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3 ml-11">{step.detail}</div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SECTION 5: Alternative Solutions ─────────────────────────── */}
            <section className="glass-panel p-8 mb-6">
                <SectionHeader
                    icon={<GitCompare size={20} className="text-violet-400" />}
                    bg="bg-violet-500/20 border border-violet-500/30"
                    title="Optimized & Alternative Solutions"
                    sub="AI comparison of your approach vs alternatives"
                />
                <div className="flex gap-2 mb-6 border-b border-white/5">
                    {reportData.codeAnalysis.solutions.map((s, i) => (
                        <button key={s.tag} onClick={() => setActiveTab(i)}
                            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all border-b-2 -mb-px ${activeTab === i ? 'border-indigo-500 text-indigo-300 bg-indigo-500/5' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                            {s.label}{i === 0 && <span className="ml-2 text-xs bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded">Yours</span>}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-4 mb-5">
                    <div className={`rounded-xl border p-4 text-center ${verdictCls[sol.verdictColor]}`}>
                        <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Verdict</p>
                        <p className="font-bold text-lg">{sol.verdict}</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Time</p>
                        <p className="font-bold text-lg text-emerald-400">{sol.timeComplexity}</p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Space</p>
                        <p className="font-bold text-lg text-blue-400">{sol.spaceComplexity}</p>
                    </div>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-300 mb-5 p-4 rounded-xl bg-white/[0.02] border border-white/5 leading-relaxed">
                    <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />{sol.description}
                </div>
                {sol.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {sol.highlights.map((h, i) => (
                            <span key={i} className="text-xs px-3 py-1 rounded-full bg-gray-800 border border-white/10 text-gray-400 flex items-center gap-1.5">
                                <ArrowRight size={10} className="text-purple-400" />{h}
                            </span>
                        ))}
                    </div>
                )}
                <div className="rounded-xl bg-[#1e1e1e] border border-white/5 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/5">
                        <span className="text-xs text-gray-500 font-mono">{sol.label}</span>
                        {activeTab === 0 && <span className="text-xs text-emerald-400 flex items-center gap-1"><CheckCircle size={12} /> All tests passed</span>}
                    </div>
                    <pre className="p-5 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed whitespace-pre">{sol.code}</pre>
                </div>
                {activeTab === 0 && (
                    <div className="mt-4 rounded-xl bg-amber-500/5 border border-amber-500/20 p-4">
                        <div className="flex items-center gap-2 mb-3 text-amber-400 text-sm font-semibold"><AlertCircle size={14} /> Minor Issues Found</div>
                        <ul className="space-y-1.5">{reportData.codeAnalysis.issues.map((issue, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />{issue}</li>
                        ))}</ul>
                    </div>
                )}
            </section>

            {/* ── SECTION 6: Strengths & Improvements ──────────────────────── */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="glass-panel p-6">
                    <div className="flex items-center gap-2 mb-5"><CheckCircle size={20} className="text-emerald-400" /><h2 className="text-lg font-bold">Key Strengths</h2></div>
                    <ul className="space-y-3">{reportData.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed"><span className="mt-1 text-emerald-400">✓</span>{s}</li>
                    ))}</ul>
                </div>
                <div className="glass-panel p-6">
                    <div className="flex items-center gap-2 mb-5"><TrendingUp size={20} className="text-amber-400" /><h2 className="text-lg font-bold">Areas to Improve</h2></div>
                    <ul className="space-y-3">{reportData.improvements.map((s, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed"><span className="mt-1 text-amber-400">→</span>{s}</li>
                    ))}</ul>
                </div>
            </div>

            {/* ── SECTION 7: Follow-Up Questions ───────────────────────────── */}
            <section className="glass-panel p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                            <MessageSquare size={20} className="text-blue-400" />
                        </div>
                        <div><h2 className="text-xl font-bold">Automated Follow-Up Questions</h2><p className="text-sm text-gray-500">AI-generated based on your session</p></div>
                    </div>
                    <button onClick={generateMoreQuestions} disabled={generatingMore}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium hover:bg-blue-500/20 disabled:opacity-50 transition-colors">
                        <RefreshCw size={14} className={generatingMore ? 'animate-spin' : ''} />
                        {generatingMore ? 'Generating...' : 'Generate More'}
                    </button>
                </div>
                <div className="space-y-3">
                    {allQuestions.map((q, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-blue-500/20 transition-all group">
                            <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                                <BookOpen size={14} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-200 leading-relaxed mb-2">{q.question}</p>
                                <div className="flex items-center gap-2">
                                    <DifficultyBadge level={q.difficulty} />
                                    <span className="text-xs text-gray-600 flex items-center gap-1"><Target size={10} />{q.topic}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {extraQuestions.length > 0 && (
                    <div className="mt-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-400 text-center">
                        ✓ {extraQuestions.length} additional questions generated based on your session gaps.
                    </div>
                )}
            </section>
        </div>
    );
};

export default Report;
