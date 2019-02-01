<div class="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="modalLabel">Tambah Data</h4>
      </div>
      <form id="formInput" class="form-horizontal" novalidate>
        <div class="modal-body">                    
          <div class="box-body">
            @csrf
            <input type="hidden" name="action" id="action">
            <input type="hidden" name="idLinkWisata" id="idLinkWisata">            
            <div class="form-group">
              <label class="col-sm-3 control-label">Judul</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="judul" name="judul" required placeholder="Judul">
              </div>
            </div>            
            <div class="form-group">
              <label class="col-sm-3 control-label">Link Wisata</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="link" name="link" required placeholder="Link Wisata">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Daerah</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="daerah" name="daerah" required placeholder="Daerah">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Kategori</label>
              <div class="col-sm-9">
                  <select class="form-control" id="kategori" name="kategori" required>
                    <option selected disabled>Pilih Kategori</option>
                    <option>Air Terjun</option>
                    <option>Bukit</option>
                    <option>Danau</option>
                    <option>Goa</option>
                    <option>Kebun Wisata</option>
                    <option>Monumen</option>
                    <option>Museum</option>
                    <option>Pantai</option>
                    <option>Taman</option>
                  </select>                
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Batal</button>
          <button type="submit" id="submitButton" class="btn btn-primary">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</div>