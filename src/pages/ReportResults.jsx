import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    IconArrowLeft, IconDownload, IconCircleCheckFilled, IconAlertTriangle,
    IconCircleX, IconCalendar, IconBrain, IconActivity, IconRefresh, IconEdit, IconCheck, IconPlus, IconTrash
} from '@tabler/icons-react';
import { reportAPI } from '../services/api';
import MarkdownRenderer from '../components/MarkdownRenderer';
import LabResultsTable from '../components/report/LabResultsTable';
import KeyInsightsCard from '../components/report/KeyInsightsCard';
import { ImpactExplanation, ActionableSteps } from '../components/report/ImpactExplanation';
import { PossibleCauses, ConfidenceBreakdown } from '../components/report/MiscReportCards';
import SeverityMeter from '../components/report/SeverityMeter';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const riskColors = {
    LOW: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', icon: IconCircleCheckFilled },
    MEDIUM: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-500', icon: IconAlertTriangle },
    HIGH: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-500', icon: IconCircleX },
};

const ReportResults = () => {
    const { reportId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [polling, setPolling] = useState(false);
    
    // For confirmation step
    const [editableValues, setEditableValues] = useState([]);
    const [submittingTarget, setSubmittingTarget] = useState(false);

    const fetchReport = async () => {
        try {
            const res = await reportAPI.getById(reportId);
            setData(res.data);
            
            if (res.data.status === 'AWAITING_CONFIRMATION') {
                setEditableValues(res.data.extractedValues || []);
            }

            // If still processing, poll every 5 seconds
            if (res.data.status === 'PROCESSING') {
                setPolling(true);
            } else {
                setPolling(false);
                setLoading(false);
            }
        } catch (err) {
            setError('Could not load report. It may still be processing.');
            setLoading(false);
            setPolling(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, [reportId]);

    // Poll every 5s if still processing
    useEffect(() => {
        if (!polling) return;
        const interval = setInterval(fetchReport, 5000);
        return () => clearInterval(interval);
    }, [polling]);

    const handleConfirmValues = async () => {
        setSubmittingTarget(true);
        try {
            const res = await reportAPI.analyze(reportId, editableValues);
            setData(res.data);
            setSubmittingTarget(false);
        } catch (err) {
            console.error('Failed to confirm values', err);
            alert('Failed to analyze the confirmed values. Please try again.');
            setSubmittingTarget(false);
        }
    };

    const updateEditableValue = (index, field, value) => {
        const newValues = [...editableValues];
        newValues[index][field] = value;
        setEditableValues(newValues);
    };

    const removeEditableValue = (index) => {
        const newValues = [...editableValues];
        newValues.splice(index, 1);
        setEditableValues(newValues);
    };

    const addEditableValue = () => {
        setEditableValues([...editableValues, { testName: '', value: '', unit: '' }]);
    };

    const result = data?.result;
    const riskLevel = result?.riskLevel || 'LOW';
    const RiskStyle = riskColors[riskLevel] || riskColors.LOW;
    const RiskIcon = RiskStyle.icon;

    // Result mapping is mostly direct to component props now

    const handleDownloadPDF = async () => {
        const input = document.getElementById('pdf-content');
        if (!input) return;

        try {
            const buttons = input.querySelectorAll('button');
            buttons.forEach(b => b.style.display = 'none');

            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                backgroundColor: document.documentElement.classList.contains('dark') ? '#0b1121' : '#f8fafc'
            });

            buttons.forEach(b => b.style.display = '');

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            let heightLeft = pdfHeight;
            let position = 0;
            const pageHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${data?.fileName || 'Report'}_Analysis.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            const buttons = input.querySelectorAll('button');
            buttons.forEach(b => b.style.display = '');
        }
    };

    if (loading || (data?.status === 'PROCESSING' && !result?.aiExplanation)) {
        return (
            <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Analyzing Your Report</h2>
                    <p className="text-slate-500 dark:text-slate-400">Our AI is reading and extracting insights from your report...</p>
                    <p className="text-xs text-slate-400 mt-2">This may take 20-60 seconds</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans flex items-center justify-center">
                <div className="text-center">
                    <IconCircleX size={48} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Error Loading Report</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">{error}</p>
                    <button onClick={fetchReport} className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold mx-auto">
                        <IconRefresh size={18} /> <span>Retry</span>
                    </button>
                </div>
            </div>
        );
    }

    if (data?.status === 'FAILED_EXTRACTION') {
        return (
            <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <IconCircleX size={56} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Extraction Failed</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">
                        We couldn't confidently read the test values from your uploaded file. It might be blurry, handwritten, or not a standard lab report.
                    </p>
                    <div className="space-y-3">
                        <button onClick={() => navigate('/reports')} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors">
                            Try Another File
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (data?.status === 'AWAITING_CONFIRMATION') {
        return (
            <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="mb-8">
                        <button onClick={() => navigate('/reports')} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition mb-4">
                            <IconArrowLeft size={20} />
                        </button>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Verify Extracted Data</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Please review the values we extracted from your report. Correct any mistakes or add missing values before we analyze the results.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="p-6 overflow-x-auto">
                            <table className="w-full min-w-[500px]">
                                <thead>
                                    <tr className="text-left border-b-2 border-slate-200 dark:border-slate-700">
                                        <th className="pb-3 text-sm font-bold text-slate-500 w-1/3">Test Name</th>
                                        <th className="pb-3 text-sm font-bold text-slate-500 w-1/4">Value</th>
                                        <th className="pb-3 text-sm font-bold text-slate-500 w-1/4">Unit</th>
                                        <th className="pb-3 w-12"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {editableValues.map((ev, i) => (
                                        <tr key={i} className="border-b border-slate-100 dark:border-slate-700/50">
                                            <td className="py-3">
                                                <input type="text" value={ev.testName} onChange={e => updateEditableValue(i, 'testName', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Hemoglobin" />
                                            </td>
                                            <td className="py-3 px-2">
                                                <input type="number" step="any" value={ev.value} onChange={e => updateEditableValue(i, 'value', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.0" />
                                            </td>
                                            <td className="py-3 px-2">
                                                <input type="text" value={ev.unit} onChange={e => updateEditableValue(i, 'unit', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="g/dL" />
                                            </td>
                                            <td className="py-3 text-right">
                                                <button onClick={() => removeEditableValue(i)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition">
                                                    <IconTrash size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            <div className="mt-4">
                                <button onClick={addEditableValue} className="flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition">
                                    <IconPlus size={16} className="mr-1" /> Add Value
                                </button>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
                                By confirming, you agree that these measurements are accurate for final AI assessment.
                            </p>
                            <button
                                onClick={handleConfirmValues}
                                disabled={submittingTarget || editableValues.length === 0}
                                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold font-sans transition shadow-sm flex items-center justify-center"
                            >
                                {submittingTarget ? 'Analyzing...' : <><IconCheck size={18} className="mr-2" /> Confirm & Analyze</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="pdf-content">

                {/* Header */}
                <div className="flex flex-col mb-8">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4 mb-4">
                            <button onClick={() => navigate('/reports')} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition">
                                <IconArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Report Analysis</h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    {data?.fileName} &nbsp;·&nbsp;
                                    <span className="flex items-center inline-flex gap-1">
                                        <IconCalendar size={12} /> {data?.uploadedAt ? new Date(data.uploadedAt).toLocaleDateString() : ''}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <button onClick={handleDownloadPDF} className="flex items-center justify-center p-2 rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                            <IconDownload size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left: Risk Level + AI Explanation */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Severity Meter Component */}
                        <SeverityMeter level={riskLevel} />

                        {/* Confidence Breakdown Component */}
                        <ConfidenceBreakdown confidence={result?.confidence} />

                        {/* Key Insights Component */}
                        <KeyInsightsCard insights={result?.keyInsights} />

                        {/* Impact Explanation Component */}
                        <ImpactExplanation explanation={result?.impactExplanation} />

                        {/* Lab Results Table Component */}
                        <LabResultsTable tests={result?.tests || []} />

                        {/* AI Enhancement (Fallback/Extra) */}
                        {result?.aiEnhancement && (
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                    <IconBrain size={20} className="text-blue-600 mr-2" /> AI Extra Assessment
                                </h3>
                                <div className="text-sm text-slate-600 dark:text-slate-300">
                                    <MarkdownRenderer content={result.aiEnhancement} />
                                </div>
                            </div>
                        )}
                        
                    </div>

                    {/* Right: Recommendations + Follow-up */}
                    <div className="space-y-6">

                        {/* Actionable Steps */}
                        <ActionableSteps steps={result?.recommendations} />

                        {/* Possible Causes */}
                        <PossibleCauses causes={result?.possibleCauses} />

                        {/* Follow-up */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 border border-blue-100 dark:border-blue-900/50">
                            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-400 mb-4">Follow-up Schedule</h3>
                            <p className="text-sm text-blue-800/80 dark:text-blue-300/80 leading-relaxed whitespace-pre-wrap">
                                {result?.followUpSchedule || 'Consult your doctor for a follow-up schedule.'}
                            </p>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={() => navigate('/chat')}
                            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors text-sm"
                        >
                            Ask AI About This Report
                        </button>
                        <button
                            onClick={() => navigate('/reports')}
                            className="w-full py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold transition-colors text-sm"
                        >
                            Upload Another Report
                        </button>
                    </div>
                </div>

                <div className="mt-12 text-center border-t border-slate-200 dark:border-slate-800 pt-8 opacity-70">
                    <p className="text-[10px] text-slate-500 max-w-2xl mx-auto">
                        Disclaimer: This analysis is generated by AI and is for informational purposes only. Always consult a qualified healthcare professional before making medical decisions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReportResults;
