import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const addTaxPayerForm = document.getElementById('addTaxPayerForm');
  const searchButton = document.getElementById('searchButton');
  const taxPayerListItems = document.getElementById('taxPayerListItems');
  const searchResult = document.getElementById('searchResult');

  // Function to display all tax payers
  async function displayAllTaxPayers() {
    const taxPayers = await backend.getAllTaxPayers();
    taxPayerListItems.innerHTML = '';
    taxPayers.forEach(tp => {
      const li = document.createElement('li');
      li.textContent = `TID: ${tp.tid}, Name: ${tp.firstName} ${tp.lastName}, Address: ${tp.address}`;
      taxPayerListItems.appendChild(li);
    });
  }

  // Add new tax payer
  addTaxPayerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tid = document.getElementById('tid').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;

    await backend.addTaxPayer(tid, firstName, lastName, address);
    addTaxPayerForm.reset();
    displayAllTaxPayers();
  });

  // Search for a tax payer
  searchButton.addEventListener('click', async () => {
    const searchTid = document.getElementById('searchTid').value;
    const result = await backend.searchTaxPayer(searchTid);
    if (result) {
      searchResult.textContent = `Found: TID: ${result.tid}, Name: ${result.firstName} ${result.lastName}, Address: ${result.address}`;
    } else {
      searchResult.textContent = 'No TaxPayer found with that TID.';
    }
  });

  // Initial display of all tax payers
  displayAllTaxPayers();
});