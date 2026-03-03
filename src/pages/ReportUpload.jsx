import React, { useState } from 'react';
import { IconCloudUpload, IconFile, IconX, IconCircleCheck } from '@tabler/icons-react';

const ReportUpload = () => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setUploadComplete(false);
        }
    };

    const clearFile = () => {
        setFile(null);
        setUploadComplete(false);
    };

    const handleUpload = () => {
        if (!file) return;
        setIsUploading(true);

        // Simulate upload delay
        setTimeout(() => {
            setIsUploading(false);
            setUploadComplete(true);
        }, 2000);
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Upload Medical Report</h1>
                        <p className="text-slate-500 dark:text-slate-400">Our AI will extract the data and track your health trends over time.</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 text-center">

                        {!file ? (
                            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 relative cursor-pointer">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    onChange={handleFileChange}
                                />
                                <IconCloudUpload className="mx-auto h-16 w-16 text-slate-400 mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Click to Upload or Drag and Drop</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                            </div>
                        ) : (
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-lg">
                                            <IconFile size={24} />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-slate-900 dark:text-white">{file.name}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    {!isUploading && !uploadComplete && (
                                        <button onClick={clearFile} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                            <IconX size={20} />
                                        </button>
                                    )}
                                </div>

                                {isUploading && (
                                    <div className="mt-6">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-slate-600 dark:text-slate-300 font-medium">Extracting data via OCR...</span>
                                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Processing</span>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                                            <div className="bg-emerald-500 h-full rounded-full w-2/3 animate-pulse"></div>
                                        </div>
                                    </div>
                                )}

                                {uploadComplete && (
                                    <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-start text-left">
                                        <IconCircleCheck className="text-emerald-500 mt-0.5 mr-3 shrink-0" size={20} />
                                        <div>
                                            <h4 className="font-semibold text-emerald-800 dark:text-emerald-300">Analysis Complete</h4>
                                            <p className="text-sm text-emerald-600 dark:text-emerald-400/80 mt-1">We found your HbA1c is 6.2%. This has been added to your dashboard.</p>
                                        </div>
                                    </div>
                                )}

                                {!uploadComplete && (
                                    <button
                                        onClick={handleUpload}
                                        disabled={isUploading}
                                        className={`mt-6 w-full py-3 rounded-xl font-semibold text-white transition-colors ${isUploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                                    >
                                        {isUploading ? 'Analyzing...' : 'Start Analysis'}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportUpload;
