<script src="{{ asset('public/admin_template/bower_components/datatables.net/js/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('public/admin_template/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js') }}"></script>
<script>
	$(document).ready(function() {
		getData()
		var datatable
		$('#menuUsers').addClass('active')
		$('#foto').filestyle({
			btnClass    : 'btn-primary',
			placeholder : 'Foto',
			text        : 'Pilih Gambar',
		})
	})
	$("#formModal").on('hide.bs.modal', function () {
	    $('#formInput').trigger('reset')	    
	})
	$('#addButton').click(function() {
	    $('#formInput input[name$="action"]').val('save')
	    $('#password').attr('required', true)
	    $('#foto').attr('required', true)
	    $('#modalLabel').html('Tambah Data')
	    $('#submitButton').html('Simpan')
	    $('#infoPassword').hide()
	    $('#divFoto').empty()
	    $('#formFoto').hide()
	    $("#formModal").modal('show')
	})
	$('#table tbody').on( 'click', '#editButton', function() {
		var html = ""
		var row = datatable.row( $(this).parents('tr') ).data()
		var urlGambar = '{{ asset("storage/app/public/user") }}/' + row['foto']
	    $('#formInput input[name$="action"]').val('update')
	    $('#idUser').val(row['idUser'])
	    $('#namaLengkap').val(row['namaLengkap'])
	    $('#username').val(row['username'])
	    $('#password').attr('required', false)
	    $('#foto').attr('required', false)
	    $('#oldFoto').val(row['foto'])
	    $('#divFoto').html('<img class="attachment-img" src="'+urlGambar+'" alt="Gambar Cover" style="margin:5px;">')
	    $('#modalLabel').html('Edit Data')
	    $('#submitButton').html('Ubah')
	    $('#infoPassword').show()
	    $('#formFoto').show()
	    $("#formModal").modal('show')
	})
	$('#table tbody').on( 'click', '#deleteButton', function() {
		var row = datatable.row( $(this).parents('tr') ).data()
		$('#idData').val(row['idUser'])
		$('#oldImageDelete').val(row['foto'])
	    $("#formModalDelete").modal('show')
	    $('#deleteInformation').html('<span>Ingin menghapus data dengan username : <b>'+row['username']+'</b></span>')
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
	            "url"      : "{{ route('admin.user.get') }}",
    	        "dataType" : "JSON",
        	    "type"     : "GET",
        	    "dataSrc"  : ""
          	},
          	"columns":[
            	{"data":"no"},
            	{"data":"namaLengkap"},
            	{"data":"username"},
            	{
		            "data": "foto",
		            "render": function (data) {
	                    return '<img src="{{ asset('storage/app/public/user') }}/'+data+'" alt="..." style="width: 50px;height: 50px">'
	                }
	            },
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
	      	var url = '{{ route("admin.user.store") }}'
	    } else if(action=='update') {
	      	var url = '{{ route("admin.user.update") }}'
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
	      	url         : '{{ route("admin.user.delete") }}',
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