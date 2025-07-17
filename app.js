// app.js - Fetch data from Google Sheets and populate tables

const dashboardUrl = 'https://docs.google.com/spreadsheets/d/1Qvnbf4YhDpheyetWUjf0YcMoAbXTWqfX/export?format=csv&gid=1265439786';
const tipsUrl = 'https://docs.google.com/spreadsheets/d/1Qvnbf4YhDpheyetWUjf0YcMoAbXTWqfX/export?format=csv&gid=1251556089';

let tipsDataGlobal = []; // To store tips data for export and charts

async function fetchCSV(url) {
  const response = await fetch(url);
  const csvText = await response.text();
  const parsed = Papa.parse(csvText, {header: false, skipEmptyLines: true});
  return parsed.data;
}

function createTableFromCSV(data) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Header row
  const headerRow = document.createElement('tr');
  data[0].forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    th.setAttribute('aria-label', header);
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Data rows
  data.slice(1).forEach(rowData => {
    if (rowData.every(cell => !cell)) return; // Skip empty rows
    const tr = document.createElement('tr');
    rowData.forEach((cell, index) => {
      const td = document.createElement('td');
      td.textContent = cell;
      if (index === 0) { // Metric column
        const lowerCell = cell.toLowerCase();
        if (lowerCell === 'wins') {
          td.className = 'win';
        } else if (lowerCell === 'losses') {
          td.className = 'loss';
        } else if (lowerCell.includes('void')) {
          td.className = 'void';
        }
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}

function createProfitChart(tipsData) {
  // Sort by date
  tipsData.sort((a, b) => new Date(a[0]) - new Date(b[0]));

  let cumulativeProfit = 0;
  const labels = [];
  const profits = [];

  tipsData.forEach(row => {
    const [date, , , odds, stake, outcome] = row;
    if (!outcome) return;
    const lowerOutcome = outcome.toLowerCase();
    let profit = 0;
    if (lowerOutcome === 'win') {
      profit = parseFloat(stake) * (parseFloat(odds) - 1);
    } else if (lowerOutcome === 'loss') {
      profit = -parseFloat(stake);
    } // void or pending = 0
    cumulativeProfit += profit;
    labels.push(date);
    profits.push(cumulativeProfit);
  });

  const ctx = document.getElementById('profitChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Cumulative Profit',
        data: profits,
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

async function loadData() {
  const loading = document.getElementById('loading');
  loading.style.display = 'block';

  try {
    // Load Dashboard as table
    const dashboardData = await fetchCSV(dashboardUrl);
    const dashboardTable = createTableFromCSV(dashboardData);
    document.getElementById('dashboardContainer').appendChild(dashboardTable);

    // Load Tips Log with DataTables
    const tipsData = await fetchCSV(tipsUrl);
    tipsDataGlobal = tipsData; // Store for export and chart

    $('#tipsTable').DataTable({
      data: tipsData.slice(1),
      columns: [
        { data: 0 },
        { data: 1 },
        { data: 2 },
        { data: 3 },
        { data: 4 },
        {
          data: 5,
          createdCell: function (td, cellData, rowData, row, col) {
            const lowerOutcome = cellData ? cellData.toLowerCase() : '';
            if (lowerOutcome === 'win') {
              $(td).addClass('win');
            } else if (lowerOutcome === 'loss') {
              $(td).addClass('loss');
            } else if (lowerOutcome.includes('void')) {
              $(td).addClass('void');
            } else if (lowerOutcome.includes('pending')) {
              $(td).addClass('pending');
            }
          }
        }
      ],
      order: [[0, 'desc']], // Default sort by Date (column 0) descending (most recent first)
      paging: true,
      pageLength: 20,
      searching: true,
      ordering: true,
      responsive: true
    });

    // Create profit chart
    createProfitChart(tipsData.slice(1));

    // Update last updated
    document.getElementById('lastUpdated').textContent = `Last Updated: ${new Date().toLocaleString()}`;
  } catch (error) {
    console.error('Error loading data:', error);
    document.getElementById('lastUpdated').textContent = 'Error loading data - Ensure sheets are published as CSV.';
  } finally {
    loading.style.display = 'none';
  }
}

// Export functionality
document.getElementById('exportCsv').addEventListener('click', function() {
  const csv = Papa.unparse(tipsDataGlobal);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'tips_log.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

document.addEventListener('DOMContentLoaded', loadData);
