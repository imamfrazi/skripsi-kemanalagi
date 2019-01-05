<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\PencarianServices;
use Illuminate\Http\Request;
use App\Services\TruncateTextWithHtml;

class PencarianController extends Controller {
	public function __construct(PencarianServices $pencarianServices, TruncateTextWithHtml $truncate_html) {
		$this->pencarianServices = $pencarianServices;
		$this->truncate_html = $truncate_html;
	}
	public function index() {
		if (!is_null(session('daerahSession'))):
			$daerah   = session('daerahSession');
			$kategori = session('kategoriSession');
			$data = $this->pencarianServices->getData($daerah, $kategori, $this->truncate_html);

			return view('user.pencarian.index', compact('data'));
		else:
			return redirect('/');
		endif;
	}
	public function get(Request $request) {
		$request->session()->put('daerahSession', $request->daerah);
		$request->session()->put('kategoriSession', $request->kategori);
		return redirect('/pencarian');
	}
}