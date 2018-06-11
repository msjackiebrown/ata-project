/**

 * 
 */
$(document).ready(function() {
	
	//Init page
	buildChart();

	$("#confirm-dialog").dialog({
		
		autoOpen: false,
		modal: true
	});

	$(".delete").click(function() {
		
		console.log("Delete price information");
		var targetUrl = $(this).attr("href");
		var $row =$(this).closest("tr");
		var id = $row.find(".id").text();
		var date = $row.find(".date").text();
		var item = $row.find(".item").text();
		var price = $row.find(".price").text();
		
		$("#confirm-delete").dialog({
			buttons: {
				"Confirm": function () {
					
					window.location.href=targetUrl;
					$.ajax({
					    url: '/',
					    type: 'DELETE',
					    success: function(result) {
					        location.reload();
					    }
					});
					
				},
				"Cancel" : function () {
					
					$(this).dialog("close");
				}
				
			}
			
		});
		
		$("#confirm-delete").dialog("open");
	});
	
	
	$(".edit").click(function() {
		
		console.log("Edit price information");
		
		var $row =$(this).closest("tr");
		var id = $row.find(".id").text();
		var entry_date = $row.find(".entry_date").text();
		var item = $row.find(".item").text();
		var price = $row.find(".price").text();
	
		console.log(id);
		console.log(entry_date);
		console.log(item);
		console.log(price);
	
		var priceEntry ={
				
				id: id,
				entry_date: entry_date,
				item: item,
				price: price
		};
		

			
		displayPriceDialog("Edit Price", "Update price", priceEntry);

	
	});
	
	
	function displayPriceDialog(text,priceEntry)
	{
		$("#new-price .id").val(priceEntry.id);
		$("#new-price .item").val(priceEntry.item);
		$("#new-price .price").val(priceEntry.price);
		$("#new-price").dialog();
	}
	
	
	$("update-price").click(function() {
		
		$.ajax({
		    url: '/',
		    type: 'PUT',
		    success: function(result) {
		        location.reload();
		    }
		});
	});
	
	
	$("#new-price").hide();
	$("#confirm-delete").hide();
	
	
	$("#add").click(function () { 
		
		console.log("Add price informaion");
		$("#new-price").dialog();
	});
	
	
	function buildChart()
	{
		console.log("Build chart...");
		var ctx = document.getElementById("myChart").getContext('2d');
		var chartLabels =	$.ajax({
		    url: '/labels',
		    type: 'GET',
		    success: function(result) {
		    }
		});
		
		var myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels:[chartLabels],
		        datasets: [{
		            label: 'Price By Item',
		            data: [12, 19, 3, 5, 2, 3],
		            backgroundColor: [
		                'rgba(255, 99, 132, 0.2)',
		                'rgba(54, 162, 235, 0.2)',
		                'rgba(255, 206, 86, 0.2)',
		                'rgba(75, 192, 192, 0.2)',
		                'rgba(153, 102, 255, 0.2)',
		                'rgba(255, 159, 64, 0.2)'
		            ],
		            borderColor: [
		                'rgba(255,99,132,1)',
		                'rgba(54, 162, 235, 1)',
		                'rgba(255, 206, 86, 1)',
		                'rgba(75, 192, 192, 1)',
		                'rgba(153, 102, 255, 1)',
		                'rgba(255, 159, 64, 1)'
		            ],
		            borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		});
	}
});
