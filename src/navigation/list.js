
	// Listeleme sayfasının hazırlanması için kullanılan yardımcı fonksiyondur.
	navigationList(v) {
		$('#newFile').attr('href', '#new/'+v);
		//console.log("navigationList: ", v);
		var temp = this.findAll([{
			attr: "file.path",
			value: v,
			op: "path"
		}]);
		//console.log('temp: ', temp);
		
		var type = this.getType('/'+v);
		//console.log('type: ', type);
		var attrList = this.getAttrList(temp, type);
		//console.log('attrList: ', attrList);
		
		var temp2 = '';
		for(var i in temp) {
			if(attrList.indexOf('title') == -1)
				temp2 += '<tr><td class="collapsing"><i class="file outline icon"></i> '+ this.data[temp[i]].file.path.split('/').pop() +'</td>';
			else
				temp2 += '<tr><td class="collapsing" title="'+ this.data[temp[i]].file.path +'"><i class="file outline icon"></i></td>';

			for(var a in attrList) {
				if(type[attrList[a]] === undefined)
					type[attrList[a]] = {
						attr: attrList[a],
						title: attrList[a],
						list: {
							show: true
						},
						input: {
							type: "text" 
						}
					};
				temp2 += this.templateInput(type[attrList[a]], this.getDataAttr(attrList[a], temp[i]), 'list');
			}
			var color = "green";
			if((this.data[temp[i]].file.path.split('/')).pop().substr(0,1) == '_')
				color = "red";
			temp2 += `<td class="right aligned collapsing">
								<a href="#edit/${this.data[temp[i]].file.path}"><i class="edit icon"></i></a>
								<a href="#toggle/${this.data[temp[i]].file.path}"><i class="circle icon ${color}"></i></a>
								<a href="#delete/${this.data[temp[i]].file.path}"><i class="remove icon red"></i></a>
							</td></tr>`;
		}
		var tempHeader = '';
		for(var a in attrList)
			if(type[attrList[a]] === undefined)
				tempHeader += '<th>'+ attrList[a] +'</th>';
			else
				tempHeader += '<th>'+ type[attrList[a]].title +'</th>';

		//console.log(temp2);
		this.write('<tr><th></th>'+ tempHeader+ '<th>İşlemler</th></tr>', 'thead', true);
		this.write(temp2, 'tbody', true);

		var dirs = this.getDirs(v);
		temp = '';
		for(i in dirs)
			temp += `
<a class="item" href="#list/${v}${dirs[i]}/">
	<i class="big folder icon"></i>
	<div class="content">
		<div class="header">${dirs[i]}</div>
	</div>
</a>`;
		this.write(temp, '#dirs', true);
	}
	