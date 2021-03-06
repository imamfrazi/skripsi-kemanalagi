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
            @if(!empty($data['data']))
            @foreach($data['data'] as $d)
            <div class="col m4">
                <div class="card">
                    <div class="card-image">
                        <img src="{{ asset('storage/app/public/tour/imageCover').'/'.$d['gambarCover'] }}">
                        <span class="card-title">{{ $d['namaWisata'] }}</span>
                    </div>
                    <div class="card-content">
                        <p>{!! $d['deskripsi'] !!}</p>
                    </div>
                    <div class="card-action">
                        <a href="{{ url('/detail').'/'.$d['idWisata'] }}">Detail</a>
                    </div>
                </div>
            </div>
            @endforeach
            @else
            <center><i>Tidak ada data ditemukan.</i></center>
            @endif
        </div>
    </div>
    <br>
    <div class="col m12">
        <div class="row">
            <h5 style="padding-bottom:20px;" class="center bold">Referensi Terkait</h5>
            <table class="responsive">
                @if(!empty($data['link']))
                @foreach($data['link'] as $d)
                <thead>
                    <tr>
                        <th>{{ $d['judul'] }}</th>
                    </tr>
                    <thead>
                    <tbody>
                        <tr>
                            <td><a href="{{ $d['link'] }}" target="_blank">{{ $d['link'] }}</a></td>
                            <td><img src="{{ asset('public/user_template/img/exa.jpg') }}" height="50" width="50"></td>
                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio magni fugiat praesentium voluptates natus eos odio aut neque, esse, modi sit asperiores officiis commodi unde quasi eius illo omnis qui!</td>
                        </tr>
                    </tbody>
                    @endforeach
                    @else
                    <center><i>Tidak ada link terkait ditemukan.</i></center>
                    @endif
            </table>
        </div>
    </div>
</div>
@stop 