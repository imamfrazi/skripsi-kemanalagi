<?php
namespace App\Services;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Galeri;
use App\Models\Wisata;

class DashboardServices {
	public function getData() {
		$cities = Wisata::distinct('daerah')->get(['daerah'])->count();
		$tours  = Wisata::count();
		$users  = User::count();		
		
		$data[] = [
			'cities' => $cities,
			'tours'  => $tours,
			'users'  => $users
		];

		return $data;
	}
}