<div class="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="modalLabel">Tambah Data</h4>
      </div>
      <form id="formInput" class="form-horizontal" enctype="multipart/form-data">
        <div class="modal-body">          
          @csrf
          <input type="hidden" name="action" id="action">
          <input type="hidden" name="idUser" id="idUser">
          <input type="hidden" name="oldFoto" id="oldFoto">
          <div class="box-body">
            <div class="form-group">
              <label class="col-sm-3 control-label">Nama Lengkap</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="namaLengkap" name="namaLengkap" required placeholder="Nama Lengkap">
              </div>
            </div>            
            <div class="form-group">
              <label class="col-sm-3 control-label">Username</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="username" name="username" required placeholder="Username">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Password</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" id="password" name="password" required placeholder="Password">
                <span><i id="infoPassword">kosongkan jika tidak ingin mengubah password.</i></span>
              </div>
            </div>
            <div class="form-group" id="formFoto">
              <div class="col-sm-3"></div>
              <div class="col-sm-9">
                <div class="attachment-block clearfix">
                  <div style="margin-left:5px;">Foto :</div>
                  <div id="divFoto"></div>
                </div>
              </div>            
            </div>            
            <div class="form-group">
              <label class="col-sm-3 control-label">Foto</label>
              <div class="col-sm-9">
                <input type="file" id="foto" name="foto" required accept="image/x-png,image/jpeg">
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