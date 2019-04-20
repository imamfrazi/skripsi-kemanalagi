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
            <input type="hidden" name="idWisata" id="idWisata">
            <input type="hidden" name="oldImageCover" id="oldImageCover">
            <div class="form-group">
              <label class="col-sm-3 control-label">Nama Wisata</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="namaWisata" name="namaWisata" required placeholder="Nama Wisata">
              </div>
            </div>            
            <div class="form-group">
              <label class="col-sm-3 control-label">Alamat</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="alamat" name="alamat" required placeholder="Alamat">
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
            <div class="form-group">
              <label class="col-sm-3 control-label">Harga Tiket</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="hargaTiket" name="hargaTiket" required placeholder="Harga Tiket">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Jadwal</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="jadwal" name="jadwal" required placeholder="Jadwal">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Fasilitas</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="fasilitas" name="fasilitas" required placeholder="Fasilitas">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Kontak</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="kontak" name="kontak" data-inputmask='"mask": "(999) 999-999-999"' data-mask required placeholder="Kontak">
              </div>
            </div>
            <div class="form-group" id="gambarCoverEdit">
              <div class="col-sm-3"></div>
              <div class="col-sm-9">
                <div class="attachment-block clearfix">
                  <div style="margin-left:5px;">Gambar Cover :</div>
                  <div id="divGambarCover"></div>
                </div>
              </div>            
            </div>            
            <div class="form-group">
              <label class="col-sm-3 control-label">Gambar Cover</label>
              <div class="col-sm-9">
                <input type="file" id="gambarCover" name="gambarCover" required accept="image/x-png,image/jpeg">
              </div>
            </div>
            <div class="form-group" id="gambarPriviewEdit">
              <div class="col-sm-3"></div>
              <div class="col-sm-9">
                <div class="attachment-block clearfix">
                  <div style="margin-left:5px;">Gambar Priview :</div>
                  <div id="divGambarPriview"></div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Gambar Priview</label>
              <div class="col-sm-9">
                <input type="file" id="gambarPriview" name="gambarPriview[]" required multiple="multiple" accept="image/x-png,image/jpeg">
                <div>
                  <!-- <i>Maximal 6 gambar.</i> -->
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Deskripsi</label>
              <div class="col-sm-9">
                <textarea id="deskripsi" name="deskripsi" required placeholder="Ketikkan deskripsi disini" style="width: 100%; height: 200px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
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

<div class="modal fade" id="formModalPriview" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Priview Data</h4>
      </div>
      <div class="modal-body row">
        <div class="col-sm-12">
          <div class="col-sm-6">
            <img class="img-responsive pad" id="imageCoverPriview" src="" alt="Gambar Cover">
            <div class="box-body">
              <span style="font-size:22px;"><b class="titlePriview"></b></span>
              <div id="deskripsiPriview"></div>              
            </div>
          </div>
          <div class="col-sm-6">
            <table width="100%">
              <tbody>
                <tr>
                  <th>Nama Destinasi</th>
                  <td class="titlePriview"></td>
                </tr>
                <tr>
                  <th>Alamat</th>
                   <td id="alamatPriview"></td>
                </tr>
                <tr>
                  <th>Daerah</th>
                  <td id="daerahPriview"></td>
                </tr>
                <tr>
                  <th>Kontak</th>
                  <td id="kontakPriview"></td>
                </tr>
                <tr>
                  <th>Jadwal</th>
                  <td id="jadwalPriview"></td>
                </tr>
                <tr>
                  <th>HTM</th>
                  <td id="hargaTiketTampilPriview"></td>
                </tr>
                <tr>
                  <th>Fasilitas</th>
                  <td id="fasilitasPriview"></td>
                </tr>
                <tr>
                  <th>Kategori</th>
                  <td id="kategoriPriview"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-sm-12">
          <div class="col-sm-12">
            <div class="box-body">
              <span style="font-size:22px;"><b>Gallery</b></span>              
            </div>
            <div class="col-sm-12">
              <div class="attachment-block clearfix" id="galeriPriview"></div>
            </div>
          </div>          
        </div>
      </div>
    </div>
  </div>
</div>