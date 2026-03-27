import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const TrendGraph = ({ testName, data }) => {
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
    
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // Sort data by reportDate ascending
    const sortedData = [...data].sort((a, b) => new Date(a.reportDate) - new Date(b.reportDate));

    const labels = sortedData.map(d => {
        const date = new Date(d.reportDate);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    });
    
    const values = sortedData.map(d => d.value);

    // Determine point colors based on status
    const pointColors = sortedData.map(d => {
        if (d.status === 'NORMAL') return '#1D9E75'; // green
        if (d.status === 'HIGH') return '#BA7517'; // amber
        if (d.status === 'LOW') return '#E8593C'; // red
        return '#9CA3AF'; // gray fallback
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: testName,
                data: values,
                borderColor: '#6366f1', // indigo-500
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: pointColors,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.3,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#1f2937',
                padding: 12,
                titleFont: { size: 13 },
                bodyFont: { size: 14, weight: 'bold' },
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        const idx = context.dataIndex;
                        const status = sortedData[idx].status;
                        return `Value: ${context.parsed.y} (${status})`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    font: { size: 11 },
                    color: isDark ? '#9ca3af' : '#6b7280'
                }
            },
            y: {
                grid: {
                    color: isDark ? '#374151' : '#f3f4f6',
                    drawBorder: false
                },
                ticks: {
                    font: { size: 11 },
                    color: isDark ? '#9ca3af' : '#6b7280',
                    maxTicksLimit: 5
                }
            }
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5 flex flex-col hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-4">{testName}</h3>
            <div className="h-52 w-full relative">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default TrendGraph;
