<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\DashboardServices;

class DashboardController extends Controller {
	public function __construct(DashboardServices $dashboardServices) {
		$this->dashboardServices = $dashboardServices;
	}
	public function index() {		
		return view('admin.dashboard.index');
	}
	public function getData() {
		$data = $this->dashboardServices->getData();
		echo json_encode($data);
	}
}

