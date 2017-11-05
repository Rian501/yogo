"use strict";


$(".xbuttons").click(function(event) {
  let pose_id = this.name;
  let seq_id = this.value;
  $.ajax({
    type: "DELETE",
    url: `/seqCard/${seq_id}/${pose_id}`
  }).then(data => {});
});
