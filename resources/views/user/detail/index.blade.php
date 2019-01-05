@extends('user.layout.index')

@section('section')
<div id="cek-pemesanan" class="dropdown-content center" style="padding: 10px 25px">
  <form action="" method="post">
		<input placeholder="Masukkan Kode Booking" name="code_booking" id="code_booking" class="center" required>
		<button type="submit" name="button" class="waves-effect waves-light blue darken-1 btn">OK</button>
  </form>
</div>

<div class="card-panel teal accent-4 center no-margin root-font-color2 hide-on-med-and-down" style="padding: 20px 0; margin-top:20px;">
  <div class="container">
    <div class="row no-margin">
      <div class="col s4 m4 l4">
        <p class="root-font-size no-margin">Kategori :</p>
        <h5 class="root-font-color2 no-margin">{{ session('kategoriSession') }}</h5>
      </div>
      <div class="col s4 m4 l4">
        <p class="root-font-size no-margin">Daerah :</p>
        <h5 class="root-font-color2 no-margin">{{ session('daerahSession') }}</h5>
      </div>
    </div>
  </div>
</div>

<div class="container">
  <div class="col m12">
    <div class="row" style="padding-top:50px;">
      <div class="col m6">
         <img class="responsive-img" src="{{ asset('storage/app/public/tour/imageCover').'/'.$data['gambarCover'] }}">
         <h5 class="bold">{{ $data['namaWisata'] }}</h5>
         <p>{!! $data['deskripsi'] !!}</p>
      </div>
      <div class="col m6">
        <table>
             <tr>
                <th>Nama Destinasi</th>
                <td>{{ $data['namaWisata'] }}</td>
             </tr>
             <tr>
               <th>Alamat</th>
               <td>{{ $data['alamat'] }}</td>
             </tr>
             <tr>
               <th>Daerah</th>
               <td>{{ $data['daerah'] }}</td>
             </tr>
             <tr>
               <th>Kontak</th>
               <td>{{ $data['kontak'] }}</td>
             </tr>
             <tr>
               <th>Jadwal</th>
               <td>{{ $data['jadwal'] }}</td>
             </tr>
             <tr>
               <th>HTM</th>
               <td>{{ $data['hargaTiketTampil'] }}</td>
             </tr>
             <tr>
               <th>Fasilitas</th>
               <td>{{ $data['fasilitas'] }}</td>
             </tr>
             <tr>
               <th>Kategori</th>
               <td>{{ $data['kategori'] }}</td>
             </tr>
         </table>
      </div>
    </div>
  </div>

  <div class="col m12">
    <div class="row">
      <h5 style="padding-bottom:20px;" class="bold">Gallery</h5>
        @if(!empty($data['galeri']))
          @foreach($data['galeri'] as $galeri)
            <div class="col m4">
              <img class="responsive-img" src="{{ asset('storage/app/public/tour/imagePriview').'/'.$galeri['namaGambar'] }}">
            </div>
          @endforeach
        @else
          <center><i>Tidak ada data tersedia.</i></center>
        @endif        
    </div>
  </div>
</div>
@stop