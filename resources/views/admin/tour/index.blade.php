@extends('admin.layout.index')

@section('title','Wisata')

@section('headerTitle','Wisata')

@section('subHeaderTitle','Wisata')

@section('stylesheet')
	<link rel="stylesheet" href="{{ asset('public/admin_template/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('public/admin_template/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css') }}">
	<style>
		th {
			padding: 10px;
		}
		tr {
			border-bottom: 1px solid rgba(0, 0, 0, 0.12);
		}
	</style>
@stop

@section('content')
	<div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">Tabel Wisata</h3>
          <div class="pull-right">
            <button type="button" class="btn btn-primary" id="addButton"><i class="fa fa-plus"></i> Tambah</button>
           </div>
        </div>
        <div class="box-body">
          <table id="table" class="table table-bordered table-striped">
            <thead>
            <tr>
              <th>No</th>
              <th>Nama Wisata</th>
              <th>Alamat</th>
              <th>Kota</th>
              <th>Kategori</th>
              <th>Kontak</th>
              <th><center>Aksi</center></th>
            </tr>
            </thead>
            <tbody>
            	<!-- data -->
            </tbody>            
          </table>
        </div>
      </div>
    </div>

    @include('admin.tour.modal')
@stop

@section('javascript')	
	@include('admin.tour.javascript')
@stop