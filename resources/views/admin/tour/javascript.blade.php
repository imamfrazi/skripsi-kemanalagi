<script src="{{ asset('public/admin_template/bower_components/datatables.net/js/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('public/admin_template/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js') }}"></script>
<script src="{{ asset('public/admin_template/plugins/input-mask/jquery.inputmask.js') }}"></script>
<script src="{{ asset('public/admin_template/plugins/input-mask/jquery.inputmask.date.extensions.js') }}"></script>
<script src="{{ asset('public/admin_template/plugins/input-mask/jquery.inputmask.extensions.js') }}"></script>
<script src="{{ asset('public/admin_template/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js') }}"></script>
<script src="{{ asset('public/js/jqueryMaskMoney.min.js') }}"></script>
<script>
	$(document).ready(function() {
		getData()
		var datatable		
		$('#menuTours').addClass('active')
		$('#hargaTiket').maskMoney({
			prefix        : 'Rp ',
			allowNegative : false,
			thousands     : '.',
			decimal       : ',',
			affixesStay   : false,
			allowZero     : true,
			allowNegative : true,
			allowEmpty    : true,
			defaultZero   : false,
			precision     : 0
		})
		$('[data-mask]').inputmask()
		$('#gambarCover').filestyle({
			btnClass    : 'btn-primary',
			placeholder : 'Gambar Cover',
			text        : 'Pilih Gambar',
		})
		$('#gambarPriview').filestyle({
			btnClass    : 'btn-primary',
			placeholder : 'Gambar Priview',
			text        : 'Pilih Gambar',
		})
		$('#deskripsi').wysihtml5({
			toolbar: {
				"font-styles" : true,
				"emphasis"    : true,
				"lists"       : true,
				"html"        : false,
				"link"        : false,
				"image"       : false,
				"color"       : false,
				"blockquote"  : true,
				"size"        : 'sm'
			}
		})
	})
	$('#formModal').on('hide.bs.modal', function () {
	    $('#formInput').trigger('reset')
	    $('iframe').contents().find('.wysihtml5-editor').html('Ketikkan deskripsi disini')
	})
	$('#addButton').click(function() {
		$('#gambarCover').attr('required', true)
		$('#gambarPriview').attr('required', true)
	    $('#formInput input[name$="action"]').val('save')
	    $('#modalLabel').html('Tambah Data')
	    $('#submitButton').html('Simpan')
	    $('#divGambarCover').empty()
	    $('#divGambarPriview').empty()
	    $('#gambarCoverEdit').hide()
	    $('#gambarPriviewEdit').hide()
	    $("#formModal").modal('show')
	})
	$('#table tbody').on( 'click', '#editButton', function() {
		var html = ""
		var row = datatable.row( $(this).parents('tr') ).data()
		$('#gambarCover').attr('required', false)
		$('#gambarPriview').attr('required', false)
		var urlGambar = '{{ asset("storage/app/public/tour/imageCover") }}/' + row['gambarCover']
		$('#idWisata').val(row['idWisata'])
		$('#namaWisata').val(row['namaWisata'])
		$('#alamat').val(row['alamat'])
		$('#daerah').val(row['daerah'])
		$('#kategori').val(row['kategori'])
		$('#hargaTiket').val(row['hargaTiket'])
		$('#jadwal').val(row['jadwal'])
		$('#fasilitas').val(row['fasilitas'])
		$('#kontak').val(row['kontak'])
		$('#oldImageCover').val(row['gambarCover'])
		$('#divGambarCover').html('<img class="attachment-img" src="'+urlGambar+'" alt="Gambar Cover" style="margin:5px;">')
		$.each(row['galeri'], function(index, value) {
			var urlImage = '{{ asset("storage/app/public/tour/imagePriview") }}/' + value['namaGambar']
			html += '<img class="attachment-img" src="'+urlImage+'" alt="Gambar Priview" style="margin:5px;">'
        })
        $('#divGambarPriview').html(html)
        $('iframe').contents().find('.wysihtml5-editor').html(row['deskripsi'])
	    $('#formInput input[name$="action"]').val('update')
	    $('#modalLabel').html('Edit Data')
	    $('#submitButton').html('Ubah')
	    $('#gambarCoverEdit').show()
	    $('#gambarPriviewEdit').show()
	    $("#formModal").modal('show')
	})
	$('#table tbody').on( 'click', '#detailButton', function() {
		var html = ""
		var row = datatable.row( $(this).parents('tr') ).data()
		$('.titlePriview').html(row['namaWisata'])
		$('#deskripsiPriview').html(row['deskripsi'])
		$('#alamatPriview').html(row['alamat'])
		$('#daerahPriview').html(row['daerah'])
		$('#kontakPriview').html(row['kontak'])
		$('#jadwalPriview').html(row['jadwal'])			
		$('#kategoriPriview').html(row['kategori'])
		$('#fasilitasPriview').html(row['fasilitas'])
		$('#hargaTiketTampilPriview').html(row['hargaTiketTampil'])
		$('#imageCoverPriview').attr('src', '{{ asset("storage/app/public/tour/imageCover") }}/' + row['gambarCover'])
		$.each(row['galeri'], function(index, value) {
			var urlImage = '{{ asset("storage/app/public/tour/imagePriview") }}/' + value['namaGambar']
			html += '<img class="attachment-img" src="'+urlImage+'" alt="Gambar Priview" style="margin:5px;">'
        })
        $('#galeriPriview').html(html)
	    $("#formModalPriview").modal('show')
	})
	$('#table tbody').on( 'click', '#deleteButton', function() {
		var row = datatable.row( $(this).parents('tr') ).data()
		$('#idData').val(row['idWisata'])
		$('#oldImageDelete').val(row['gambarCover'])
	    $("#formModalDelete").modal('show')
	    $('#deleteInformation').html('<span>Ingin menghapus data dengan nama wisata : <b>'+ row['namaWisata'] +'</b></span>')
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
	            "url"      : "{{ route('admin.tour.get') }}",
    	        "dataType" : "JSON",
        	    "type"     : "GET",
        	    "dataSrc"  : ""
          	},
          	"columns":[
            	{"data":"no"},
            	{"data":"namaWisata"},
            	{"data":"alamat"},
            	{"data":"daerah"},
            	{"data":"kategori"},
            	{"data":"kontak"},
            	{ "defaultContent": `
	                <center>
            			<button type="button" class="btn btn-primary btn-sm" id="detailButton"><i class="fa fa-eye"></i> Priview</button>
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
	      	var url = '{{ route("admin.tour.store") }}'
	    } else if(action=='update') {
	      	var url = '{{ route("admin.tour.update") }}'
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
	      	url         : '{{ route("admin.tour.delete") }}',
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