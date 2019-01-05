<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Galeri extends Model {
	protected $table    = "galeri";
	protected $primary  = "idGaleri";
	protected $fillable = [
		"idWisata",
		"namaGambar"		
	];
}
