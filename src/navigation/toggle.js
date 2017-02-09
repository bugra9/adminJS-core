
	navigationToggle(v) {
		var index = this.findAll([{
			attr: "file.path",
			value: v,
			op: "=="
		}])[0];
		var temp = this.data[index].file.path.split('/');
		var name = temp.pop();
		if(name.substr(0, 1) == '_')
			name = name.substr(1);
		else
			name = '_' + name;

		this.data[index].file.path = temp.join('/') + '/' + name;

		this.renameData(v, this.data[index].file.path);

		window.location.href = '#list/' + v.substring(0, v.lastIndexOf('/')+1);
	}

	renameData(path, newPath) {

	}
