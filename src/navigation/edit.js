
	// Düzenleme sayfasının hazırlanması için kullanılan yardımcı fonksiyondur.
	navigationEdit(v, newFile = false) {
		$('#back').attr('href', '#list/' + v.substr(0, v.lastIndexOf('/') + 1));
		$('#attrTab').click();

		if(newFile)
			$('#saveButton').attr('href', '#saveNewFile/');
		else
			$('#saveButton').attr('href', '#save/'+v);

		var index;
		var data;
		if(newFile) {
			index = -1;
			this.tempData = data = {
				file: {
					path: "yeniDosya.md"
				},
				content: {}
			};
		}
		else {
			index = this.findAll([{
				attr: "file.path",
				value: v,
				op: "=="
			}])[0];
			data = this.data[index];
		}
		//console.log("data", data);

		var path = v.split('/');
		path.pop();
		path = path.join('/')+'/'; 
		var type = this.getType('/'+path);
		//console.log("type", type);

		if(type['file.path'] === undefined)
			type['file.path'] = this.defaultType('file.path', '');

		var attr = [[], [], [], []];
		attr[2].push('file.path');
		for(var i in data.content) {
			if(type[i] === undefined)
				attr[0].push(i);
			else if(type[i].edit.section !== undefined)
				attr[type[i].edit.section].push(i);
			else
				attr[1].push(i);
		}

		for(i in type) {
			if(data.content[i] === undefined && type[i].edit !== undefined && ( type[i].edit.type == 2 || (type[i].edit.type == 1 && newFile)))
				if(type[i].edit.section !== undefined)
					attr[type[i].edit.section].push(i);
				else
					attr[1].push(i);
		}
		//console.log("attr", attr);

		var temp2 = '';
		for(i in attr[1]) {
			temp2 += this.templateInput(type[attr[1][i]], this.getDataAttr(attr[1][i], index), 'edit');
		}
		this.write('<h4 class="ui dividing header">Genel Bilgiler</h4>' + temp2, '#edit1', true);

		temp2 = '';
		for(i in attr[2]) {
			temp2 += this.templateInput(type[attr[2][i]], this.getDataAttr(attr[2][i], index), 'edit');
		}
		this.write('<h4 class="ui dividing header">Yayınlama Bilgileri</h4>' + temp2, '#edit2', true);

		temp2 = '';
		for(i in attr[0]) {
			temp2 += this.templateInput(this.defaultType(attr[0][i], this.getDataAttr(attr[0][i], index)), this.getDataAttr(attr[0][i], index), 'edit');
		}
		this.write(temp2, '#edit0', true);

		temp2 = '';
		for(i in attr[3]) {
			temp2 += this.templateInput(type[attr[3][i]], this.getDataAttr(attr[3][i], index), 'edit');	
		}
		this.write(temp2, '#edit3', true);


		this.inputInit({url: v});
	}
