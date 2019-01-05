<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Kemanalagi | @yield('title')</title>
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <link rel="stylesheet" href="{{ asset('public/admin_template/bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
  <link rel="stylesheet" href="{{ asset('public/admin_template/bower_components/font-awesome/css/font-awesome.min.css') }}">
  <link rel="stylesheet" href="{{ asset('public/admin_template/bower_components/Ionicons/css/ionicons.min.css') }}">
  <link rel="stylesheet" href="{{ asset('public/admin_template/dist/css/AdminLTE.min.css') }}">
  <link rel="stylesheet" href="{{ asset('public/admin_template/dist/css/skins/_all-skins.min.css') }}">
  <link rel="stylesheet" href="{{ asset('public/css/sweetalert.css') }}">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
  @yield('stylesheet')
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

  <header class="main-header">
    <a href="index2.html" class="logo">
      <span class="logo-mini"><b>KL</b></span>
      <span class="logo-lg"><b>KEMANALAGI</b></span>
    </a>
    <nav class="navbar navbar-static-top">
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">              
              <span class="hidden-xs">{{session('namaLengkap')}}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="user-header">
                <img src="{{ asset('storage/app/public/user').'/'.session('foto') }}" class="img-circle" alt="User Image" style="min-height:50px; min-width:50px;">
                <p>
                  {{session('namaLengkap')}}
                </p>
              </li>
              <li class="user-footer">
                <div>
                  <a href="{{ route('admin.login.logout') }}" class="btn btn-danger btn-flat btn-block">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <aside class="main-sidebar">
    <section class="sidebar">
      <div class="user-panel">
        <div class="pull-left image">
          <img src="{{ asset('storage/app/public/user').'/'.session('foto') }}" class="img-circle" alt="User Image" style="min-height:50px; min-width:50px;">
        </div>
        <div class="pull-left info">
          <p>{{session('namaLengkap')}}</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">MAIN NAVIGATION</li>
        <li id="menuDashboard"><a href="{{ route('admin.dashboard.index') }}"><i class="fa fa-dashboard"></i> <span>Dashboard</span></a></li>
        <li id="menuTours"><a href="{{ route('admin.tour.index') }}"><i class="fa fa-area-chart"></i> <span>Wisata</span></a></li>
        <li id="menuUsers"><a href="{{ route('admin.user.index') }}"><i class="fa fa-book"></i> <span>Users</span></a></li>
      </ul>
    </section>
  </aside>

  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        @yield('headerTitle')        
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">@yield('subHeaderTitle')</li>
      </ol>
    </section>
    
    <section class="content" id="vueApp">
      <div class="row">
        @yield('content')
        @include('admin.layout.modal')
      </div>
    </section>    
  </div>
  
  <footer class="main-footer">
    <strong>Copyright &copy; 2019 <a href="#">Imam Studio</a>.</strong> All rights
    reserved.
  </footer>

  <div class="control-sidebar-bg"></div>
</div>

<script src="{{ asset('public/admin_template/bower_components/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('public/admin_template/bower_components/jquery-ui/jquery-ui.min.js') }}"></script>
<script src="{{ asset('public/admin_template/bower_components/bootstrap/dist/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('public/admin_template/dist/js/adminlte.min.js') }}"></script>
<script src="{{ asset('public/admin_template/dist/js/demo.js') }}"></script>
<script src="{{ asset('public/js/bootstrap-filestyle.min.js') }}"></script>
<script src="{{ asset('public/js/loadingoverlay.min.js') }}"></script>
<script src="{{ asset('public/js/sweetalert.min.js') }}"></script>
<script>
  $('#formModalDelete').on('hide.bs.modal', function () {
      $('#formInputDelete').trigger('reset')
  })
</script>
@yield('javascript')
</body>
</html>