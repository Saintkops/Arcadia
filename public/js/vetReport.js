document.addEventListener('DOMContentLoaded', function () {
  const filterForm = document.getElementById('filter-form');

  // Add submit event listener to the filter form
  filterForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission

      const startDate = document.getElementById('start-date').value;
      const endDate = document.getElementById('end-date').value;
      const animalName = document.getElementById('animal-name').value;

      // Build query parameters
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (animalName) params.append('animalName', animalName);
      params.append('ajax', 'true');

      // Fetch filtered reports and update the report container
      fetch(`/admin/rapport?${params.toString()}`)
          .then(response => response.text())
          .then(html => {
              document.getElementById('report-container').innerHTML = html;
          })
          .catch(error => {
              console.error('Error fetching filtered reports:', error);
          });
  });
});