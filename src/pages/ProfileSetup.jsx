import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconCircleCheck } from '@tabler/icons-react';

const ProfileSetup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: '', weight: '', height: '', diabetes: 'No', bp: 'Normal', allergies: '', currentMedications: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Move to dashboard after saving profile
        navigate('/dashboard');
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Health Profile Setup</h1>
                        <p className="text-slate-500 dark:text-slate-400">Tell us a bit about your health so we can personalize our AI recommendations.</p>
                    </div>

                    <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-8">

                        {/* Basic Stats */}
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Basic Statistics</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age</label>
                                    <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white" placeholder="Yrs" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
                                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white" placeholder="kg" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Height (cm)</label>
                                    <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white" placeholder="cm" required />
                                </div>
                            </div>
                        </div>

                        {/* Medical Conditions */}
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Medical Conditions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Diabetes Status</label>
                                    <select name="diabetes" value={formData.diabetes} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white">
                                        <option value="No">No</option>
                                        <option value="Type 1">Type 1 Diabetes</option>
                                        <option value="Type 2">Type 2 Diabetes</option>
                                        <option value="Pre-diabetic">Pre-diabetic</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Blood Pressure</label>
                                    <select name="bp" value={formData.bp} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white">
                                        <option value="Normal">Normal</option>
                                        <option value="High BP">High BP (Hypertension)</option>
                                        <option value="Low BP">Low BP (Hypotension)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* History & Allergies */}
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">History & Allergies</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Known Allergies</label>
                                    <textarea name="allergies" value={formData.allergies} onChange={handleChange} rows="2" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white" placeholder="E.g., Penicillin, Peanuts (leave blank if none)"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Medications</label>
                                    <textarea name="currentMedications" value={formData.currentMedications} onChange={handleChange} rows="2" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white" placeholder="List any medicine you are currently taking"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button type="submit" className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200">
                                <IconCircleCheck className="mr-2" size={20} />
                                Complete Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetup;
