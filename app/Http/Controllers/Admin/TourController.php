<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\TourServices;
use Illuminate\Http\Request;

class TourController extends Controller {
	public function __construct(TourServices $tourServices) {
		$this->tourServices = $tourServices;
	}
	public function index() {
		return view('admin.tour.index');
	}
	public function getData() {
		$data = $this->tourServices->getData();
		echo json_encode($data);
	}
	public function store(Request $request) {
		$data = $this->tourServices->store($request);

		echo json_encode($data);
	}
	public function update(Request $request) {
		$data = $this->tourServices->update($request);

		echo json_encode($data);
	}
	public function delete(Request $request) {
		$data = $this->tourServices->delete($request);

		echo json_encode($data);
	}
}