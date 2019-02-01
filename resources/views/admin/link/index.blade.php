@extends('admin.layout.index')

@section('title','Link Wisata')

@section('headerTitle','Link Wisata')

@section('subHeaderTitle','Link Wisata')

@section('stylesheet')
	<link rel="stylesheet" href="{{ asset('public/admin_template/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css') }}">	
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
          <h3 class="box-title">Tabel Link Wisata</h3>
          <div class="pull-right">
            <button type="button" class="btn btn-primary" id="addButton"><i class="fa fa-plus"></i> Tambah</button>
           </div>
        </div>
        <div class="box-body">
          <table id="table" class="table table-bordered table-striped">
            <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>              
              <th>Kota</th>
              <th>Kategori</th>              
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

    @include('admin.link.modal')
@stop

@section('javascript')	
	@include('admin.link.javascript')
@stop