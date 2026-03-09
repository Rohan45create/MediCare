import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconCircleCheck, IconEdit } from '@tabler/icons-react';
import { profileAPI } from '../services/api';

const ProfileSetup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: '', weight: '', height: '', gender: 'Male',
        diabetes: 'No', bloodPressure: 'Normal', kidneyIssues: false,
        allergies: '', currentMedications: ''
    });
    const [fetching, setFetching] = useState(true);
    const [profileExists, setProfileExists] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchExistingProfile = async () => {
            try {
                const res = await profileAPI.getProfile();
                if (res.data) {
                    setFormData({
                        age: res.data.age || '',
                        weight: res.data.weight || '',
                        height: res.data.height || '',
                        gender: res.data.gender || 'Male',
                        diabetes: res.data.diabetes || 'No',
                        bloodPressure: res.data.bloodPressure || 'Normal',
                        kidneyIssues: res.data.kidneyIssues || false,
                        allergies: res.data.allergies || '',
                        currentMedications: res.data.currentMedications || ''
                    });
                    setProfileExists(true);
                    setIsEditing(false); // Lock the form if it already exists
                }
            } catch (err) {
                // If it's a 404 or a generic error, new users won't have a profile yet which is completely normal.
                console.log("No existing profile found or an error occurred. Starting fresh.");
            } finally {
                setFetching(false);
            }
        };
        fetchExistingProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await profileAPI.update({
                age: formData.age ? parseInt(formData.age) : null,
                weight: formData.weight ? parseFloat(formData.weight) : null,
                height: formData.height ? parseFloat(formData.height) : null,
                gender: formData.gender,
                diabetes: formData.diabetes,
                bloodPressure: formData.bloodPressure,
                kidneyIssues: formData.kidneyIssues,
                allergies: formData.allergies,
                currentMedications: formData.currentMedications,
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save profile. Please try again.');
        }
    };

    return (
        <div className="w-full bg-slate-50 dark:bg-[#0b1121] min-h-[calc(100vh-64px)] font-sans pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Health Profile Setup</h1>
                            <p className="text-slate-500 dark:text-slate-400">Tell us about your health so we can personalize our AI recommendations.</p>
                        </div>
                        {profileExists && !isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex justify-center items-center w-full md:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 px-6 py-2 rounded-xl font-semibold transition-colors duration-200"
                            >
                                <IconEdit className="mr-2" size={18} /> Edit Profile
                            </button>
                        )}
                    </div>

                    {error && <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-200 dark:border-red-800">{error}</div>}

                    {fetching ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                        </div>
                    ) : (
                        <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-8">

                            {/* Basic Stats */}
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Basic Statistics</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age</label>
                                        <input type="number" name="age" value={formData.age} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white disabled:opacity-60" placeholder="Yrs" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
                                        <input type="number" name="weight" value={formData.weight} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white disabled:opacity-60" placeholder="kg" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Height (cm)</label>
                                        <input type="number" name="height" value={formData.height} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white disabled:opacity-60" placeholder="cm" required />
                                    </div>
                                </div>
                            </div>

                            {/* Medical Conditions */}
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Medical Conditions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                                        <select name="gender" value={formData.gender} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white disabled:opacity-60">
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Diabetes Status</label>
                                        <select name="diabetes" value={formData.diabetes} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white disabled:opacity-60">
                                            <option value="No">No</option>
                                            <option value="Type 1">Type 1 Diabetes</option>
                                            <option value="Type 2">Type 2 Diabetes</option>
                                            <option value="Pre-diabetic">Pre-diabetic</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Blood Pressure</label>
                                        <select name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white disabled:opacity-60">
                                            <option value="Normal">Normal</option>
                                            <option value="High BP">High BP (Hypertension)</option>
                                            <option value="Low BP">Low BP (Hypotension)</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center space-x-3 pt-8">
                                        <input type="checkbox" name="kidneyIssues" checked={formData.kidneyIssues} onChange={handleChange} disabled={!isEditing} className="h-4 w-4 text-emerald-600 disabled:opacity-60" id="kidneyIssues" />
                                        <label htmlFor="kidneyIssues" className={`text-sm font-medium text-slate-700 dark:text-slate-300 ${!isEditing && 'opacity-60'}`}>Kidney Issues</label>
                                    </div>
                                </div>
                            </div>

                            {/* History & Allergies */}
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">History & Allergies</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Known Allergies</label>
                                        <textarea name="allergies" value={formData.allergies} onChange={handleChange} disabled={!isEditing} rows="2" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white disabled:opacity-60" placeholder="E.g., Penicillin, Peanuts (leave blank if none)"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Medications</label>
                                        <textarea name="currentMedications" value={formData.currentMedications} onChange={handleChange} disabled={!isEditing} rows="2" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white disabled:opacity-60" placeholder="List any medicine you are currently taking"></textarea>
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="pt-4 flex justify-end">
                                    <button type="submit" className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200">
                                        <IconCircleCheck className="mr-2" size={20} />
                                        {profileExists ? 'Update Profile' : 'Save Profile'}
                                    </button>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileSetup;
