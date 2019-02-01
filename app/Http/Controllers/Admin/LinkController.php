<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\LinkServices;
use Illuminate\Http\Request;

class LinkController extends Controller {
	public function __construct(LinkServices $linkServices) {
		$this->linkServices = $linkServices;
	}
	public function index() {
		return view('admin.link.index');
	}
	public function getData() {
		$data = $this->linkServices->getData();
		echo json_encode($data);
	}
	public function store(Request $request) {
		$data = $this->linkServices->store($request);

		echo json_encode($data);
	}
	public function update(Request $request) {
		$data = $this->linkServices->update($request);

		echo json_encode($data);
	}
	public function delete(Request $request) {
		$data = $this->linkServices->delete($request);

		echo json_encode($data);
	}
}