const fs = require('fs');
const sinon = require('sinon');
const expect = require('chai').expect;
const { createFolder } = require('../mit-shakespeare/folderHelper');

describe('Folder Helper Tests', () => {
  let stubFsExists;
  let stubFsMkdir;

  beforeEach(() => {
    stubFsExists = sinon.stub(fs, 'existsSync');
    stubFsMkdir = sinon.stub(fs, 'mkdirSync');
  });

  afterEach(() => {
    stubFsExists.restore();
    stubFsMkdir.restore();
  });

  it('should not create a folder if the foldername provided already exists', () => {
    stubFsExists.returns(true);
    createFolder('aFolder');
    expect(stubFsMkdir.notCalled).to.eq(true);
  });

  it('should create a folder if the foldername provided does not exist', () => {
    stubFsExists.returns(false);
    createFolder('aFolder');
    expect(stubFsMkdir.called).to.eq(true);
  });


});