<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Kemanalagi | Log in</title>
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <link rel="stylesheet" href="{{ asset('public/admin_template/bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
  <link rel="stylesheet" href="{{ asset('public/admin_template/bower_components/font-awesome/css/font-awesome.min.css') }}">
  <link rel="stylesheet" href="{{ asset('public/admin_template/bower_components/Ionicons/css/ionicons.min.css') }}">
  <link rel="stylesheet" href="{{ asset('public/admin_template/dist/css/AdminLTE.min.css') }}">
  <link rel="stylesheet" href="{{ asset('public/admin_template/plugins/iCheck/square/blue.css') }}">
  <link rel="stylesheet" href="{{ asset('public/css/sweetalert.css') }}">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <a href="#"><b>Kemanalagi</b></a>
  </div>
  <div class="login-box-body">
    <p class="login-box-msg">Silahkan login!</p>
    <form id="formInput">
      @csrf
      <div class="form-group has-feedback">
        <input type="text" class="form-control" id="username" name="username" placeholder="Username">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" id="password" name="password" placeholder="Password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">        
        <div class="col-xs-12">
          <button type="submit" class="btn btn-primary btn-block btn-flat" id="submitButton">Sign In</button>
        </div>
      </div>
    </form>
</div>

<script src="{{ asset('public/admin_template/bower_components/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('public/admin_template/bower_components/bootstrap/dist/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('public/admin_template/plugins/iCheck/icheck.min.js') }}"></script>
<script src="{{ asset('public/js/loadingoverlay.min.js') }}"></script>
<script src="{{ asset('public/js/sweetalert.min.js') }}"></script>
@include('admin.login.javascript')
</body>
</html>
