

Init();

function Init() {

	getMyTeamInfo();

	$('.comfirmBtn').on('click', function() {
		var teamName = $('#teamName').val();
		var province = $('#province_selector').val();
		var city = $('#city_selector').val();
		var district = $('#district_selector').val();
		var teamState = $('#teamState').val();
		var teamTarget = $('#teamTarget').val();

		console.log(teamName)
		if(!teamName) {
			globalMes('请输入队伍名')
		} else if(!province) {
			globalMes('请选择省')
		} else if(!city) {
			globalMes('请选择市')
		} else if(!district) {
			globalMes('请选择区县')
		} else if(!teamState) {
			globalMes('请输入队伍宣言')
		} else if(!teamTarget) {
			globalMes('请输入队伍目标')
		} else {
			$.ajax({
				type: "get",
				dataType: 'jsonp',
				url: "http://cbg.mobilefoundation.org.cn/api/team/edit",
				data: {
//					uid: 8,
					name: teamName,
					headimg: '',
					announcement: teamState,
					province: province,
					city: city,
					target_num: teamTarget,
					tid: window.tid
				},
				async: true,
				success: function(data) {
					console.log(data)
					globalMes(data.msg)
					//					setTimeout(function() {
					//						location.href = 'bmbiao.html'
					//					}, 3000)
				}
			});
		}
	})

	function getTeamInfo() {
		$.ajax({
			type: "get",
			dataType: 'jsonp',
			url: "http://cbg.mobilefoundation.org.cn/api/team/getteaminfo",
			data: {
//				uid: 8,
				tid: window.tid,
			},
			async: true,
			success: function(data) {
				console.log(data)
				globalMes(data.msg)
				//				setTimeout(function() {
				//					location.href = 'bmbiao.html'
				//				}, 3000)
			}
		});
	}

	function getMyTeamInfo() {
		$.ajax({
			type: "get",
			dataType: 'jsonp',
			url: "http://cbg.mobilefoundation.org.cn/api/team/getmyteam",
			data: {
//				uid: 8,
			},
			async: true,
			success: function(data) {
				console.log(data)
				window.tid = data.data.team_info.id
				$('#teamName').val(data.data.team_info.name)
				$('#teamState').val(data.data.team_info.announcement)
				$('#teamTarget').val(data.data.team_info.target_num)
			}
		});
	}

	function globalMes(txt) {
		$('body').append('<div class="globalmes">' + txt + '</div>')
		setTimeout(function() {
			$('.globalmes').remove();
		}, 2000)
	}
}