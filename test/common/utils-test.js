import expect from 'expect';
import utils from '../../src/common/js/utils';

describe('UtilitiesModule', () => {
  describe('truncate()', () => {
    it('should truncate correctly when given valid args', () => {
      expect(utils.truncate('David Vuong', 6)).toEqual('David...');
    });
    it('should not truncate when text.length < limit', () => {
      expect(utils.truncate('David Vuong', 100)).toEqual('David Vuong');
    });
  });
});
