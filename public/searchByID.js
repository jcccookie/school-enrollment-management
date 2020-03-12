
function getStudentID() {
    
    var studentID  = document.getElementById('student_ID').value;
   
    window.location = '/classes/search/' + studentID;
}
