const editPage = () => {
   location.href = "http://localhost:3000/edit"
}

document.getElementById('editButton').addEventListener('click', e => {
   editPage()
});