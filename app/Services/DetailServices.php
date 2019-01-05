<?php
namespace App\Services;

use App\Models\Galeri;
use App\Models\Wisata;

class DetailServices {
	public function getData($id) {
		$wisata = Wisata::where('idWisata', decrypt($id))->first();

		if (!is_null($wisata)):
			$data = [
				'idWisata'         => encrypt($wisata->idWisata),
				'namaWisata'       => $wisata->namaWisata,
				'alamat'           => $wisata->alamat,
				'daerah'           => $wisata->daerah,
				'kategori'         => $wisata->kategori,
				'hargaTiket'       => $wisata->hargaTiket,
				'hargaTiketTampil' => 'Rp. '.number_format($wisata->hargaTiket),
				'jadwal'           => !is_null($wisata->jadwal) ? $wisata->jadwal : '-',
				'fasilitas'        => !is_null($wisata->fasilitas) ? $wisata->fasilitas : '-',
				'kontak'           => $wisata->kontak,
				'gambarCover'      => $wisata->gambarCover,
				'deskripsi'        => $wisata->deskripsi,
				'galeri'           => $wisata->getGaleri()
			];
		else:
			$data = [];
		endif;

		return $data;
	}
}