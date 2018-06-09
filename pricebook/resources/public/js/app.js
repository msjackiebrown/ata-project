/**

 * 
 */
$(document).ready(function() {

	$("#edit").click(function() {
		
		console.log("Edit price information");
		var id =$("#edit").parent.id();
		
		//Get parent row

		$.ajax({
		    url: '/',
		    type: 'PUT',
		    success: function(result) {
		        location.reload();
		    }
		});
	})
	
	$("#delete").click(function () {
		

		console.log("Delete price information");
		$.ajax({
		    url: '/',
		    type: 'DELETE',
		    success: function(result) {
		        location.reload();
		    }
		});
		
	});
	
	$("#new-price").hide();
	
	
	$("#add").click(function () { 
		
		console.log("Add price informaion");
		$("#new-price").dialog();
	});
	
});
