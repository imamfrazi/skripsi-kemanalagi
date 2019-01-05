<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta charset="utf-8">
  <title>Kemanalagi | Cara Mudah Untuk Temukan Destinasi Wisata Anda!</title>
  <meta name="description" content="Solutrans merupakan Software as a Service untuk Perusahaan Otobus yang menawarkan Sistem Manajemen
  Penjualan Tiket, Laporan, dan Promosi Digital">
  <meta name="author" content="Friendstech">
  <meta name="keywords" content="solutrans, tiket, tiket bus online, bus, perusahaan otobus, software as a service, sulawesi selatan, transportasi">
  <meta name="language" content="id">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <link rel="stylesheet" href="{{ asset('public/user_template/css/materialize.min.css') }}" media="screen,projection"/>
  <link rel="stylesheet" href="{{ asset('public/user_template/css/style.css') }}">
  <link rel="stylesheet" href="{{ asset('public/user_template/css/materialdesignicons.min.css') }}" media="all">
  <meta name="theme-color" content="#f5f5f5">
  @yield('stylesheet')
</head>
<body id="root">
<main>
  <div class="container">
    <nav class="transparent z-depth-0">
      <div class="nav-wrapper">
    	<a href="{{ route('user.home.index') }}" class="brand-logo"><img src="{{ asset('public/user_template/img/logo/kemanalagi.png') }}" alt="brand-logo" style="width: 150px"></a>
    	<a href="#" data-target="mobile-demo" class="sidenav-trigger root-font-color" style="margin: 0"><i class="mdi mdi-menu"></i></a>
    	<ul class="right hide-on-med-and-down">
    	</ul>
      </div>
    </nav>
  </div>
  @yield('section')
</main>
  <footer class="page-footer hide-on-med-and-down root-color root-font-color no-padding">
    <div class="container">
      <hr>
      <div class="row">
        <div class="col s12 m6 l6">
          <h6 class="bold">Kemanalagi</h6>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div style="padding-left: 300px;" class="col s12 m6 l6">
          <h6 class="bold">Hubungi Kami</h6>
          <h5 style="margin: 11px 0 0; font-size: 20px">082291310757</h5>
          <div>
            <a href="#!"><i class="root-font-color mdi mdi-email mdi-36px"></i></a>
            <a href="#!"><i class="root-font-color mdi mdi-facebook-box mdi-36px"></i></a>
            <a href="#!"><i class="root-font-color mdi mdi-twitter-box mdi-36px"></i></a>
            <a href="#!"><i class="root-font-color mdi mdi-instagram mdi-36px"></i></a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-copyright root-color">
      <div class="container">
        <div class="row no-margin">
          <div class="col s12 center">
            <span class="root-font-color">© 2018 Copyright </span><a href="#!" class="root-font-color">Kemanalagi.id</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-118970182-1"></script>
  <script src="{{ asset('public/user_template/js/jquery.min.js') }}"></script>
  <script src="{{ asset('public/user_template/js/jquery-2.1.1.min.js') }}"></script>
  <script src="{{ asset('public/user_template/js/materialize.min.js') }}"></script>
  @yield('javascript')
</body>
</html>
