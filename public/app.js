const editPage = () => {
   location.href = "http://access.engr.oregonstate.edu:9777/edit"
}

document.getElementById('editButton').addEventListener('click', e => {
   editPage()
});