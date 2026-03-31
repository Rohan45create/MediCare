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
    const [progressMsg, setProgressMsg] = useState('Initializing AI analysis...');
    
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

            // Polling is no longer needed, SSE handles it.
            if (res.data.status !== 'PROCESSING' && res.data.status !== 'OCR_PROCESSING') {
                setLoading(false);
            }
        } catch (err) {
            setError('Could not load report. It may still be processing.');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!reportId) return;
        fetchReport();

        const token = localStorage.getItem('token');
        const sseUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/reports/stream/${reportId}?token=${token}`;
        
        const eventSource = new EventSource(sseUrl);
        
        eventSource.addEventListener('STATUS_UPDATE', (e) => {
            console.log('Backend Status:', e.data);
            if (['FAILED', 'EXTRACTION_DONE', 'AWAITING_CONFIRMATION', 'COMPLETED', 'ANALYSIS_DONE'].includes(e.data)) {
                fetchReport();
            }
        });
        
        eventSource.addEventListener('PROGRESS_UPDATE', (e) => {
            setProgressMsg(e.data);
        });
        
        eventSource.onerror = (err) => {
            console.error('SSE Error. Connection may have dropped or completed.', err);
            eventSource.close();
        };

        return () => eventSource.close();
    }, [reportId]);

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
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">{progressMsg}</p>
                    <p className="text-xs text-slate-400 mt-3 animate-pulse">Establishing secure connection and processing heavily...</p>
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
        const rawText = data?.result?.extractedText || 'No raw text available from OCR scan. Please review values manually.';
        
        return (
            <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center space-x-4">
                        <button onClick={() => navigate('/reports')} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition">
                            <IconArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Verify Extracted Data</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                Check the raw OCR output on the left and correct the extracted values on the right.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* LEFT: Raw Text Panel */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-[70vh]">
                            <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center bg-slate-50 dark:bg-slate-900/50 rounded-t-3xl">
                                <IconBrain size={20} className="text-indigo-500 mr-2" />
                                <h2 className="font-bold text-slate-800 dark:text-slate-200">Raw Document Text</h2>
                            </div>
                            <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed">
                                {rawText}
                            </div>
                        </div>

                        {/* RIGHT: Editable Values */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-[70vh]">
                            <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center bg-slate-50 dark:bg-slate-900/50 rounded-t-3xl">
                                <IconEdit size={20} className="text-blue-500 mr-2" />
                                <h2 className="font-bold text-slate-800 dark:text-slate-200">Edit Extracted Values</h2>
                            </div>
                            
                            <div className="p-0 overflow-y-auto flex-1">
                                <table className="w-full min-w-[400px]">
                                    <thead className="sticky top-0 bg-white dark:bg-slate-800 shadow-sm">
                                        <tr className="text-left border-b border-slate-200 dark:border-slate-700">
                                            <th className="px-5 py-3 text-xs uppercase tracking-wider font-bold text-slate-500 w-2/5">Test Name</th>
                                            <th className="px-2 py-3 text-xs uppercase tracking-wider font-bold text-slate-500 w-1/4">Value</th>
                                            <th className="px-2 py-3 text-xs uppercase tracking-wider font-bold text-slate-500 w-1/4">Unit</th>
                                            <th className="px-5 py-3 w-12 text-center"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {editableValues.map((ev, i) => (
                                            <tr key={i} className="border-b border-slate-100 dark:border-slate-700/50 group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="py-2 px-5">
                                                    <input type="text" value={ev.testName} onChange={e => updateEditableValue(i, 'testName', e.target.value)} className="w-full bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none py-1 text-sm font-semibold text-slate-800 dark:text-white transition-colors" placeholder="e.g. Hemoglobin" />
                                                </td>
                                                <td className="py-2 px-2">
                                                    <input type="number" step="any" value={ev.value} onChange={e => updateEditableValue(i, 'value', e.target.value)} className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono" placeholder="0.0" />
                                                </td>
                                                <td className="py-2 px-2">
                                                    <input type="text" value={ev.unit} onChange={e => updateEditableValue(i, 'unit', e.target.value)} className="w-full bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none py-1 text-xs text-slate-500 dark:text-slate-400 transition-colors" placeholder="g/dL" />
                                                </td>
                                                <td className="py-2 px-5 text-right">
                                                    <button onClick={() => removeEditableValue(i)} className="p-1.5 text-slate-400 hover:text-red-500 bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition opacity-0 flex-shrink-0 group-hover:opacity-100">
                                                        <IconTrash size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="p-5 border-t border-slate-100 dark:border-slate-700/50">
                                    <button onClick={addEditableValue} className="flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-transparent">
                                        <IconPlus size={16} className="mr-2" /> Add Missing Test
                                    </button>
                                </div>
                            </div>
                            
                            <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 p-5 rounded-b-3xl flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
                                <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left hidden sm:block max-w-[200px]">
                                    Review data carefully before AI interpretation.
                                </p>
                                <button
                                    onClick={handleConfirmValues}
                                    disabled={submittingTarget || editableValues.length === 0}
                                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold font-sans transition shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] flex items-center justify-center shrink-0"
                                >
                                    {submittingTarget ? 'Analyzing...' : <><IconCheck size={18} className="mr-2" /> Confirm & Analyze</>}
                                </button>
                            </div>
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
