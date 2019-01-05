<script>
	$('#formInput').submit(function(e) {
	    e.preventDefault()
	    $.LoadingOverlay("show")
	    $('#submitButton').prop('disabled', false)
	    var data = $('#formInput').serialize()
	    $.ajax({
	      	type        : 'POST',
	      	dataType    : 'JSON',
	      	url         : '{{ route("admin.login.sigin") }}',
	      	data        : data,
	      	success: function(data) {
	        	console.log(data)
	        	if(data===true) {
		          	window.location.href = '{{ route("admin.dashboard.index") }}'
	            } else {
		          	swal (
		            	'Gagal!',
		            	'Username atau password anda salah.',
		            	'warning'
		          	)
		        }
	        	$('#submitButton').prop('disabled', false)
	        	$.LoadingOverlay("hide")
	      	}, error: function(error) {
	        	console.log(error)
	        	swal (
	          		'Gagal!',
	          		'Username atau password anda salah.',
	          		'warning'
	        	)
	        	$.LoadingOverlay("hide")
	        	$('#submitButton').prop('disabled', false)
	   		}
	   	})
	})
</script>