"use strict";


$(".xbuttons").click(function(event) {
  let seqUsPose_id = this.name;
  let seq_id = this.value;
  $.ajax({
    type: "DELETE",
    url: `/seqCard/${seq_id}/${seqUsPose_id}`
  }).then(data => {});
});
