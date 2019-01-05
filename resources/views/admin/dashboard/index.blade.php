@extends('admin.layout.index')

@section('title','Dashboard')

@section('headerTitle','Dashboard')

@section('subHeaderTitle','Dashboard')

@section('content')
	<div class="col-lg-4 col-xs-12">
	  <div class="small-box bg-aqua">
	    <div class="inner">
	      <h3 id="cities">0</h3>
	      <p>Cities</p>
	    </div>
	    <div class="icon">
	      <i class="fa fa-home"></i>
	    </div>	    
	  </div>
	</div>
	<div class="col-lg-4 col-xs-12">          
	  <div class="small-box bg-green">
	    <div class="inner">
	      <h3 id="tours">0</h3>
	      <p>Tours</p>
	    </div>
	    <div class="icon">
	      <i class="fa fa-area-chart"></i>
	    </div>	    
	  </div>
	</div>	
	<div class="col-lg-4 col-xs-12">
	  <div class="small-box bg-red">
	    <div class="inner">
	      <h3 id="users">0</h3>
	      <p>Users</p>
	    </div>
	    <div class="icon">
	      <i class="ion ion-person-add"></i>
	    </div>	    
	  </div>
	</div>	
@stop

@section('javascript')	
	@include('admin.dashboard.javascript')
@stop