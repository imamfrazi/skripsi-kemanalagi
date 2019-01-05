@extends('admin.layout.index')

@section('title','User')

@section('headerTitle','User')

@section('subHeaderTitle','User')

@section('stylesheet')
	<link rel="stylesheet" href="{{ asset('public/admin_template/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css') }}">
	</style>
@stop

@section('content')
	<div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">Tabel User</h3>
          <div class="pull-right">
            <button type="button" class="btn btn-primary" id="addButton"><i class="fa fa-plus"></i> Tambah</button>
           </div>
        </div>
        <div class="box-body">
          <table id="table" class="table table-bordered table-striped">
            <thead>
            <tr>
              <th>No</th>
              <th>Nama Lengkap</th>
              <th>Username</th>
              <th>Foto</th>
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

    @include('admin.user.modal')
@stop

@section('javascript')	
	@include('admin.user.javascript')
@stop