describe('Ön tanımlı ayarlar kontrol ediliyor...', function(){
  it('Ayarlar tanımlanmış olmalı', function(){
    assert(testClass.settings !== undefined, 'this.settings => undefined');
  });
  it('Hata ayıklama seviyesi tanımlanmış olmalı.', function(){
    assert(testClass.settings.debug !== undefined, 'this.settings.debug => undefined');
  });
  it('Dışarıdan ayarlama yapılabilmeli', function(){
    assert(testClass.settings.test == "test", 'this.settings.test => undefined');
  });
  it('Veriler yükleniyor', function(){
    assert(Array.isArray(testClass.data), 'this.data => not array');
  });
  it('Menü yükleniyor', function(){
    assert(Array.isArray(testClass.menu), 'this.menu => not array');
  });
  it('Seçenekler yükleniyor', function(){
    assert(typeof testClass.options === 'object', 'this.options => not object');
  });
});