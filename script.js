// ============================================================
// TASK 3.1: QUADRATIC EQUATION SOLVER
// ============================================================
function solveQuadratic() {
    const a = parseFloat(document.getElementById('q_a').value);
    const b = parseFloat(document.getElementById('q_b').value);
    const c = parseFloat(document.getElementById('q_c').value);
    const res = document.getElementById('q_result');

    // Validate a ≠ 0
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        setResult(res, 'Please enter valid numbers for all coefficients.', 'error');
        return;
    }

    if (a === 0) {
        setResult(res, '❌ Error: "a" cannot be zero (not a quadratic equation).', 'error');
        return;
    }

    const disc = b * b - 4 * a * c;

    if (disc > 0) {
        const x1 = ((-b + Math.sqrt(disc)) / (2 * a));
        const x2 = ((-b - Math.sqrt(disc)) / (2 * a));
        setResult(
            res,
            `✅ Two Real Roots: x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`,
            'success'
        );
    } else if (disc === 0) {
        const x = -b / (2 * a);
        setResult(
            res,
            `✅ One Repeated Real Root: x = ${x.toFixed(4)}`,
            'success'
        );
    } else {
        const real = (-b / (2 * a));
        const imag = (Math.sqrt(-disc) / (2 * a));
        setResult(
            res,
            `✅ Complex Conjugate Roots: x = ${real.toFixed(4)} ± ${imag.toFixed(4)}i`,
            'warning'
        );
    }
}

// ============================================================
// TASK 3.2: PYTHAGOREAN THEOREM CALCULATOR
// ============================================================
function calcPythagoras() {
    const a = parseFloat(document.getElementById('p_a').value);
    const b = parseFloat(document.getElementById('p_b').value);
    const res = document.getElementById('p_result');

    if (isNaN(a) || isNaN(b)) {
        setResult(res, 'Please enter valid numbers for both sides.', 'error');
        return;
    }

    if (a <= 0 || b <= 0) {
        setResult(res, '❌ Error: Side lengths must be positive numbers.', 'error');
        return;
    }

    const c = Math.sqrt(a * a + b * b);
    setResult(
        res,
        `✅ Hypotenuse c = ${c.toFixed(4)}  |  (${a.toFixed(2)}² + ${b.toFixed(2)}² = ${c.toFixed(4)}²)`,
        'success'
    );
}

// ============================================================
// TASK 3.3: FACTORIAL CALCULATOR
// ============================================================
function calcFactorial() {
    const n = parseInt(document.getElementById('fact_n').value);
    const res = document.getElementById('fact_result');

    if (isNaN(n)) {
        setResult(res, 'Please enter a valid integer.', 'error');
        return;
    }

    if (n < 0) {
        setResult(res, '❌ Error: n must be a non-negative integer.', 'error');
        return;
    }

    if (n > 170) {
        setResult(res, '❌ Error: n is too large (max 170). Result would overflow.', 'error');
        return;
    }

    let result = 1;
    let steps = [];
    for (let i = 2; i <= n; i++) {
        result *= i;
        if (i <= 10) steps.push(i);
    }

    let displaySteps = steps.length > 0 ? ` = ${steps.join(' × ')} × ...` : '';
    setResult(
        res,
        `✅ ${n}! = ${result.toLocaleString()}${displaySteps}`,
        'success'
    );
}

// ============================================================
// TASK 3.3 EXTRA: DESCRIPTIVE STATISTICS
// ============================================================
function calcStatistics() {
    const input = document.getElementById('stats_data').value;
    const res = document.getElementById('stats_result');

    const numbers = input.split(',')
        .map(s => s.trim())
        .filter(s => s !== '')
        .map(Number)
        .filter(n => !isNaN(n));

    if (numbers.length === 0) {
        setResult(res, 'Please enter at least one valid number.', 'error');
        return;
    }

    // Sort for median and mode
    const sorted = [...numbers].sort((a, b) => a - b);
    const n = numbers.length;

    // Mean
    const sum = numbers.reduce((s, v) => s + v, 0);
    const mean = sum / n;

    // Median
    let median;
    if (n % 2 === 0) {
        median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    } else {
        median = sorted[Math.floor(n / 2)];
    }

    // Mode
    const freq = {};
    numbers.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
    let maxFreq = 0;
    let modes = [];
    for (const [val, count] of Object.entries(freq)) {
        if (count > maxFreq) {
            maxFreq = count;
            modes = [parseFloat(val)];
        } else if (count === maxFreq) {
            modes.push(parseFloat(val));
        }
    }
    const modeStr = modes.length === 1 ? modes[0] : 'Multi-modal';

    // Standard Deviation (population)
    const variance = numbers.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
    const stdDev = Math.sqrt(variance);

    // Range
    const range = sorted[n - 1] - sorted[0];

    setResult(
        res,
        `📊 n = ${n} | Mean = ${mean.toFixed(4)} | Median = ${median.toFixed(4)} | Mode = ${modeStr} | σ = ${stdDev.toFixed(4)} | Range = ${range.toFixed(4)}`,
        'success'
    );
}

// ============================================================
// UTILITY: Clear Result
// ============================================================
function clearResult(elementId) {
    const res = document.getElementById(elementId);
    const defaultMessages = {
        'q_result': 'Enter coefficients and click Solve',
        'p_result': 'Enter side lengths and click Calculate',
        'fact_result': 'Enter a number and click Calculate',
        'stats_result': 'Enter numbers separated by commas and click Analyze'
    };
    res.className = 'result-box';
    res.innerHTML = `<i class="fas fa-info-circle"></i> ${defaultMessages[elementId] || 'Ready'}`;
}

// ============================================================
// UTILITY: Set Result with Styling
// ============================================================
function setResult(element, message, type = 'info') {
    const iconMap = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-triangle-exclamation',
        'info': 'fa-info-circle'
    };
    element.className = `result-box ${type}`;
    element.innerHTML = `<i class="fas ${iconMap[type] || iconMap.info}"></i> ${message}`;
}