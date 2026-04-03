import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft, IconDownload, IconCircleCheckFilled, IconAlertTriangle, IconCircleX, IconCalendar, IconMapPin, IconSun, IconMoon, IconMessage, IconInfoCircle, IconPill, IconListDetails, IconShieldCheck, IconClock } from '@tabler/icons-react';
import { scanAPI } from '../services/api';
import MarkdownRenderer from '../components/MarkdownRenderer';
import DosageSafety from '../components/scan/DosageSafety';
import UsageGuide from '../components/scan/UsageGuide';
import SideEffectsPanel from '../components/scan/SideEffectsPanel';
import ScanWarnings from '../components/scan/ScanWarnings';
import Alternatives from '../components/scan/Alternatives';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useTranslation } from 'react-i18next';
import { useTranslateContent } from '../hooks/useTranslateContent';

const ScanResult = () => {
    const { t } = useTranslation('scanResult');
    const location = useLocation();
    const navigate = useNavigate();
    const { scanId } = useParams();
    const scannedData = location.state?.scannedData || 'Unknown code';
    const [scanResult, setScanResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScanData = async () => {
            try {
                let res;
                if (scanId) {
                    res = await scanAPI.getById(scanId);
                } else if (scannedData && scannedData !== 'Unknown code') {
                    res = await scanAPI.scanBarcode(scannedData);
                } else {
                    res = { data: null };
                }
                setScanResult(res.data);
            } catch (err) {
                console.error('Scan API error:', err);
                setError(err.response?.data?.error || "We couldn't find this medicine in our database. It might be an unregistered brand or a non-medical barcode.");
            } finally {
                setLoading(false);
            }
        };
        fetchScanData();
    }, [scanId, scannedData]);

    const medicineName = scanResult?.brand || 'Unknown Medicine';
    const genericName = scanResult?.generic || scannedData;
    const aiExplanation = scanResult?.aiExplanation || '';
    const safetyWarnings = scanResult?.safetyWarnings || [];
    const hasNsqAlert = scanResult?.nsqAlert || false;
    const description = scanResult?.description || 'A commonly used prescription medication.';

    const translatedAiExplanation = useTranslateContent(aiExplanation);
    const translatedDescription = useTranslateContent(description);

    const showRawExplanation = !scanResult?.usageGuide && !scanResult?.alternatives && !scanResult?.sideEffects;

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

            pdf.save(`${medicineName}_Scan_Result.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            const buttons = input.querySelectorAll('button');
            buttons.forEach(b => b.style.display = '');
        }
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-8">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="pdf-content">

                {/* Breadcrumb & Header */}
                <div className="flex flex-col mb-8">
                    <div className="text-xs font-semibold text-slate-500 tracking-wider uppercase mb-2">
                        HOME / SCAN RESULTS / <span className="text-blue-600">{medicineName.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center">
                                {t('scanner:result.title', 'Medicine Information')}
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('subtitle')}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={() => navigate('/chat')}
                                className="hidden sm:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                            >
                                <IconMessage size={18} />
                                <span>{t('chatAi')}</span>
                            </button>
                            <button onClick={handleDownloadPDF} className="flex items-center justify-center p-2 rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                                <IconDownload size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading overlay */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-slate-500 dark:text-slate-400">{t('scanner:result.loading', 'Loading...')}</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="flex flex-col items-center justify-center p-12 text-center mt-8">
                        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 shadow-inner border border-red-200 dark:border-red-900/50">
                            <IconAlertTriangle size={40} className="text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">{t('scanner:result.failed', 'Scan Failed')}</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">{error}</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => navigate('/scansense')} className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-colors shadow-sm">
                                {t('scanner:result.tryAgain', 'Try Again')}
                            </button>
                            <button onClick={() => navigate('/chatbot')} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors shadow-md">
                                {t('askAiBtn')}
                            </button>
                        </div>
                    </div>
                )}

                {!loading && !error && (
                    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">

                        {/* == MOBILE 1 | DESKTOP LEFT == Primary Medicine Card */}
                        <div className="order-1 lg:col-span-2">
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-start gap-6 h-full">
                                <div className="w-32 h-40 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-inner">
                                    <div className="w-16 h-24 bg-emerald-500 rounded-[2rem] shadow-md border-b-4 border-emerald-600 opacity-90"></div>
                                </div>
                                <div className="flex-1 flex flex-col h-full">
                                    <div className="mb-auto">
                                        <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full w-max mb-3">
                                            {scanResult?.drugClass || 'PRESCRIPTION'}
                                            <span className="ml-2 text-slate-400 font-medium tracking-normal text-[10px]">Ref: #SCAN-{Math.floor(Math.random() * 90000) + 10000}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{medicineName}</h2>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-medium">{t('generic')} {genericName}</p>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                            {translatedDescription}
                                        </p>
                                        {showRawExplanation && aiExplanation && (
                                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mt-2">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <IconInfoCircle size={18} className="text-blue-600 dark:text-blue-400" />
                                                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400">{t('scanner:result.overview', 'Overview')}</p>
                                                </div>
                                                <MarkdownRenderer content={translatedAiExplanation} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                                        <div className="flex items-center text-xs text-slate-500 font-medium">
                                            <IconCalendar size={14} className="mr-2 opacity-70" />
                                            {t('scannedOn')} {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className="flex items-center text-xs text-slate-500 font-medium">
                                            <IconMapPin size={14} className="mr-2 opacity-70" />
                                            {scanId ? t('barcodeHistory') : `Barcode: ${scannedData}`}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* == MOBILE 2 | DESKTOP RIGHT TOP == Safety Card */}
                        <div className="order-2 lg:col-span-1 lg:col-start-3">
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{t('safety.title')}</p>

                                <div className="flex items-center space-x-4 mb-6">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${hasNsqAlert ? 'bg-red-100 dark:bg-red-900/30 text-red-500' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500'}`}>
                                        {hasNsqAlert ? <IconCircleX size={32} /> : <IconCircleCheckFilled size={32} />}
                                    </div>
                                    <div>
                                        <h3 className={`text-3xl font-extrabold leading-tight ${hasNsqAlert ? 'text-red-500' : 'text-emerald-500'}`}>
                                            {hasNsqAlert ? t('alert') : t('dosage.safe')}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {hasNsqAlert ? t('nsqAlert') : t('scanner:status.safe', 'Safe to use')}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                                        <span>{t('safety.fdaData')}: {scanResult?.fdaSafetyData !== 'FDA safety data temporarily unavailable.' ? t('safety.available') : t('safety.notAvailable')}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                        <div className={`h-2 rounded-full ${hasNsqAlert ? 'bg-red-500 w-[40%]' : 'bg-emerald-500 w-[92%]'}`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* == MOBILE 3 | DESKTOP LEFT BOTTOM == Warnings */}
                        <div className="order-3 lg:col-span-2 lg:col-start-1 lg:row-start-2 space-y-6">

                            {safetyWarnings.length > 0 && (
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                        <IconAlertTriangle size={20} className="text-amber-500 mr-2" />
                                        {t('warnings.title')} ({safetyWarnings.length})
                                    </h3>
                                    <div className="space-y-4">
                                        {safetyWarnings.map((w, i) => (
                                            <div key={i} className={`rounded-2xl p-4 flex items-start space-x-3 ${w.severity === 'High' ? 'bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30' : 'bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30'}`}>
                                                <IconInfoCircle size={20} className={w.severity === 'High' ? 'text-red-600 mt-0.5 shrink-0' : 'text-amber-600 mt-0.5 shrink-0'} />
                                                <div>
                                                    <h4 className={`font-bold mb-1 text-sm ${w.severity === 'High' ? 'text-red-900 dark:text-red-500' : 'text-amber-900 dark:text-amber-500'}`}>{w.type}</h4>
                                                    <p className={`text-xs leading-relaxed ${w.severity === 'High' ? 'text-red-800 dark:text-red-600/80' : 'text-amber-800 dark:text-amber-600/80'}`}>{w.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {safetyWarnings.length === 0 && !hasNsqAlert && (
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                        <IconAlertTriangle size={20} className="text-amber-500 mr-2" />
                                        {t('warnings.title')}
                                    </h3>
                                    <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-4 flex items-center space-x-3">
                                        <IconCircleCheckFilled size={20} className="text-emerald-600 shrink-0" />
                                        <p className="text-sm text-emerald-800 dark:text-emerald-400">{t('scanner:status.safe', 'No NSQ safety alerts found for this medicine.')}</p>
                                    </div>
                                </div>
                            )}

                            {/* == NEW CARDS FROM RULE ENGINE == */}
                            <DosageSafety dosage={scanResult?.dosageSafety} />
                            
                            <ScanWarnings 
                                contraindications={scanResult?.contraindications}
                                interactions={scanResult?.interactionWarnings}
                                crossAnalysis={scanResult?.crossAnalysisWarnings} 
                            />

                            <SideEffectsPanel effects={scanResult?.sideEffects} />

                            <UsageGuide guide={scanResult?.usageGuide} />

                            <Alternatives alternatives={scanResult?.alternatives} />

                        </div>

                        {/* == MOBILE 4 | DESKTOP RIGHT BOTTOM == Schedule & Help */}
                        <div className="order-4 lg:col-span-1 lg:col-start-3 lg:row-start-2 space-y-6">

                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                                    <IconClock size={18} className="text-indigo-500 mr-2" />
                                    {t('schedule.title')}
                                </h3>

                                {/* Placeholder for schedule items */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            <IconSun size={16} className="text-amber-500 mr-2" /> {t('schedule.morning')}
                                        </div>
                                        <div className="text-sm text-slate-500 font-mono">08:00 AM</div>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 opacity-60">
                                        <div className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            <IconMoon size={16} className="text-indigo-400 mr-2" /> {t('schedule.evening')}
                                        </div>
                                        <div className="text-sm text-slate-400 font-mono">N/A</div>
                                    </div>
                                </div>
                                <button className="w-full py-3 rounded-xl border-2 border-blue-100 text-blue-600 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-900/20 hover:bg-blue-50 font-bold transition-colors text-sm">
                                    {t('schedule.setReminders')}
                                </button>
                            </div>

                            <div className="hidden lg:block bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 border border-blue-100 dark:border-blue-900/50">
                                <h3 className="text-sm font-bold text-blue-900 dark:text-blue-400 mb-2">{t('needHelp')}</h3>
                                <p className="text-xs text-blue-800/80 dark:text-blue-300/80 mb-6 leading-relaxed">
                                    {t('helpDesc')}
                                </p>
                                <button onClick={() => navigate('/chat')} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors text-sm flex items-center justify-center space-x-2">
                                    <IconMessage size={16} />
                                    <span>{t('askAiBtn')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-12 text-center border-t border-slate-200 dark:border-slate-800 pt-8 opacity-70">
                    <p className="text-[10px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Disclaimer: This analysis is for informational purposes only. Always consult with a qualified healthcare professional before making any changes to your medication regimen.
                    </p>
                    <p className="text-[10px] text-slate-500 mt-2">
                        © {new Date().getFullYear()} MediCare Health Systems. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Floating Action Button for Mobile Chat */}
            <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50">
                <button onClick={() => navigate('/chat')} className="w-full py-4 rounded-2xl bg-blue-600 shadow-xl shadow-blue-600/30 text-white font-bold text-sm flex items-center justify-center space-x-2">
                    <IconMessage size={18} />
                    <span>{t('askAiBtn')}</span>
                </button>
            </div>
        </div>
    );
};

export default ScanResult;
