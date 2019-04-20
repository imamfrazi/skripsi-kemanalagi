@extends('user.layout.index')

@section('section')
<div class="container">	
    <div class="row mobile-view hide-on-med-and-up">
      <h2 class="no-margin bold" style="color:#00bfa5;">Kemanalagi</h2>
      <h5 class="root-font-color no-margin">Cara Mudah Untuk Temukan Destinasi Wisata Anda!</h5>
      <form id="form_keberangkatan" action="{{ route('user.pencarian.get') }}" method="post" style="margin-top: 25px" >
      	@csrf
        <div class="input-field no-margin">
          <div class="valign-wrapper">
            <i class="mdi mdi-24px mdi-map"></i>
            <label for="">&nbsp; Pilih Kategori</label>
          </div>
          <select required name="kategori" id="selectKategori">
          	<option value="" selected disabled>Pilih Kategori</option>
          	@foreach($data['kategori'] as $kategori)
				<option value="{{ $kategori['kategori'] }}">{{ $kategori['kategori'] }}</option>
          	@endforeach
          </select>
        </div>
        <hr class="no-margin">
        <div class="input-field" style="margin-bottom: 0">
          <div class="valign-wrapper">
            <i class="mdi mdi-24px mdi-map-marker"></i>
            <label for="">&nbsp;Pilih Daerah</label>
          </div>
          <select required name="daerah" id="selectDaerah">
          	<option value="" selected disabled>Pilih Daerah</option>
          	@foreach($data['daerah'] as $daerah)
				<option value="{{ $daerah['daerah'] }}">{{ $daerah['daerah'] }}</option>
          	@endforeach
          </select>
        </div>
        <hr class="no-margin">
        <button class="waves-effect waves-light btn col s12" style="background-color:#00bfa5;" type="submit" name=""><strong>CARI</strong></button>
      </form>
    </div>
    <div class="row hero hide-on-med-and-down">
      <h1 class="tagline"><span style="color: #00bfa5" class="text-darken-1 bold">Kemanalagi</span><br>Cara Mudah Untuk Temukan<br>Destinasi Wisata Anda!</h1>
      <div class="col s12 m12 l12" id="searchBox">
        <form id="form_keberangkatan" action="{{ route('user.pencarian.get') }}" method="post" >
          @csrf
          <div class="row z-depth-3 no-margin root-color">
            <div class="col s12 m4 l4">
              <div class="row no-margin">
                <div class="input-field col s12 no-margin valign-wrapper">
                  <i class="mdi mdi-36px mdi-map" style="padding-right: 35px"></i>
                  <select required name="kategori" id="selectKategori">
                  	<option value="" selected disabled>Pilih Kategori</option>
                  	@foreach($data['kategori'] as $kategori)
						<option value="{{ $kategori['kategori'] }}">{{ $kategori['kategori'] }}</option>
                  	@endforeach
                  </select>
                </div>
              </div>
            </div>
            <div class="col s12 m1 l1">
              <div class="row no-margin">
                <div class="input-field col s12 no-margin center">
                  <i class="mdi mdi-36px mdi-map-marker"></i>
                </div>
              </div>
            </div>
            <div class="col s12 m4 l4">
              <div class="row no-margin">
                <div class="input-field col s12 no-margin valign-wrapper" style="margin-top: 5px">
                  <select required name="daerah" id="selectDaerah">
                  	<option value="" selected disabled>Pilih Daerah</option>
                  	@foreach($data['daerah'] as $daerah)
						<option value="{{ $daerah['daerah'] }}">{{ $daerah['daerah'] }}</option>
                  	@endforeach
                  </select>
                </div>
              </div>
            </div>
            <div class="col s12 m3 l3">
              <div class="row no-margin" style="margin-right:-25px;">
                <div class="input-field col s12 no-margin">
                  <button type="submit" class="waves-effect waves-light btn-large col s12 bold" style="color: #00bfa5; border-radius: 0 !important" id="cari_keberangkatan"><strong style="color:white;">Cari</strong></button>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
    <div class="row no-margin hide-on-med-and-down">
      <h5 style="padding-bottom:30px;" class="bold">Cara Menggunakan</h5>
        <div class="col s12 m4 l4">
          <img src="{{ asset('public/user_template/img/howto/select.png') }}" height="220px" alt="cara-pesan" style="padding-left:50px; padding-bottom:15px;">
          <p class="root-font-size center no-margin">Pilih kategori wisata yang anda inginkan dan daerah yg anda ingin tuju.</p>
        </div>
        <div class="col s12 m4 l4">
          <img src="{{ asset('public/user_template/img/howto/route.png') }}" height="220px" alt="cara-pesan" style="padding-left:50px; padding-bottom:15px;">
          <p class="root-font-size center no-margin">Pada tahap ini akan munch beberapa list destinasi wisata sesuai pilihan anda.</p>
        </div>
        <div class="col s12 m4 l4">
          <img src="{{ asset('public/user_template/img/howto/search.png') }}" height="220px" alt="cara-pesan" style="padding-left:50px; padding-bottom:15px;">
          <p class="root-font-size center no-margin">Pilih detail untuk melihat rincian destinasi wisata yang ingin anda lihat.</p>
        </div>
    </div>
    <div class="row no-margin hide-on-med-and-down"></div>
</div>
@stop

@section('javascript')
	@include('user.home.javascript')
@stop