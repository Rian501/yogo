"use strict";

$(".mmxbuttons").click(function(event) {
  if(confirm("Are you sure you want to delete this? It will also be removed from all of your sequences!")) {
    let userPoseId = this.value;
    console.log(userPoseId);
    $.ajax({
      type:"DELETE",
      url: `pose/${userPoseId}`,
      success:function(data) {
        window.location.reload(true);
      }
    })
    .done( (data) => {
      console.log(data);
      window.location.reload(true);
    });
  }
});


$(".xbuttons").click(function(event) {
  event.preventDefault();
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


//   $(function() {
  //     $("#sortable").sortable();
  //     $("#sortable").disableSelection();
  //   });
  
  // using from https://blogs.wayne.edu/web/2017/03/13/updating-a-database-display-order-with-drag-and-drop-in-sql//
  $(".sortable").sortable({ items: ".sortable-item", start: function(event, ui) {
    // Create a temporary attribute on the element with the old index
    
  }, update: function(event, ui) {
    let seq_id = $('.sortable-item').data().seqId;
    let SeqUsPosesInOrder =  $(this).sortable("toArray");
    console.log("results to array?", SeqUsPosesInOrder);
    //   let current_position = $(this).attr("data-currentindex");
    //   // Reset the current index
    //   $(this).removeAttr("data-currentindex");
    console.log("does it come throughstill?", seq_id);
    // console.log("does the other come through?", desired_position);
    // Post to the server to handle the changes
    $.ajax({
      type: "PUT",
      url: `/sequence/${seq_id}`,
      data: {
        SeqUsPosesInOrder
      },
      beforeSend: function() {
        // Disable dragging
        $("#sortable").sortable("disable");
      },
      success: function(html) {
        // Re-enable dragging
        $("#sortable").sortable("enable");
      }
    });
  } 
});

$('#updateUserPose').click(function(event){
  let up_special_directions = $('#special_direx').val();
  let up_breath = $('#breath_direx').val();
  let UP_id = $('#updateUserPose').val();
  console.log("directions, breath, id", up_special_directions, up_breath, UP_id);
  $.ajax({
    type: "PUT",
    url: `/user/pose/${UP_id}`,
    data: {
      up_special_directions,
      up_breath
    },
    success: function(html) {
      location.href = "/user/poses"
    }
  });
});

$('#showMoves').click(function(event) {
  $('.my-moves-panel').removeClass('hidden');
})
$('#hideMoves').click(function(event) {
  $('.my-moves-panel').addClass('hidden');
  showinMoves=false;
})

$('.newSeq').click(function(event) {
  console.log("the button is working");
  $(".newSeqTitle").removeClass('hidden');
})

$('#submitSeqTitle').click(function(event){
  console.log("second button also working");
  let seqTitle = $("#newSeqTitle").val();
  let newSeq = parseInt(this.name) + 1;
  console.log('seqtitle', seqTitle);
  console.log('newSeq num', newSeq);
  $.ajax({
    type: "POST",
    url: '/sequence/new',
    data: {
      seqTitle
    },
    success: function(html) {
      location.href=`sequence/${newSeq}`
    }
  });
});


$(".deleteSeq").click(function(event) {
  let seq_id = this.value;
  let seq_id2 = this.name;
  console.log("sequence to delete", seq_id);
  console.log("sequence to delete", seq_id2);
  if(confirm("Are you sure you want to delete this sequence?")) {
    $.ajax({
      type: "DELETE",
      url: `/sequence/${seq_id}`,
      success: function(html) {
        location.href="/sequence"
        location.reload(true)
      },
      failure: function(html) {
        location.href="/sequence"
      }
    });
  }
});