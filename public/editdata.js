function editClass(id){
    $.ajax({
        url: '/admin/class/' + id,
        type: 'PUT',
        data: $('#edit-class').serialize(),
        success: function(result){
            window.location.replace("/admin/");
        }
    })
 };
 
function editStudent(id){
   $.ajax({
       url: '/admin/student/' + id,
       type: 'PUT',
       data: $('#edit-student').serialize(),
       success: function(result){
           window.location.replace("/admin/");
       }
   })
};
