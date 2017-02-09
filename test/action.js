describe('Other Action', function(){
	it('navigationDelete()', function() {
		var data = testClass.data.slice(0);
		testClass.navigationDelete("b/a.md");
		var temp = testClass.findAll([{
            attr: "file.path",
            value: "b/a.md",
            op: "path"
        }]);
		assert(temp.length === 0, 'Kayıt bulunamadı.');
		testClass.data = data;
	});
	it('navigationToggle()', function() {
		testClass.navigationToggle("b/a.md");
		var temp = testClass.findAll([{
            attr: "file.path",
            value: "b/_a.md",
            op: "path"
        }]);
		assert(temp.length == 1, 'Kayıt bulunamadı.');
		testClass.navigationToggle("b/_a.md");
	});
});