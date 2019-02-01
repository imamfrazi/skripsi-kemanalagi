<?php
namespace App\Services;

use App\Models\Link;

class LinkServices {
	public function getData() {
		$link = Link::all();
		$no     = 1;

		if (count($link) > 0):
			foreach ($link as $l):
				$data[] = [
					'no'           => $no,
					'idLinkWisata' => encrypt($l->idLinkWisata),
					'judul'        => $l->judul,
					'link'         => $l->link,
					'daerah'       => $l->daerah,
					'kategori'     => $l->kategori,
				];

				$no++;
			endforeach;
		else:
			$data = [];
		endif;

		return $data;
	}
	public function store($request) {
		try {
            $save = Link::create([
                'judul'    => $request->judul,
                'link'     => $request->link,
                'daerah'   => $request->daerah,
                'kategori' => $request->kategori           
            ]);
            if($save):
                $status = true;
            else:
                $status = false;
            endif;	        
        } catch(\Exception $err) {
           echo($err);
           $status = false;
        }

		return $status;
	}
	public function update($request) {
		try {			
			$save = Link::where([
                'idLinkWisata' => decrypt($request->idLinkWisata)
            ])->update([
                'judul'    => $request->judul,
                'link'     => $request->link,
                'daerah'   => $request->daerah,
                'kategori' => $request->kategori              
            ]);
            if($save):
                $status = true;
            else:
                $status = false;
            endif;
        } catch(\Exception $err) {
           echo($err);
           $status = false;
        }

		return $status;
	}
	public function delete($request) {
		try {			
			$save = Link::where([
                'idLinkWisata' => decrypt($request->idData)
            ])->delete();
            if($save):
                $status = true;                
            else:
                $status = false;
            endif;
        } catch(\Exception $err) {
           echo($err);
           $status = false;
        }

		return $status;
	}
}