<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\DetailServices;

class DetailController extends Controller {
	public function __construct(DetailServices $detailServices) {
		$this->detailServices = $detailServices;
	}
	public function index($id) {
		$data = $this->detailServices->getData($id);
		// dd($data['galeri']);
		// die();

		return view('user.detail.index', compact('data'));
	}
}