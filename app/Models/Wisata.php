<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wisata extends Model {
	protected $table    = "wisata";
	protected $primary  = "idWisata";
	protected $fillable = [
        "namaWisata",
		"alamat",
		"daerah",
		"kategori",
		"hargaTiket",
		"jadwal",
		"fasilitas",
		"kontak",
		"gambarCover",
		"deskripsi"
    ];

	public function getGaleri()
	{
		$cek = Galeri::select("*")->where("idWisata", $this->idWisata)->get();
		if($cek!=NULL):
			return $cek;
		else:
			return json_decode(json_encode(
				[				
					"idWisata"   => "",
					"namaGambar" => "",
				]			
			));
		endif;
	}	

}
