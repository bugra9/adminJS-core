
	navigationDelete(v) {
		var index = this.findAll([{
			attr: "file.path",
			value: v,
			op: "=="
		}])[0];
		this.data.splice(index, 1);
		this.deleteData(v);

		window.location.href = '#list/' + v.substring(0, v.lastIndexOf('/')+1);
	}

	deleteData(v) {

	}
