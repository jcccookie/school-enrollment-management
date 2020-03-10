function deleteStudent(id){
   $.ajax({
       url: '/admin/student/' + id,
       type: 'DELETE',
       success: function(result){
           window.location.reload(true);
       }
   })
};

function deleteAccount(id){
    $.ajax({
        url: '/admin/account/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
 };

function deleteSubject(id){
    $.ajax({
        url: '/admin/subject/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
 };

 function deleteTerm(id){
    $.ajax({
        url: '/admin/term/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
 };