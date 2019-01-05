<?php
namespace App\Services;

use App\Models\User;

class LoginServices {
	public function sigin($request) {
		$data = $request->input();    
        $auth = User::select('*')
        	->where('username',$data['username'])
            ->where('password',md5($data['password']))
            ->first();
        
        if($auth != NULL):
            $request->session()->put('authlogin', 1);
            $request->session()->put('idUser', $auth->idUser);
            $request->session()->put('namaLengkap', $auth->namaLengkap);
            $request->session()->put('foto', $auth->foto);
            $status = true;
        else:
        	$status = false;
        endif;

        return $status;
	}
}