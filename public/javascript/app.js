angular.module('Duel', ['ngResource'])
	.config(function($routeProvider) {
		
		$routeProvider.
			when('/', 
					{
						templateUrl: 'partials/index.html',
						controller: IndexCtrl
					}).
			when('/profile',
					{
						templateUrl: 'partials/profile.html',
						controller: ProfileCtrl,
					}).
			when('/home',
					{
						templateUrl: 'partials/home.html',
						controller: HomeCtrl
					}).
			when('/problem', 
					{
						templateUrl: 'partials/problem.html',
						controller: ProblemCtrl
					}).
			when('/problem/new',
					{
						templateUrl: 'partials/new.html',
						controller: NewProbCtrl
					}).
			otherwise({redirectTo: '#/home'});
	});