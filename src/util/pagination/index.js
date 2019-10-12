	//加载分页信息
	loadPagination: function(pageInfo){
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extends({},pageInfo, {
			container: $('.pagination'),
			onSelectPage: function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadList();
			
		}));
	}
	_this.loadPagination({
		hasPreviousPage : res.hasPreviousPage,
		prePage:res.prePage,
		hasNextPage: res.hasNextPage,
		nextPage: res.nextPage,
		pageNum: res.pageNum,
		pages: res.pages
	});
	}, function(errMsg){
	_mm.errorTips(errMsg);
		})