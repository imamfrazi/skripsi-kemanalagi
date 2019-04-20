<?php
namespace App\Services;

use Carbon\Carbon;
use App\Models\Galeri;
use App\Models\Wisata;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class TourServices {
	public function getData() {
		$wisata = Wisata::all();
		$no     = 1;

		if (count($wisata) > 0):
			foreach ($wisata as $w):
				$data[] = [
					'no'               => $no,
					'idWisata'         => encrypt($w->idWisata),
					'namaWisata'       => $w->namaWisata,
					'alamat'           => $w->alamat,
					'daerah'           => $w->daerah,
					'kategori'         => $w->kategori,
					'hargaTiket'       => $w->hargaTiket,
					'hargaTiketTampil' => 'Rp. '.number_format($w->hargaTiket),
					'jadwal'           => !is_null($w->jadwal) ? $w->jadwal : '-',
					'fasilitas'        => !is_null($w->fasilitas) ? $w->fasilitas : '-',
					'kontak'           => $w->kontak,
					'gambarCover'      => $w->gambarCover,
					'deskripsi'        => $w->deskripsi,
					'galeri'           => $w->getGaleri()
				];

				$no++;
			endforeach;
		else:
			$data = [];
		endif;

		return $data;
	}
	public function store($request) {
		ini_set('memory_limit', '1024M');
		try {			
			try {
				$currentDate = Carbon::now()->toDateString();

				$imageCover = $request->file('gambarCover');
	            if(isset($imageCover)):		            
		            $imageCoverName  = $currentDate.'-'.uniqid().'.'.$imageCover->getClientOriginalExtension();
		            if(!Storage::disk('public')->exists('tour/imageCover')):
		                Storage::disk('public')->makeDirectory('tour/imageCover');
		            endif;
		            $imageCoverImage = Image::make($imageCover)->save();
		            Storage::disk('public')->put('tour/imageCover/'.$imageCoverName,$imageCoverImage);
		        else:
		            $imageCoverName = "defaultImageCover.png";
		        endif;

		        $status = true;
			} catch (Exception $e) {
				echo($err);
           		$status = false;
			}

			if($status):
	            $save = Wisata::create([
                    'namaWisata'  => $request->namaWisata,
					'alamat'      => $request->alamat,
					'daerah'      => $request->daerah,
					'kategori'    => $request->kategori,
					'hargaTiket'  => floatval(preg_replace("/[^0-9]/", "", $request->hargaTiket)),
					'jadwal'      => $request->jadwal,
					'fasilitas'   => $request->fasilitas,
					'kontak'      => $request->kontak,
					'gambarCover' => $imageCoverName,
					'deskripsi'   => $request->deskripsi             
                ]);
	            if($save):
	            	try {
	            		$files = $request->file('gambarPriview');
						$no = 0;

						if($request->hasFile('gambarPriview')):
						    foreach ($files as $file):
						     	if($no <= 6):
									$imagePriview = $file;
						            if(isset($imagePriview)):		            
							            $imagePriviewName  = $currentDate.'-'.uniqid().'.'.$imagePriview->getClientOriginalExtension();
							            if(!Storage::disk('public')->exists('tour/imagePriview')):
							                Storage::disk('public')->makeDirectory('tour/imagePriview');
							            endif;
							            $imagePriviewImage = Image::make($imagePriview)->save();
							            Storage::disk('public')->put('tour/imagePriview/'.$imagePriviewName,$imagePriviewImage);
							        else:
							            $imagePriviewName = "defaultImagePriview.png";
							        endif;
							        
						            $saveWisata = Galeri::create([
						            	'idWisata'   => $save->id,
					                    'namaGambar' => $imagePriviewName
					                ]);
						            if($saveWisata):
						            	$status = true;
						            else:
						            	$status = false;
						            endif;							        
						     	endif;
						     	$no++;
						    endforeach;
						endif;						
					} catch (Exception $e) {
						echo($err);
		           		$status = false;
					}					
	            else:
	                $status = false;
	            endif;
	        endif;
        } catch(\Exception $err) {
           echo($err);
           $status = false;
        }

		return $status;
	}
	public function update($request) {
		ini_set('memory_limit', '1024M');
		try {			
			try {
				$currentDate = Carbon::now()->toDateString();

				$imageCover = $request->file('gambarCover');
	            if(isset($imageCover)):	            	
		            $imageCoverName  = $currentDate.'-'.uniqid().'.'.$imageCover->getClientOriginalExtension();
		            if(!Storage::disk('public')->exists('tour/imageCover')):
		                Storage::disk('public')->makeDirectory('tour/imageCover');
		            endif;		            
		            $imageCoverImage = Image::make($imageCover)->save();
		            Storage::disk('public')->delete('tour/imageCover/'.$request->oldImageCover);
		            Storage::disk('public')->put('tour/imageCover/'.$imageCoverName,$imageCoverImage);
		        else:
		            $imageCoverName = $request->oldImageCover;
		        endif;

		        $status = true;
			} catch (Exception $e) {
				echo($err);
           		$status = false;
			}

			if($status):
	            $save = Wisata::where([
					'idWisata' => decrypt($request->idWisata)
                ])->update([
                    'namaWisata'  => $request->namaWisata,
					'alamat'      => $request->alamat,
					'daerah'      => $request->daerah,
					'kategori'    => $request->kategori,
					'hargaTiket'  => floatval(preg_replace("/[^0-9]/", "", $request->hargaTiket)),
					'jadwal'      => $request->jadwal,
					'fasilitas'   => $request->fasilitas,
					'kontak'      => $request->kontak,
					'gambarCover' => $imageCoverName,
					'deskripsi'   => $request->deskripsi             
                ]);
	            if($save):
	            	try {
	            		$files = $request->file('gambarPriview');
						$no = 0;

						if($request->hasFile('gambarPriview')):
							$galeri = Galeri::where('idWisata', decrypt($request->idWisata))->get();
							foreach ($galeri as $g):
								Storage::disk('public')->delete('tour/imagePriview/'.$g['namaGambar']);
							endforeach;
							$galeri = Galeri::where('idWisata', decrypt($request->idWisata))->delete();
						    foreach ($files as $file):
						     	if($no <= 6):
									$imagePriview = $file;
						            if(isset($imagePriview)):		            
							            $imagePriviewName  = $currentDate.'-'.uniqid().'.'.$imagePriview->getClientOriginalExtension();
							            if(!Storage::disk('public')->exists('tour/imagePriview')):
							                Storage::disk('public')->makeDirectory('tour/imagePriview');
							            endif;
							            $imagePriviewImage = Image::make($imagePriview)->save();
							            Storage::disk('public')->put('tour/imagePriview/'.$imagePriviewName,$imagePriviewImage);
							        else:
							            $imagePriviewName = "defaultImagePriview.png";
							        endif;
							        
						            $saveWisata = Galeri::create([
						            	'idWisata'   => decrypt($request->idWisata),
					                    'namaGambar' => $imagePriviewName
					                ]);
						            if($saveWisata):
						            	$status = true;
						            else:
						            	$status = false;
						            endif;
						     	endif;
						     	$no++;
						    endforeach;
						endif;						
					} catch (Exception $e) {
						echo($err);
		           		$status = false;
					}					
	            else:
	                $status = false;
	            endif;
	        endif;
        } catch(\Exception $err) {
           echo($err);
           $status = false;
        }

		return $status;
	}
	public function delete($request) {
		try {			
			try {
				Storage::disk('public')->delete('tour/imageCover/'.$request->oldImageDelete);
		        $status = true;
			} catch (Exception $e) {
				echo($err);
           		$status = false;
			}

			if($status):
	            $save = Wisata::where([
					'idWisata' => decrypt($request->idData)
                ])->delete();
	            if($save):
	            	try {
	            		$galeri = Galeri::where('idWisata', decrypt($request->idData))->get();
						foreach ($galeri as $g):
							Storage::disk('public')->delete('tour/imagePriview/'.$g['namaGambar']);
						endforeach;
						$galeri = Galeri::where('idWisata', decrypt($request->idData))->delete();
						$status = true;
					} catch (Exception $e) {
						echo($err);
		           		$status = false;
					}					
	            else:
	                $status = false;
	            endif;
	        endif;
        } catch(\Exception $err) {
           echo($err);
           $status = false;
        }

		return $status;
	}
}