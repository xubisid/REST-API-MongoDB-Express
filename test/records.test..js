const { chai, server, should } = require("./testConfig");
const recordsModel = require("../models/GeneralModel");


describe('#find()', (done) => {
    it('data found', async () => {
      recordsModel.findOne().then((records) => {
        records.should.have.length(1);
        done();
      });
    });
  });