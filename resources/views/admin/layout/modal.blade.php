<div class="modal fade" id="formModalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Hapus Data</h4>
      </div>
      <form id="formInputDelete" class="form-horizontal">
        <div class="modal-body">          
          @csrf
          <input type="hidden" id="oldImageDelete" name="oldImageDelete">
          <input type="hidden" id="idData" name="idData">
          <div id="deleteInformation"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Batal</button>
          <button type="submit" id="submitButtonDelete" class="btn btn-danger">Hapus</button>
        </div>
      </form>
    </div>
  </div>
</div>