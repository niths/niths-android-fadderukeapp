var PrivateStorage = function() {}

PrivateStorage.prototype.store = function(data, success, failure) {
  return PhoneGap.exec(success, failure, 'PrivateStorage', 'store', [data]);
}

PhoneGap.addConstructor(function() {
  PhoneGap.addPlugin('privateStorage', new PrivateStorage());
//
//  PluginManager.addService(
//      "PrivateStorage",
//      "com.phonegap.plugins.privateStorage.PrivateStorage");
});