<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\UserServices;
use Illuminate\Http\Request;

class UserController extends Controller {
	public function __construct(UserServices $userServices) {
		$this->userServices = $userServices;
	}
	public function index() {
		return view('admin.user.index');
	}
	public function getData() {
		$data = $this->userServices->getData();
		echo json_encode($data);
	}
	public function store(Request $request) {
		$data = $this->userServices->store($request);

		echo json_encode($data);
	}
	public function update(Request $request) {
		$data = $this->userServices->update($request);

		echo json_encode($data);
	}
	public function delete(Request $request) {
		$data = $this->userServices->delete($request);

		echo json_encode($data);
	}
}