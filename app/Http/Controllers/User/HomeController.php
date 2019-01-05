<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\HomeServices;

class HomeController extends Controller {
	public function __construct(HomeServices $homeServices) {
		$this->homeServices = $homeServices;
	}
	public function index() {
		$data = $this->homeServices->getData();
		return view('user.home.index', compact('data'));
	}
	public function getData() {
		$data = $this->homeServices->getData();
		echo json_encode($data);
	}
}