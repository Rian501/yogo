"use strict";

// let successCallback = () => {
//     location.reload();
// }

$(".xbuttons").click(function(event) {
  let seqUsPose_id = this.name;
  let seq_id = this.value;
  $.ajax({
    type: "DELETE",
    url: `/seqCard/${seq_id}/${seqUsPose_id}`,
    success: function(data){
        window.location.reload(true);
    }
    }).done(data => {
        console.log("Data?", data);
        window.location.reload(true);
    });
});


