define(['angular', 'filters/word-mapper', 'angular-mocks'],
	function(angular, myFilter) {
		var $filter;
		describe('myFilter', function() {
			beforeEach(module('smc'));
			beforeEach(inject(function(_$filter_) {
				$filter = _$filter_;
			}));
			it('sdsd', function() {
				var ww = $filter('wordMapper');
				expect(ww('danger')).toEqual('error');
			});
		});
	}
);