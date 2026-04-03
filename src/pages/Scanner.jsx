import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import { IconCamera, IconPhoto as ImageIcon, IconArrowLeft, IconInfoCircle, IconUpload } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const Scanner = () => {
    const { t } = useTranslation('scanner');
    const navigate = useNavigate();
    const [isScanning, setIsScanning] = useState(false);
    const [hasCameraError, setHasCameraError] = useState(false);
    const html5QrCodeRef = useRef(null);
    const fileInputRef = useRef(null);

    // Initialize the Html5Qrcode instance
    useEffect(() => {
        html5QrCodeRef.current = new Html5Qrcode("medicare-reader-custom");

        return () => {
            // Cleanup on unmount
            if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
                html5QrCodeRef.current.stop().catch(err => console.error("Failed to stop scanner", err));
            }
        };
    }, []);

    const handleScanSuccess = (decodedText) => {
        console.log(`Scan result: ${decodedText}`);
        stopScanning();
        navigate('/scan-result', { state: { scannedData: decodedText } });
    };

    const startCamera = async () => {
        setHasCameraError(false);
        try {
            if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
                await html5QrCodeRef.current.stop();
            }
            setIsScanning(true);

            await html5QrCodeRef.current.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                },
                handleScanSuccess,
                (errorMessage) => {
                    // ignore stream errors as they happen constantly when no qr is found
                }
            );
        } catch (err) {
            console.error("Camera start error:", err);
            setHasCameraError(true);
            setIsScanning(false);
        }
    };

    const stopScanning = async () => {
        if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
            try {
                await html5QrCodeRef.current.stop();
                setIsScanning(false);
            } catch (err) {
                console.error("Failed to stop scanner", err);
            }
        }
    };

    const handleFileUpload = async (event) => {
        if (event.target.files && event.target.files.length > 0) {
            try {
                const file = event.target.files[0];
                if (html5QrCodeRef.current.isScanning) {
                    await stopScanning(); // Ensure camera is off before file uploading
                }
                const decodedText = await html5QrCodeRef.current.scanFile(file, true);
                handleScanSuccess(decodedText);
            } catch (err) {
                console.error("Error scanning file", err);
                alert("Could not find a valid QR or Barcode in the uploaded image. Please try again or use a clearer image.");
            }
            // Reset input so the same file can be selected again
            event.target.value = '';
        }
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Header Section */}
                    <div className="flex items-center space-x-4 mb-8">
                        <button
                            onClick={() => {
                                stopScanning();
                                navigate(-1);
                            }}
                            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                        >
                            <IconArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t('title')}</h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('subtitle')}</p>
                        </div>
                    </div>

                    {/* Main Scanner Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 flex flex-col items-center text-center">

                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                            <IconCamera size={28} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('identify')}</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                            {t('instruction')}
                        </p>

                        {/* Scanner Container */}
                        <div className="w-full max-w-md aspect-square bg-slate-900 dark:bg-black rounded-2xl overflow-hidden shadow-inner flex items-center justify-center relative mb-8">
                            <div id="medicare-reader-custom" className="w-full h-full object-cover"></div>

                            {/* Placeholder state when not scanning */}
                            {!isScanning && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-900/80 p-6 z-10">
                                    <IconCamera size={48} className="mb-4 opacity-50" />
                                    <p className="text-sm font-medium">Camera is currently inactive</p>
                                    {hasCameraError && (
                                        <p className="text-xs text-red-400 mt-2">Could not access camera. Please allow permissions.</p>
                                    )}
                                </div>
                            )}

                            {/* Visual scan frame overlay when scanning */}
                            {isScanning && (
                                <div className="absolute inset-0 z-10 pointer-events-none p-8 flex items-center justify-center">
                                    <div className="w-full aspect-square border-2 border-white/40 relative">
                                        {/* Corner brackets */}
                                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 -mt-1 -ml-1"></div>
                                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 -mt-1 -mr-1"></div>
                                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 -mb-1 -ml-1"></div>
                                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 -mb-1 -mr-1"></div>

                                        {/* Scanning line animation */}
                                        <div className="w-full h-0.5 bg-blue-500/80 absolute shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] animate-scan-line"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full max-w-md justify-center mt-2">
                            {!isScanning ? (
                                <button
                                    onClick={startCamera}
                                    className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition flex-1"
                                >
                                    <IconCamera size={20} />
                                    <span>{t('cameraBtn')}</span>
                                </button>
                            ) : (
                                <button
                                    onClick={stopScanning}
                                    className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition flex-1"
                                >
                                    <span>Stop Scanning</span>
                                </button>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                            />

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white px-6 py-3 rounded-xl font-semibold transition border border-slate-200 dark:border-slate-700 flex-1"
                            >
                                <IconUpload size={20} />
                                <span>{t('uploadBtn')}</span>
                            </button>
                        </div>

                        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex items-start space-x-3 text-sm text-left w-full max-w-md">
                            <IconInfoCircle size={18} className="text-blue-600 mt-0.5 shrink-0" />
                            <p className="text-slate-700 dark:text-slate-300">
                                <strong>{t('tip')}</strong> {t('tipText')}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scanner;
