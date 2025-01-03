const solana = {
    connection: new solanaWeb3.Connection('https://api.mainnet-beta.solana.com')
};

// Mock API responses for demo
const mockAPI = {
    async analyze_token(address) {
        return {
            prediction: "Bullish trend expected over next 30 days",
            confidence: 0.85,
            recommendations: ["Hold position", "Set stop loss at -10%", "Monitor social sentiment"]
        };
    },
    async check_rug(address) {
        return {
            riskLevel: "Medium",
            warnings: ["High token concentration", "Unlocked liquidity"],
            securityScore: 65,
            recommendations: ["Wait for audit", "Check token distribution"]
        };
    },
    async analyze_wallet(address) {
        return {
            profileType: "Active Trader",
            riskProfile: "Moderate",
            tradingPattern: "Regular DCA with occasional large trades",
            recommendations: ["Diversify holdings", "Consider taking profits"]
        };
    },
    async generate_contract(requirements) {
        return {
            code: "pub fn process_instruction(...) {\n    // Generated contract code\n}",
            explanation: "Basic token transfer contract with custom logic"
        };
    },
    async get_distribution(address) {
        return {
            holderGroups: [
                {label: "Whales (>1%)", percentage: 45, count: 5},
                {label: "Large Holders", percentage: 30, count: 50},
                {label: "Medium Holders", percentage: 15, count: 500},
                {label: "Small Holders", percentage: 10, count: 2000}
            ]
        };
    }
};

// Initialize charts
const tokenChart = new Chart(document.getElementById('tokenChart').getContext('2d'), {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Token Price (USD)',
            data: [10, 15, 8, 25, 19, 30],
            borderColor: '#00f7ff',
            backgroundColor: 'rgba(0, 247, 255, 0.1)',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: 'white' }
            }
        },
        scales: {
            y: { ticks: { color: 'white' } },
            x: { ticks: { color: 'white' } }
        }
    }
});

// Event handlers
async function analyzeToken() {
    const address = document.getElementById('tokenInput').value;
    try {
        const result = await mockAPI.analyze_token(address);
        document.getElementById('prediction-result').innerHTML = `
            <h3>Analysis Results:</h3>
            <p>${result.prediction}</p>
            <p>Confidence: ${result.confidence * 100}%</p>
            <ul>${result.recommendations.map(r => `<li>${r}</li>`).join('')}</ul>
        `;
    } catch (error) {
        console.error('Analysis error:', error);
    }
}

async function performRugCheck() {
    const address = document.getElementById('rugCheckInput').value;
    try {
        const result = await mockAPI.check_rug(address);
        document.getElementById('rug-check-result').innerHTML = `
            <h3>Security Analysis:</h3>
            <p>Risk Level: <span style="color: ${
                result.riskLevel === 'Low' ? '#00ff00' : 
                result.riskLevel === 'Medium' ? '#ffff00' : '#ff0000'
            }">${result.riskLevel}</span></p>
            <p>Security Score: ${result.securityScore}/100</p>
            <h4>Warnings:</h4>
            <ul>${result.warnings.map(w => `<li>⚠️ ${w}</li>`).join('')}</ul>
            <h4>Recommendations:</h4>
            <ul>${result.recommendations.map(r => `<li>📌 ${r}</li>`).join('')}</ul>
        `;
    } catch (error) {
        console.error('Rug check error:', error);
    }
}

async function analyzeWallet() {
    const address = document.getElementById('walletInput').value;
    try {
        const result = await mockAPI.analyze_wallet(address);
        document.getElementById('wallet-result').innerHTML = `
            <h3>Wallet Profile:</h3>
            <p>Type: ${result.profileType}</p>
            <p>Risk Profile: ${result.riskProfile}</p>
            <p>Trading Pattern: ${result.tradingPattern}</p>
            <h4>Recommendations:</h4>
            <ul>${result.recommendations.map(r => `<li>${r}</li>`).join('')}</ul>
        `;
    } catch (error) {
        console.error('Wallet analysis error:', error);
    }
}

async function generateContract() {
    const requirements = document.getElementById('contractInput').value;
    try {
        const result = await mockAPI.generate_contract(requirements);
        document.getElementById('contract-result').innerHTML = `${result.code}\n\n/* ${result.explanation} */`;
    } catch (error) {
        console.error('Contract generation error:', error);
    }
}

async function analyzeDistribution() {
    const address = document.getElementById('distributionInput').value;
    try {
        const result = await mockAPI.get_distribution(address);
        const ctx = document.getElementById('distributionChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: result.holderGroups.map(g => g.label),
                datasets: [{
                    data: result.holderGroups.map(g => g.percentage),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)'
                    ],
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: 'white' }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Distribution analysis error:', error);
    }
}

// Background animation
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--neon-blue', 
        `hsl(${180 + x * 30}, 100%, 50%)`);
    document.documentElement.style.setProperty('--neon-purple', 
        `hsl(${280 + y * 30}, 100%, 50%)`);
});