describe('Tür belirleme işlevleri', function() {
    it('defaultType() -> text', function() {
        var temp = testClass.defaultType('deneme', 'deneme');
        assert(temp.input.type == "text", 'Kayıt bulunamadı.');
    });
    it('defaultType() -> array', function() {
        var temp = testClass.defaultType('deneme', [2, 4]);
        assert(temp.input.type == "select", 'Kayıt bulunamadı.');
    });
    // it('defaultType() -> object');

    it('getType()', function() {
        var temp = testClass.getType('/');
        assert(Object.keys(temp).length == 3, 'Kayıt bulunamadı.');
    });
});