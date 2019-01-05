<?php
namespace App\Services;

use Carbon\Carbon;
use App\Models\User;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class UserServices {
	public function getData() {
		$user = User::all();
		$no     = 1;

		if (count($user) > 0):
			foreach ($user as $u):
				$data[] = [
					'no'          => $no,
					'idUser'      => encrypt($u->idUser),
					'namaLengkap' => $u->namaLengkap,
					'username'    => $u->username,
					'foto'        => $u->foto
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
			try {
				$currentDate = Carbon::now()->toDateString();

				$foto = $request->file('foto');
	            if(isset($foto)):		            
		            $fotoName  = $currentDate.'-'.uniqid().'.'.$foto->getClientOriginalExtension();
		            if(!Storage::disk('public')->exists('user')):
		                Storage::disk('public')->makeDirectory('user');
		            endif;
		            $fotoImage = Image::make($foto)->save();
		            Storage::disk('public')->put('user/'.$fotoName,$fotoImage);
		        else:
		            $fotoName = "defaultImageUser.png";
		        endif;

		        $status = true;
			} catch (Exception $e) {
				echo($err);
           		$status = false;
			}

			if($status):
	            $save = User::create([
                    'namaLengkap' => $request->namaLengkap,
					'username'    => $request->username,
					'password'    => md5($request->password),
					'foto'        => $fotoName
                ]);
	            if($save):
	            	$status = true;
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
		try {			
			try {
				$currentDate = Carbon::now()->toDateString();

				$foto = $request->file('foto');
	            if(isset($foto)):	            	
		            $fotoName  = $currentDate.'-'.uniqid().'.'.$foto->getClientOriginalExtension();
		            if(!Storage::disk('public')->exists('user')):
		                Storage::disk('public')->makeDirectory('user');
		            endif;		            
		            $fotoImage = Image::make($foto)->save();
		            Storage::disk('public')->delete('user/'.$request->oldFoto);
		            Storage::disk('public')->put('user/'.$fotoName,$fotoImage);
		        else:
		            $fotoName = $request->oldFoto;
		        endif;

		        $status = true;
			} catch (Exception $e) {
				echo($err);
           		$status = false;
			}

			if($status):
				if(!is_null($request->password)):
					$update = [
	                    'namaLengkap' => $request->namaLengkap,
						'username'    => $request->username,
						'password'    => md5($request->password),
						'foto'        => $fotoName
                	];
                else:
                	$update = [
	                    'namaLengkap' => $request->namaLengkap,
						'username'    => $request->username,						
						'foto'        => $fotoName
                	];
				endif;
	            $save = User::where([
					'idUser' => decrypt($request->idUser)
                ])->update($update);
	            if($save):
	            	$status = true;
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
				Storage::disk('public')->delete('user/'.$request->oldImageDelete);		        
		        $status = true;
			} catch (Exception $e) {
				echo($err);
           		$status = false;
			}

			if($status):
	            $save = User::where([
					'idUser' => decrypt($request->idData)
                ])->delete();
	            if($save):
	            	$status = true;
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