
function getStudentID() {
    var studentID  = document.getElementById('studentID').value
    //construct the URL and redirect to it
    window.location = '/class/search/' + encodeURI(studentID)
}


