// Cấu hình Chart.js với font CJK
Chart.defaults.font.family = "'Roboto', 'Noto Sans CJK SC', sans-serif";

// Dữ liệu mẫu (sẽ được tải từ nutrition_data.json)
let dashboardData = {};

// Hàm tải dữ liệu JSON
async function loadData() {
    try {
        const response = await fetch('nutrition_data.json');
        dashboardData = await response.json();
        console.log('Dữ liệu đã tải:', dashboardData);
        renderDashboard();
    } catch (error) {
        console.error('Lỗi tải dữ liệu:', error);
        // Nếu không tải được, sử dụng dữ liệu mẫu
        loadSampleData();
    }
}

// Dữ liệu mẫu (nếu không tải được từ file)
function loadSampleData() {
    dashboardData = {
        "patient_info": {
            "age": 28,
            "gender": "male",
            "weight_kg": 45,
            "height_cm": 165,
            "target_kcal": 1700,
            "target_protein_g": 75,
            "target_fat_g": 65,
            "target_carb_g": 190,
            "target_fiber_g": 25,
            "target_ratio_carb": 0.45,
            "target_ratio_fat": 0.35,
            "target_ratio_protein": 0.2
        },
        "overall_assessment": {
            "ideal_weight_kg": 65,
            "bmi": 16.53,
            "bmi_assessment": "Gầy độ II (Suy dinh dưỡng vừa)",
            "weight_deviation_kg": -20
        },
        "macronutrient_summary": {
            "average_intake": {
                "Kcal": 1865.9,
                "Protein": 88.2,
                "Fat": 84.7,
                "Carb": 203.8,
                "Fiber": 29.8
            },
            "deviation_from_target": {
                "Kcal": 165.9,
                "Protein": 13.2,
                "Fat": 19.7,
                "Carb": 13.8,
                "Fiber": 4.8
            },
            "average_ratio": {
                "Protein": 0.189,
                "Carb": 0.437,
                "Fat": 0.408
            },
            "target_ratio": {
                "Protein": 0.2,
                "Carb": 0.45,
                "Fat": 0.35
            },
            "ratio_deviation": {
                "Protein": -0.011,
                "Carb": -0.013,
                "Fat": 0.058
            }
        },
        "strong_weak_days": {
            "Kcal": {
                "strong": ["04/10", "11/10", "12/10"],
                "weak": ["02/10", "14/10", "18/10", "19/10", "25/10"]
            },
            "Protein": {
                "strong": ["04/10", "06/10", "11/10", "15/10", "17/10", "21/10"],
                "weak": ["02/10", "20/10", "23/10"]
            },
            "Fat": {
                "strong": ["11/10", "12/10", "20/10", "23/10"],
                "weak": ["01/10", "02/10", "18/10", "19/10"]
            },
            "Carb": {
                "strong": ["04/10", "09/10", "10/10", "12/10", "18/10"],
                "weak": ["05/10", "15/10", "17/10", "20/10", "25/10", "29/10"]
            }
        },
        "micronutrient_summary": {
            "average_intake": {
                "VitA_ug": 1181.5,
                "VitC_mg": 195.9,
                "VitD_IU": 416.3,
                "VitE_mg": 16.1,
                "VitK_ug": 325.9,
                "Calcium_mg": 1221.9,
                "Copper_mg": 2.3,
                "Iron_mg": 15.6,
                "Magnesium_mg": 441.2,
                "Manganese_mg": 4.1,
                "Phosphorus_mg": 1541.8,
                "Potassium_mg": 3925.9,
                "Selenium_ug": 78.1,
                "Sodium_mg": 1473.0,
                "Zinc_mg": 13.0
            },
            "fat_types": {
                "SaturatedFat": 34.0,
                "MonoFat": 33.3,
                "PolyFat": 17.4
            },
            "carb_types": {
                "Starch": 62.4,
                "Sugar": 48.4
            }
        },
        "time_series_data": [
            {"Day": 1, "Kcal": 1849.6, "Protein": 94.9, "Fat": 76.4, "Carb": 209.1, "Fiber": 29.7, "Ratio_Protein": 0.205, "Ratio_Carb": 0.452, "Ratio_Fat": 0.372},
            {"Day": 2, "Kcal": 1742.9, "Protein": 71.7, "Fat": 78.1, "Carb": 200.7, "Fiber": 26.5, "Ratio_Protein": 0.165, "Ratio_Carb": 0.461, "Ratio_Fat": 0.403},
            {"Day": 3, "Kcal": 1855.8, "Protein": 82.5, "Fat": 82.1, "Carb": 206.7, "Fiber": 24.0, "Ratio_Protein": 0.178, "Ratio_Carb": 0.446, "Ratio_Fat": 0.398},
            {"Day": 4, "Kcal": 1980.3, "Protein": 96.7, "Fat": 84.9, "Carb": 222.7, "Fiber": 32.6, "Ratio_Protein": 0.195, "Ratio_Carb": 0.450, "Ratio_Fat": 0.386},
            {"Day": 5, "Kcal": 1819.4, "Protein": 81.7, "Fat": 87.4, "Carb": 189.3, "Fiber": 27.3, "Ratio_Protein": 0.180, "Ratio_Carb": 0.416, "Ratio_Fat": 0.432},
            {"Day": 6, "Kcal": 1896.0, "Protein": 95.9, "Fat": 84.3, "Carb": 201.1, "Fiber": 28.6, "Ratio_Protein": 0.202, "Ratio_Carb": 0.424, "Ratio_Fat": 0.400},
            {"Day": 7, "Kcal": 1860.5, "Protein": 82.9, "Fat": 82.1, "Carb": 213.5, "Fiber": 27.1, "Ratio_Protein": 0.178, "Ratio_Carb": 0.459, "Ratio_Fat": 0.397},
            {"Day": 8, "Kcal": 1856.8, "Protein": 94.7, "Fat": 82.4, "Carb": 198.5, "Fiber": 28.3, "Ratio_Protein": 0.204, "Ratio_Carb": 0.428, "Ratio_Fat": 0.399},
            {"Day": 9, "Kcal": 1906.1, "Protein": 82.7, "Fat": 82.7, "Carb": 227.3, "Fiber": 32.6, "Ratio_Protein": 0.174, "Ratio_Carb": 0.477, "Ratio_Fat": 0.390},
            {"Day": 10, "Kcal": 1894.7, "Protein": 81.6, "Fat": 86.3, "Carb": 216.1, "Fiber": 30.2, "Ratio_Protein": 0.172, "Ratio_Carb": 0.456, "Ratio_Fat": 0.410},
            {"Day": 11, "Kcal": 2005.0, "Protein": 100.8, "Fat": 92.7, "Carb": 205.5, "Fiber": 27.0, "Ratio_Protein": 0.201, "Ratio_Carb": 0.410, "Ratio_Fat": 0.416},
            {"Day": 12, "Kcal": 1964.2, "Protein": 85.5, "Fat": 90.7, "Carb": 218.5, "Fiber": 25.9, "Ratio_Protein": 0.174, "Ratio_Carb": 0.445, "Ratio_Fat": 0.416},
            {"Day": 13, "Kcal": 1904.6, "Protein": 95.2, "Fat": 87.1, "Carb": 198.6, "Fiber": 29.3, "Ratio_Protein": 0.200, "Ratio_Carb": 0.417, "Ratio_Fat": 0.412},
            {"Day": 14, "Kcal": 1799.7, "Protein": 84.1, "Fat": 84.3, "Carb": 194.6, "Fiber": 26.7, "Ratio_Protein": 0.187, "Ratio_Carb": 0.433, "Ratio_Fat": 0.422},
            {"Day": 15, "Kcal": 1853.6, "Protein": 96.9, "Fat": 84.4, "Carb": 191.1, "Fiber": 25.9, "Ratio_Protein": 0.209, "Ratio_Carb": 0.412, "Ratio_Fat": 0.410},
            {"Day": 16, "Kcal": 1854.0, "Protein": 87.0, "Fat": 84.7, "Carb": 203.9, "Fiber": 29.3, "Ratio_Protein": 0.188, "Ratio_Carb": 0.440, "Ratio_Fat": 0.411},
            {"Day": 17, "Kcal": 1867.1, "Protein": 98.2, "Fat": 85.0, "Carb": 192.0, "Fiber": 26.4, "Ratio_Protein": 0.210, "Ratio_Carb": 0.411, "Ratio_Fat": 0.410},
            {"Day": 18, "Kcal": 1776.4, "Protein": 83.5, "Fat": 71.7, "Carb": 215.7, "Fiber": 28.9, "Ratio_Protein": 0.188, "Ratio_Carb": 0.486, "Ratio_Fat": 0.363},
            {"Day": 19, "Kcal": 1779.7, "Protein": 82.2, "Fat": 71.8, "Carb": 213.4, "Fiber": 31.5, "Ratio_Protein": 0.185, "Ratio_Carb": 0.480, "Ratio_Fat": 0.363},
            {"Day": 20, "Kcal": 1834.9, "Protein": 76.7, "Fat": 92.5, "Carb": 190.1, "Fiber": 29.1, "Ratio_Protein": 0.167, "Ratio_Carb": 0.415, "Ratio_Fat": 0.454},
            {"Day": 21, "Kcal": 1898.7, "Protein": 97.7, "Fat": 81.7, "Carb": 208.9, "Fiber": 33.9, "Ratio_Protein": 0.206, "Ratio_Carb": 0.441, "Ratio_Fat": 0.388},
            {"Day": 22, "Kcal": 1894.0, "Protein": 82.6, "Fat": 89.0, "Carb": 205.0, "Fiber": 30.4, "Ratio_Protein": 0.175, "Ratio_Carb": 0.433, "Ratio_Fat": 0.422},
            {"Day": 23, "Kcal": 1892.6, "Protein": 75.5, "Fat": 92.5, "Carb": 211.1, "Fiber": 35.7, "Ratio_Protein": 0.160, "Ratio_Carb": 0.447, "Ratio_Fat": 0.441},
            {"Day": 24, "Kcal": 1919.2, "Protein": 94.6, "Fat": 87.0, "Carb": 205.6, "Fiber": 31.5, "Ratio_Protein": 0.197, "Ratio_Carb": 0.429, "Ratio_Fat": 0.408},
            {"Day": 25, "Kcal": 1768.6, "Protein": 82.9, "Fat": 86.0, "Carb": 182.3, "Fiber": 28.7, "Ratio_Protein": 0.188, "Ratio_Carb": 0.412, "Ratio_Fat": 0.436},
            {"Day": 26, "Kcal": 1849.6, "Protein": 86.7, "Fat": 86.2, "Carb": 202.2, "Fiber": 33.3, "Ratio_Protein": 0.188, "Ratio_Carb": 0.437, "Ratio_Fat": 0.419},
            {"Day": 27, "Kcal": 1895.8, "Protein": 93.6, "Fat": 89.1, "Carb": 198.9, "Fiber": 31.7, "Ratio_Protein": 0.197, "Ratio_Carb": 0.420, "Ratio_Fat": 0.423},
            {"Day": 28, "Kcal": 1872.9, "Protein": 87.8, "Fat": 86.0, "Carb": 206.7, "Fiber": 32.9, "Ratio_Protein": 0.188, "Ratio_Carb": 0.442, "Ratio_Fat": 0.412},
            {"Day": 29, "Kcal": 1868.6, "Protein": 91.9, "Fat": 89.4, "Carb": 193.1, "Fiber": 32.4, "Ratio_Protein": 0.197, "Ratio_Carb": 0.413, "Ratio_Fat": 0.429},
            {"Day": 30, "Kcal": 1840.2, "Protein": 90.8, "Fat": 82.3, "Carb": 199.6, "Fiber": 33.3, "Ratio_Protein": 0.198, "Ratio_Carb": 0.434, "Ratio_Fat": 0.402},
            {"Day": 31, "Kcal": 1842.4, "Protein": 93.7, "Fat": 84.9, "Carb": 195.8, "Fiber": 31.6, "Ratio_Protein": 0.204, "Ratio_Carb": 0.425, "Ratio_Fat": 0.415}
        ],
        "correlation_matrix": {
            "Kcal": {"Kcal": 1.0, "Protein": 0.45, "Fat": 0.52, "Carb": 0.78},
            "Protein": {"Kcal": 0.45, "Protein": 1.0, "Fat": 0.38, "Carb": 0.12},
            "Fat": {"Kcal": 0.52, "Protein": 0.38, "Fat": 1.0, "Carb": 0.25},
            "Carb": {"Kcal": 0.78, "Protein": 0.12, "Fat": 0.25, "Carb": 1.0}
        }
    };
    renderDashboard();
}

// Hàm render dashboard chính
function renderDashboard() {
    renderOverallAssessment();
    renderMacroRatioChart();
    renderStrongWeakDays();
    renderMacroIntakeChart();
    renderKcalTimeSeries();
    renderCorrelationMatrix();
    renderFatRatioChart();
    renderCarbRatioChart();
    renderMicronutrients();
    renderRecommendations();
}

// 1. Render Đánh giá tổng hợp
function renderOverallAssessment() {
    const data = dashboardData.overall_assessment;
    const assessment = dashboardData.macronutrient_summary;
    
    document.getElementById('bmi-value').textContent = data.bmi.toFixed(2);
    document.getElementById('ideal-weight-value').textContent = data.ideal_weight_kg;
    document.getElementById('weight-dev-value').textContent = data.weight_deviation_kg;
    document.getElementById('bmi-assessment-text').textContent = data.bmi_assessment;
    
    // Đánh giá nguy cơ
    const riskList = document.getElementById('risk-assessment');
    riskList.innerHTML = '';
    
    if (data.bmi < 18.5) {
        riskList.innerHTML += '<li><strong>Ngắn hạn:</strong> Mệt mỏi, giảm miễn dịch, táo bón, khó tập trung</li>';
        riskList.innerHTML += '<li><strong>Dài hạn:</strong> Loãng xương, thiếu máu, sụt cân tiếp tục, suy giảm chức năng cơ</li>';
    }
    
    riskList.innerHTML += '<li><strong>Tình trạng hiện tại:</strong> Cân nặng thực tế (' + dashboardData.patient_info.weight_kg + 'kg) thấp hơn cân nặng lý tưởng (' + data.ideal_weight_kg + 'kg) khoảng ' + Math.abs(data.weight_deviation_kg) + 'kg</li>';
}

// 2. Render biểu đồ tỷ lệ Macro
function renderMacroRatioChart() {
    const ctx = document.getElementById('macroRatioChart').getContext('2d');
    const data = dashboardData.macronutrient_summary;
    
    const avgRatio = data.average_ratio;
    const targetRatio = data.target_ratio;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Protein', 'Carb', 'Fat'],
            datasets: [
                {
                    label: 'Thực tế',
                    data: [
                        (avgRatio.Protein * 100).toFixed(1),
                        (avgRatio.Carb * 100).toFixed(1),
                        (avgRatio.Fat * 100).toFixed(1)
                    ],
                    borderColor: '#4080FF',
                    backgroundColor: 'rgba(64, 128, 255, 0.1)',
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBackgroundColor: '#4080FF'
                },
                {
                    label: 'Mục tiêu',
                    data: [
                        (targetRatio.Protein * 100).toFixed(1),
                        (targetRatio.Carb * 100).toFixed(1),
                        (targetRatio.Fat * 100).toFixed(1)
                    ],
                    borderColor: '#FF9A2E',
                    backgroundColor: 'rgba(255, 154, 46, 0.1)',
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBackgroundColor: '#FF9A2E'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 50,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: true
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
    
    // Cập nhật trạng thái tỷ lệ
    const fatRatioDev = data.ratio_deviation.Fat;
    if (fatRatioDev > 0) {
        document.getElementById('fat-ratio-status').textContent = 'cao hơn';
        document.getElementById('ratio-recommendation').textContent = 'giảm chất béo hoặc tăng carb/protein';
    } else {
        document.getElementById('fat-ratio-status').textContent = 'thấp hơn';
        document.getElementById('ratio-recommendation').textContent = 'tăng chất béo lành mạnh';
    }
}

// 3. Render ngày mạnh/yếu
function renderStrongWeakDays() {
    const data = dashboardData.strong_weak_days;
    
    document.getElementById('kcal-strong').textContent = data.Kcal.strong.join(', ') || 'Không có';
    document.getElementById('kcal-weak').textContent = data.Kcal.weak.join(', ') || 'Không có';
    
    document.getElementById('protein-strong').textContent = data.Protein.strong.join(', ') || 'Không có';
    document.getElementById('protein-weak').textContent = data.Protein.weak.join(', ') || 'Không có';
    
    document.getElementById('fat-strong').textContent = data.Fat.strong.join(', ') || 'Không có';
    document.getElementById('fat-weak').textContent = data.Fat.weak.join(', ') || 'Không có';
    
    document.getElementById('carb-strong').textContent = data.Carb.strong.join(', ') || 'Không có';
    document.getElementById('carb-weak').textContent = data.Carb.weak.join(', ') || 'Không có';
}

// 4. Render biểu đồ Macro Intake
function renderMacroIntakeChart() {
    const ctx = document.getElementById('macroIntakeChart').getContext('2d');
    const data = dashboardData.macronutrient_summary;
    const avgIntake = data.average_intake;
    const target = dashboardData.patient_info;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Protein (g)', 'Fat (g)', 'Carb (g)', 'Fiber (g)'],
            datasets: [
                {
                    label: 'Thực tế',
                    data: [avgIntake.Protein, avgIntake.Fat, avgIntake.Carb, avgIntake.Fiber],
                    backgroundColor: '#4080FF',
                    borderColor: '#4080FF',
                    borderWidth: 1
                },
                {
                    label: 'Mục tiêu',
                    data: [target.target_protein_g, target.target_fat_g, target.target_carb_g, target.target_fiber_g],
                    backgroundColor: '#FF9A2E',
                    borderColor: '#FF9A2E',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            scales: {
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: true
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
    
    // Cập nhật trạng thái Fiber
    const fiberStatus = avgIntake.Fiber >= target.target_fiber_g ? 'đủ' : 'thiếu';
    document.getElementById('fiber-avg').textContent = avgIntake.Fiber.toFixed(1);
    document.getElementById('fiber-status').textContent = fiberStatus === 'đủ' ? 'Tốt, đủ lượng xơ khuyến nghị' : 'Cần tăng lượng xơ';
}

// 5. Render biểu đồ Kcal theo thời gian
function renderKcalTimeSeries() {
    const ctx = document.getElementById('kcalTimeSeriesChart').getContext('2d');
    const data = dashboardData.time_series_data;
    const target = dashboardData.patient_info.target_kcal;
    
    const days = data.map(d => 'Ngày ' + d.Day);
    const kcals = data.map(d => d.Kcal);
    const proteins = data.map(d => d.Protein);
    const fats = data.map(d => d.Fat);
    const carbs = data.map(d => d.Carb);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [
                {
                    label: 'Kcal',
                    data: kcals,
                    borderColor: '#4080FF',
                    backgroundColor: 'rgba(64, 128, 255, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y'
                },
                {
                    label: 'Protein (g)',
                    data: proteins,
                    borderColor: '#57A9FB',
                    backgroundColor: 'rgba(87, 169, 251, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    yAxisID: 'y1'
                },
                {
                    label: 'Fat (g)',
                    data: fats,
                    borderColor: '#FF9A2E',
                    backgroundColor: 'rgba(255, 154, 46, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    yAxisID: 'y1'
                },
                {
                    label: 'Carb (g)',
                    data: carbs,
                    borderColor: '#23C343',
                    backgroundColor: 'rgba(35, 195, 67, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Kcal'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Grams (g)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
    
    // Đánh giá xu hướng
    const avgKcal = kcals.reduce((a, b) => a + b) / kcals.length;
    const trendStatus = avgKcal > target ? 'cao hơn' : 'thấp hơn';
    document.getElementById('kcal-trend-status').textContent = trendStatus;
}

// 6. Render ma trận tương quan
function renderCorrelationMatrix() {
    const data = dashboardData.correlation_matrix;
    const tbody = document.getElementById('correlation-body');
    tbody.innerHTML = '';
    
    const nutrients = ['Kcal', 'Protein', 'Fat', 'Carb'];
    
    nutrients.forEach(row => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = row;
        tr.appendChild(th);
        
        nutrients.forEach(col => {
            const td = document.createElement('td');
            const value = data[row][col].toFixed(2);
            td.textContent = value;
            
            if (value > 0.5) {
                td.classList.add('positive-corr');
            } else if (value < -0.5) {
                td.classList.add('negative-corr');
            }
            
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
    
    // Phân tích tương quan
    const kcalCarbCorr = data.Kcal.Carb;
    const kcalFatCorr = data.Kcal.Fat;
    const proteinCarbCorr = data.Protein.Carb;
    
    let analysis = 'Carb có tương quan mạnh với Kcal (' + kcalCarbCorr.toFixed(2) + '), cho thấy lượng carb là yếu tố chính ảnh hưởng đến năng lượng. ';
    analysis += 'Protein và Carb có tương quan yếu (' + proteinCarbCorr.toFixed(2) + '), cho thấy chúng độc lập với nhau.';
    
    document.getElementById('correlation-analysis').textContent = analysis;
}

// 4. Render biểu đồ tỷ lệ chất béo
function renderFatRatioChart() {
    const ctx = document.getElementById('fatRatioChart').getContext('2d');
    const data = dashboardData.micronutrient_summary.fat_types;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Bão hòa', 'Đơn không bão hòa', 'Đa không bão hòa'],
            datasets: [{
                data: [data.SaturatedFat, data.MonoFat, data.PolyFat],
                backgroundColor: ['#FF9A2E', '#4080FF', '#37D4CF'],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + 'g';
                        }
                    }
                }
            }
        }
    });
}

// 4. Render biểu đồ tỷ lệ Carbohydrate
function renderCarbRatioChart() {
    const ctx = document.getElementById('carbRatioChart').getContext('2d');
    const data = dashboardData.micronutrient_summary.carb_types;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Tinh bột (Phức hợp)', 'Đường (Đơn)'],
            datasets: [{
                data: [data.Starch, data.Sugar],
                backgroundColor: ['#23C343', '#FBE842'],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + 'g';
                        }
                    }
                }
            }
        }
    });
}

// 4. Render Vi chất dinh dưỡng
function renderMicronutrients() {
    const data = dashboardData.micronutrient_summary.average_intake;
    const grid = document.getElementById('micronutrient-grid');
    grid.innerHTML = '';
    
    const microLabels = {
        'VitA_ug': 'Vitamin A (µg)',
        'VitC_mg': 'Vitamin C (mg)',
        'VitD_IU': 'Vitamin D (IU)',
        'VitE_mg': 'Vitamin E (mg)',
        'VitK_ug': 'Vitamin K (µg)',
        'Calcium_mg': 'Calcium (mg)',
        'Iron_mg': 'Iron (mg)',
        'Magnesium_mg': 'Magnesium (mg)',
        'Zinc_mg': 'Zinc (mg)',
        'Potassium_mg': 'Potassium (mg)'
    };
    
    Object.keys(microLabels).forEach(key => {
        if (data[key] !== undefined) {
            const div = document.createElement('div');
            div.className = 'micro-item';
            div.innerHTML = `<div class="value">${data[key].toFixed(1)}</div><div class="label">${microLabels[key]}</div>`;
            grid.appendChild(div);
        }
    });
    
    // Khuyến nghị vi chất
    const recText = 'Dựa trên dữ liệu, cần tham vấn bác sĩ/dinh dưỡng sĩ về bổ sung: Vitamin D (nếu < 400 IU), Vitamin B-complex, Kẽm (Zinc), Sắt (Iron) nếu cần. Tăng cường rau xanh, trái cây, hạt cho vi chất tự nhiên.';
    document.getElementById('micronutrient-recommendation').textContent = recText;
}

// 7 & 8. Render khuyến nghị
function renderRecommendations() {
    const data = dashboardData;
    const avgIntake = data.macronutrient_summary.average_intake;
    const target = data.patient_info;
    const assessment = data.overall_assessment;
    
    // Trạng thái BMI
    document.getElementById('final-bmi-status').textContent = assessment.bmi_assessment;
    
    // Trạng thái Kcal
    const kcalStatus = avgIntake.Kcal > target.target_kcal ? 'vượt' : 'chưa đạt';
    document.getElementById('final-kcal-status').textContent = kcalStatus;
    
    // Điều chỉnh năng lượng
    const kcalDiff = target.target_kcal - avgIntake.Kcal;
    document.getElementById('kcal-adjustment').textContent = kcalDiff.toFixed(0);
    document.getElementById('avg-kcal-val').textContent = avgIntake.Kcal.toFixed(1);
    
    // Điều chỉnh Protein
    const proteinDiff = avgIntake.Protein - target.target_protein_g;
    document.getElementById('protein-adjustment').textContent = avgIntake.Protein.toFixed(1) + ' (dư ' + proteinDiff.toFixed(1) + 'g)';
    
    // Điều chỉnh Fat
    const fatRatioPct = (data.macronutrient_summary.average_ratio.Fat * 100).toFixed(1);
    const targetFatPct = (data.macronutrient_summary.target_ratio.Fat * 100).toFixed(1);
    document.getElementById('fat-ratio-adjustment').textContent = fatRatioPct + '% (mục tiêu ' + targetFatPct + '%)';
    
    const fatDiff = avgIntake.Fat - target.target_fat_g;
    const fatAdjustText = fatDiff > 0 ? 'giảm chất béo' : 'tăng chất béo lành mạnh';
    document.getElementById('fat-adjustment').textContent = fatAdjustText;
    
    // Điều chỉnh Carb
    const carbRatioPct = (data.macronutrient_summary.average_ratio.Carb * 100).toFixed(1);
    const targetCarbPct = (data.macronutrient_summary.target_ratio.Carb * 100).toFixed(1);
    document.getElementById('carb-ratio-adjustment').textContent = carbRatioPct + '% (mục tiêu ' + targetCarbPct + '%)';
    
    const carbDiff = avgIntake.Carb - target.target_carb_g;
    const carbAdjustText = carbDiff > 0 ? 'giảm nhẹ lượng carb' : 'tăng carb phức hợp';
    document.getElementById('carb-adjustment').textContent = carbAdjustText;
    
    // Điều chỉnh Fiber
    const fiberDiff = avgIntake.Fiber - target.target_fiber_g;
    const fiberAdjustText = fiberDiff > 0 ? 'duy trì' : 'tăng';
    document.getElementById('fiber-adjustment').textContent = fiberAdjustText + ' lượng xơ';
}

// Tải dữ liệu khi trang load
window.addEventListener('load', loadData);
