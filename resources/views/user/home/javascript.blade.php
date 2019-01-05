<script src="{{ asset('public/user_template/js/style.js') }}"></script>
<script>	
	$(document).ready(function() {
    // cari keberangkatan
	    $("#form_keberangkatan").submit(function () {
	      var kategori = $("#selectKategori").val()
	      var daerah = $("#selectDaerah").val()

	      if (kategori == "") {
	        $("#selectKategori").focus()
	        return false
	      } else if (daerah == "") {
	        $("#selectDaerah").focus()
	        return false
	      }
	    })
	})
</script>