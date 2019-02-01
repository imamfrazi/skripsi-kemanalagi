<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Link extends Model {
	protected $table    = "linkWisata";
	protected $primary  = "idLinkWisata";
	protected $fillable = [
        "judul",
		"link",
		"daerah",
		"kategori"
    ];
}
