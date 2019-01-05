<script>
	$(document).ready(function() {
		$('#menuDashboard').addClass('active')
		getData()
	})
	function getData() {
	    $.ajax({
	      	type        : 'GET',
	      	dataType    : 'JSON',
	      	url         : '{{ route("admin.dashboard.get") }}',
	      	success: function(data) {
	        	if(data!==null) {
	        		$('#cities').html(data[0]['cities'])
	        		$('#tours').html(data[0]['tours'])
	        		$('#users').html(data[0]['users'])
	        	}
	      	}, error: function(error) {
	        	console.log(error)
	   		}
	   	})
	}
</script>