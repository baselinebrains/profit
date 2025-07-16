body {
  font-family: 'Poppins', Arial, sans-serif;
  padding: 1rem;
  background: linear-gradient(to bottom, #2D4F3A, #1E3A28);
  color: #fff;
  text-align: center;
  line-height: 1.6;
}

.hero {
  padding: 0;
  margin-bottom: 0.5rem;
  border-bottom: none; /* Removed border to reduce space */
}

.logo {
  width: 100%;
  max-width: 150px;
  margin-bottom: 0;
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

h1 {
  margin-bottom: 0;
  font-size: 2rem;
  color: #FFD700;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

#lastUpdated {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #ddd;
}

h2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: #FFD700;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.table-container {
  overflow-x: auto;
}

table.dataTable {
  border-collapse: collapse;
  margin: 0 auto 1rem;
  width: 95%;
  max-width: 1000px;
  background: #fff;
  color: #000;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background: #FFD700;
  color: #000;
  position: sticky;
  top: 0;
  z-index: 1;
}

tr:nth-child(even) {
  background-color: #E8F5E9; /* Light green tint for brand */
}

tr {
  transition: background 0.3s;
}

tr:hover {
  background-color: #DCE775; /* Light goldish for hover */
}

td.win {
  color: #fff;
  font-weight: bold;
  background: #0b883e; /* Full green for wins */
}

td.loss {
  color: #fff;
  font-weight: bold;
  background: #c0392b; /* Full red for losses */
}

td.void {
  color: #fff;
  font-weight: bold;
  background: #888; /* Gray for voids */
}

td.pending {
  color: #000;
  font-weight: bold;
  background: #ddd; /* Light gray for pending */
}

.chart-container {
  max-width: 1000px;
  margin: 0 auto 1rem;
  border: 1px solid #FFD700;
  border-radius: 8px;
  background: #fff;
  padding: 0.5rem;
  overflow-x: auto;
}

.chart-container table {
  width: 100%;
  border-collapse: collapse;
  color: #000;
}

.chart-container th, .chart-container td {
  border: 1px solid #ddd;
  padding: 8px;
}

.chart-container th {
  background: #FFD700;
}

.chart-container tr:nth-child(even) {
  background-color: #E8F5E9;
}

.chart-container tr:hover {
  background-color: #DCE775;
}

footer {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #aaa;
  background: #1E3A28;
  padding: 1rem;
  position: relative;
  width: 100%;
}

a {
  color: #FFD700;
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: #fff;
  text-decoration: underline;
}

i.fab {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  body {
    padding: 0.5rem;
  }
  h1 {
    font-size: 1.5rem;
  }
  .logo {
    max-width: 100px;
  }
  table.dataTable {
    font-size: 0.8rem;
    width: 100%;
  }
  .chart-container {
    max-width: 100%;
    padding: 0.5rem;
  }
}
