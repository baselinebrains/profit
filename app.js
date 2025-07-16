// app.js - Fetch data from Google Sheets and populate tables

const dashboardUrl = 'https://docs.google.com/spreadsheets/d/1Qvnbf4YhDpheyetWUjf0YcMoAbXTWqfX/export?format=csv&gid=1265439786';
const tipsUrl = 'https://docs.google.com/spreadsheets/d/1Qvnbf4YhDpheyetWUjf0YcMoAbXTWqfX/export?format=csv&gid=1251556089';

async function fetchCSV(url) {
  const response = await fetch(url);
  const csvText = await response.text();
  return csvText.split('\n').map(row => row.split(',').map(cell => cell.trim()));
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
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Data rows
  data.slice(1).forEach(rowData => {
    if (rowData.every(cell => !cell)) return; // Skip empty rows
    const tr = document.createElement('tr');
    rowData.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}

async function loadData() {
  try {
    // Load Dashboard as table
    const dashboardData = await fetchCSV(dashboardUrl);
    const dashboardTable = createTableFromCSV(dashboardData);
    document.getElementById('dashboardContainer').appendChild(dashboardTable);

    // Load Tips Log into existing table
    const tipsData = await fetchCSV(tipsUrl);
    const tipsTbody = document.querySelector('.dataTable tbody');
    tipsTbody.innerHTML = '';
    tipsData.slice(1).forEach(row => {
      if (!row.join('').trim()) return;
      const [date, tip, odds, stake, outcome, profit] = row;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${date}</td>
        <td>${tip}</td>
        <td>${odds}</td>
        <td>${stake}</td>
        <td class="${outcome ? outcome.toLowerCase() : ''}">${outcome}</td>
        <td>${profit}</td>
      `;
      tipsTbody.appendChild(tr);
    });

    // Update last updated
    document.getElementById('lastUpdated').textContent = `Last Updated: ${new Date().toLocaleString()}`;
  } catch (error) {
    console.error('Error loading data:', error);
    document.getElementById('lastUpdated').textContent = 'Error loading data - Ensure sheets are published as CSV.';
  }
}

document.addEventListener('DOMContentLoaded', loadData);
