<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('login', 'Admin\LoginController@index')->name('admin.login.index');
Route::post('sigin', 'Admin\LoginController@sigin')->name('admin.login.sigin');

Route::group(['middleware' => 'authadmin'],function(){
	Route::get('logout', 'Admin\LoginController@logout')->name('admin.login.logout');

	Route::get('dashboard', 'Admin\DashboardController@index')->name('admin.dashboard.index');
	Route::get('getDashboard', 'Admin\DashboardController@getData')->name('admin.dashboard.get');

	Route::get('tour', 'Admin\TourController@index')->name('admin.tour.index');
	Route::get('getDataTour', 'Admin\TourController@getData')->name('admin.tour.get');
	Route::post('saveTour', 'Admin\TourController@store')->name('admin.tour.store');
	Route::post('updateTour', 'Admin\TourController@update')->name('admin.tour.update');
	Route::post('deleteTour', 'Admin\TourController@delete')->name('admin.tour.delete');

	Route::get('user', 'Admin\UserController@index')->name('admin.user.index');
	Route::get('getDataUser', 'Admin\UserController@getData')->name('admin.user.get');
	Route::post('saveUser', 'Admin\UserController@store')->name('admin.user.store');
	Route::post('updateUser', 'Admin\UserController@update')->name('admin.user.update');
	Route::post('deleteUser', 'Admin\UserController@delete')->name('admin.user.delete');
});

Route::get('/', 'User\HomeController@index')->name('user.home.index');
Route::get('getHome', 'User\HomeController@getData')->name('user.home.get');

Route::get('/pencarian', 'User\PencarianController@index')->name('user.pencarian.index');
Route::post('/getPencarian', 'User\PencarianController@get')->name('user.pencarian.get');

Route::get('/detail/{id}', 'User\DetailController@index')->name('user.detail.index');