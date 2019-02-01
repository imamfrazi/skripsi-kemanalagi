<script src="{{ asset('public/admin_template/bower_components/datatables.net/js/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('public/admin_template/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js') }}"></script>
<script>
	$(document).ready(function() {
		getData()
		var datatable		
		$('#menuLinks').addClass('active')		
	})
	$('#formModal').on('hide.bs.modal', function () {
	    $('#formInput').trigger('reset')
	})
	$('#addButton').click(function() {		
	    $('#formInput input[name$="action"]').val('save')
	    $('#modalLabel').html('Tambah Data')
	    $('#submitButton').html('Simpan')	    
	    $("#formModal").modal('show')
	})
	$('#table tbody').on( 'click', '#editButton', function() {		
		var row = datatable.row( $(this).parents('tr') ).data()		
		$('#idLinkWisata').val(row['idLinkWisata'])
		$('#judul').val(row['judul'])
		$('#link').val(row['link'])
		$('#daerah').val(row['daerah'])
		$('#kategori').val(row['kategori'])		
	    $('#formInput input[name$="action"]').val('update')
	    $('#modalLabel').html('Edit Data')
	    $('#submitButton').html('Ubah')	    
	    $("#formModal").modal('show')
	})	
	$('#table tbody').on( 'click', '#deleteButton', function() {
		var row = datatable.row( $(this).parents('tr') ).data()
		$('#idData').val(row['idLinkWisata'])		
	    $("#formModalDelete").modal('show')
	    $('#deleteInformation').html('<span>Ingin menghapus data dengan judul : <b>'+ row['judul'] +'</b></span>')
	})
	function getData() {
		table = $('#table')
		data  = {
          	"processing" : true,
          	"serverSide" : false,
          	"bInfo"      : false,
          	"order"      : [
            	[0, 'asc']
          	],
			"oLanguage"  : {
				"sLengthMenu"  : "Tampilkan _MENU_ data per halaman",
				"sSearch"      : "Pencarian:",
				"sEmptyTable"  : "Tidak ada data tersedia.",
				"sZeroRecords" : "Tidak ada data ditemukan.",
				"oPaginate"    : {
			        "sFirst"    : "Pertama",
			        "sLast"     : "Terakhir",
			        "sNext"     : "Berikutnya",
			        "sPrevious" : "Sebelumnya"
			    },
	        },
          	"ajax": {
	            "url"      : "{{ route('admin.link.get') }}",
    	        "dataType" : "JSON",
        	    "type"     : "GET",
        	    "dataSrc"  : ""
          	},
          	"columns":[
            	{"data":"no"},
            	{"data":"judul"},            	
            	{"data":"daerah"},
            	{"data":"kategori"},
            	{ "defaultContent": `
	                <center>
	            		<button type="button" class="btn btn-warning btn-sm" id="editButton"><i class="fa fa-edit"></i> Edit</button>
	            		<button type="button" class="btn btn-danger btn-sm" id="deleteButton"><i class="fa fa-trash"></i> Hapus</button>
            		</center>`
            	}
          	]
        }
        datatable = table.DataTable(data)
    }
    $('#formInput').submit(function(e) {
	    e.preventDefault()
	    $.LoadingOverlay("show")
	    $('#submitButton').prop('disabled', false)
	    var data = new FormData($(this)[0])
	    var action = $('#formInput input[name$="action"]').val()
	    if(action=='save') {
	      	var url = '{{ route("admin.link.store") }}'
	    } else if(action=='update') {
	      	var url = '{{ route("admin.link.update") }}'
	    }
	    $.ajax({
	      	type        : 'POST',
	      	dataType    : 'JSON',
	      	url         : url,
	      	data        : data,
	      	processData : false,
        	contentType : false,
        	cache       : false,
        	enctype     : 'multipart/form-data',
	      	success: function(data) {
	        	console.log(data)
	        	if(data===true) {
		          	swal (
		            	'Berhasil!',
		            	'Berhasil menyimpan data.',
			            'success'
			        )
		          	datatable.destroy()
		            getData()
		            $('#formModal').modal('hide')
	            } else {
		          	swal (
		            	'Gagal!',
		            	'Gagal menyimpan data.',
		            	'warning'
		          	)
		        }
	        	$('#submitButton').prop('disabled', false)
	        	$.LoadingOverlay("hide")
	      	}, error: function(error) {
	        	console.log(error)
	        	swal (
	          		'Gagal!',
	          		'Gagal menyimpan data.',
	          		'warning'
	        	)
	        	$.LoadingOverlay("hide")
	        	$('#submitButton').prop('disabled', false)
	   		}
	   	})
	})
	$('#formInputDelete').submit(function(e) {
	    e.preventDefault()
	    $.LoadingOverlay("show")
	    $('#submitButtonDelete').prop('disabled', false)
	    var data = new FormData($(this)[0])
	    $.ajax({
	      	type        : 'POST',
	      	dataType    : 'JSON',
	      	url         : '{{ route("admin.link.delete") }}',
	      	data        : data,
	      	processData : false,
        	contentType : false,
        	cache       : false,
	      	success: function(data) {
	        	console.log(data)
	        	if(data===true) {
		          	swal (
		            	'Berhasil!',
		            	'Berhasil menghapus data.',
			            'success'
			        )
		          	datatable.destroy()
		            getData()
		            $('#formModalDelete').modal('hide')
	            } else {
		          	swal (
		            	'Gagal!',
		            	'Gagal menghapus data.',
		            	'warning'
		          	)
		        }
	        	$('#submitButtonDelete').prop('disabled', false)
	        	$.LoadingOverlay("hide")
	      	}, error: function(error) {
	        	console.log(error)
	        	swal (
	          		'Gagal!',
	          		'Gagal menghapus data.',
	          		'warning'
	        	)
	        	$.LoadingOverlay("hide")
	        	$('#submitButtonDelete').prop('disabled', false)
	   		}
	   	})
	})
</script>