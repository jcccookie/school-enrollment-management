function filterClassesByTerm() {
   var termId = document.getElementById('filterTerm').value;
   window.location = '/search/filterterm/' + parseInt(termId);
}
