<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\LoginServices;
use Illuminate\Http\Request;

class LoginController extends Controller {
	public function __construct(LoginServices $loginServices) {
		$this->loginServices = $loginServices;
	}
	public function index() {
		return view('admin.login.index');
	}
	public function sigin(Request $request) {
		$data = $this->loginServices->sigin($request);
		echo json_encode($data);
	}
	public function logout(Request $request) {
		$request->session()->flush();
		return redirect('login');
	}
}

