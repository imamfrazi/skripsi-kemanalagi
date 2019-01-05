<?php
namespace App\Services;

use App\Models\Wisata;

class HomeServices {
	public function getData() {
		$daerah    = Wisata::distinct('daerah')->orderby('daerah', 'asc')->get(['daerah']);
		$kategori  = Wisata::distinct('kategori')->orderby('kategori', 'asc')->get(['kategori']);

		if(count($daerah) > 0):
			foreach ($daerah as $d):
				$data['daerah'][] = ['daerah' => $d->daerah];
			endforeach;
		else:
			$data['daerah'] = [];
		endif;

		if(count($kategori) > 0):
			foreach ($kategori as $k):
				$data['kategori'][] = ['kategori' => $k->kategori];
			endforeach;
		else:
			$data['kategori'] = [];
		endif;

		return $data;
	}
}