/**

 * 
 */
$(document).ready(function() {

	$(".edit").click(function() {
		
		console.log("Edit price information");
		var row =$(this).closest("tr");
		
		var id = row.find(".id").text();
		var date = row.find(".date").text();
		var item = row.find(".item").text();
		var price = row.find(".price").text();
		
		$("#new-price").dialog();
		("#new-price .id").val(id);
		
		
			
		console.log(id);
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
