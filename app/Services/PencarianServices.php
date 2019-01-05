<?php
namespace App\Services;

use App\Models\Galeri;
use App\Models\Wisata;

class PencarianServices {
	public function getData($daerah, $kategori, $truncate_html) {
		$wisata = Wisata::where('daerah', $daerah)
            		->where('kategori', $kategori)
            		->get();

		if (count($wisata) > 0):
			foreach ($wisata as $w):
				$data[] = [
					'idWisata'         => encrypt($w->idWisata),
					'namaWisata'       => $w->namaWisata,					
					'gambarCover'      => $w->gambarCover,
					'deskripsi'        => $truncate_html->truncateHtml($w->deskripsi, 180)
				];
			endforeach;
		else:
			$data = [];
		endif;

		return $data;
	}
}